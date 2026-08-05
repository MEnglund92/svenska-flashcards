"""
PDF Extraction Pipeline for Svenska Flashcards
===============================================
Multi-strategy extraction from Swedish PDF textbooks with OCR fallback,
bilingual alignment, and confidence scoring.
"""

import os, re, json, sys, hashlib, subprocess, tempfile
from collections import Counter
from typing import Optional

import fitz
from PIL import Image
import spacy

from .schemas import Entry, SourceInfo, CategoryDef, CourseDef

# ── NLP ──────────────────────────────────────────────────────────────
_nlp_sv = None
_nlp_en = None

def _get_nlp(lang="sv"):
    global _nlp_sv, _nlp_en
    if lang == "sv":
        if _nlp_sv is None:
            _nlp_sv = spacy.load("sv_core_news_sm")
        return _nlp_sv
    if _nlp_en is None:
        _nlp_en = spacy.load("en_core_web_sm")
    return _nlp_en

# ── TESSERACT ─────────────────────────────────────────────────────────
_TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

_ocr_cache: dict[str, str] = {}

def ocr_page(page: fitz.Page, lang="swe+eng") -> str:
    key = f"{page.number}_{page.rect.x0:.0f}_{page.rect.y0:.0f}"
    if key in _ocr_cache:
        return _ocr_cache[key]

    pix = page.get_pixmap(dpi=200, colorspace=fitz.csRGB)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

    # Save to temp file and run Tesseract directly for proper UTF-8 output
    tmp_dir = tempfile.mkdtemp()
    img_path = os.path.join(tmp_dir, "page.png")
    img.save(img_path)

    try:
        result = subprocess.run(
            [_TESSERACT_CMD, img_path, "stdout", "-l", lang, "--psm", "6"],
            capture_output=True, timeout=120,
        )
        # Tesseract outputs UTF-8; use replace for any stray non-UTF-8 bytes
        text = result.stdout.decode("utf-8", errors="replace")
    finally:
        import shutil
        shutil.rmtree(tmp_dir, ignore_errors=True)

    _ocr_cache[key] = text
    return text

# ── TEXT QUALITY ─────────────────────────────────────────────────────
SWEDISH_CHARS = set("åäöÅÄÖéèêëÉÈÊËüÜ")
COMMON_SV_WORDS = {
    "och", "att", "det", "som", "en", "ett", "är", "har", "inte",
    "jag", "du", "han", "hon", "den", "det", "vi", "ni", "de",
    "sig", "till", "på", "av", "för", "med", "om", "från",
    "men", "när", "var", "hur", "vad", "kan", "ska", "sin",
    "sitt", "sina", "denna", "detta", "dessa",
}

def detect_corruption(text: str) -> float:
    """Returns corruption score 0.0 (clean) to 1.0 (garbled)."""
    if not text or len(text) < 20:
        return 0.5
    # Check for known corruption patterns
    lines = text.split("\n")
    bad_patterns = 0
    total_lines = 0
    for line in lines:
        line = line.strip()
        if not line:
            continue
        total_lines += 1
        # Repeated consonants (fiilsdr, nihgon, etc.)
        if re.search(r"([bcdfghjklmnpqrstvwxz])\1", line):
            bad_patterns += 1
            continue
        # Swedish chars replaced with similar-looking ascii
        if re.search(r"[aiou]\d|a[io]|[ua]a|[ua][iu]", line):
            bad_patterns += 1
            continue
        # Missing expected Swedish chars (ä/å/ö)
        sv_count = sum(1 for c in line if c in SWEDISH_CHARS)
        total_alpha = sum(1 for c in line if c.isalpha())
        if total_alpha > 10 and sv_count == 0:
            bad_patterns += 1
            continue
        # High ratio of non-alphabetic to alphabetic
        alpha = sum(1 for c in line if c.isalpha())
        if alpha > 5 and alpha / max(len(line), 1) < 0.4:
            bad_patterns += 1
    if total_lines == 0:
        return 0.5
    return min(1.0, bad_patterns / max(total_lines, 1))

# Known Swedish word base (loaded from existing data + common words)
_known_sv_words: set[str] = set()
_known_sv_lemmas: set[str] = set()

def _init_known_words():
    if _known_sv_words:
        return
    # Load from existing data.js entries
    data_js_path = os.path.join(os.path.dirname(__file__), "..", "..", "data.js")
    if os.path.exists(data_js_path):
        import re as _re
        with open(data_js_path, "r", encoding="utf-8") as f:
            content = f.read()
        # Extract all phrase values
        matches = _re.findall(r'phrase:\s*"([^"]+)"', content)
        for m in matches:
            for w in m.split():
                _known_sv_words.add(w.lower())
    # Add common Swedish words (most frequent ~500)
    common = """
och att det som en ett i på av för till med om från av sig att denna
vara bli ha kunna göra säga gå komma se ge ta finna vilja måste få
stor liten gammal ny bra dålig vacker lång kort varm kall god vänlig
människa tid år dag man kvinna barn hus bok land stad väg värld
arbete liv del sätt sak plats ord tanke kraft hand folk grupp
fråga svar språk ord mening text exempel övning uppgift kapitel
hem skola jobb möte rum kök sovrum fönster dörr stol bord säng
mat vatten mjölk bröd smör ost äpple banan kött fisk kyckling
kaffe te öl vin glas tallrik kniv gaffel sked
morgon eftermiddag kväll natt dag vecka månad år
måndag tisdag onsdag torsdag fredag lördag söndag
januari februari mars april maj juni juli augusti september oktober november december
vår sommar höst vinter
mamma pappa bror syster son dotter far mor
lärare elev student rektor chef kollega vän
tala prata berätta fråga svara förklara diskutera lyssna läsa skriva
springa gå simma sitta stå ligga sova vakna äta dricka laga
heta bo komma resa åka flytta leva dö födas gifta skilja
het älsk glad ledsen arg rädd modig stark svag sjuk frisk trött
förstå lära kunna veta tro tycka mena minnas glömma hoppas önska
svenska engelska tyska franska spanska italienska ryska kinesiska
bank post bio teater museum bibliotek station flyg buss tåg bil
klass kurs lektion prov resultat betyg grupp lag match
siffra nummer tal summa pris kostnad pengar krona euro dollar
brev paket kort present blomma choklad glass tårta kaka
fot hand arm ben huvud öga öra mun näsa axel finger knä
mobil dator internet mejl webb sida program spel film musik
radio teve nyhet tidning artikel reporter intervju bild foto
väder sol regn vind snö moln temperatur grad
färg röd blå grön gul svart vit grå brun orange lila
land stad by gata torg park berg sjö hav flod ö bro
kung drottning prins prinsessa kung barn barnbarn
vän granne familj släkt förälder farfar morfar farmor mormor
träd blomma växt djur katt hund häst ko gris får höna
""".split()
    _known_sv_words.update(common)

    # Load lemmas from spaCy for extra coverage
    nlp = _get_nlp("sv")
    # Add lemmas of common words
    for w in common:
        doc = nlp(w)
        for t in doc:
            if t.lemma_:
                _known_sv_lemmas.add(t.lemma_.lower())

# Common Tesseract OCR error corrections for Swedish
_OCR_FIXES = {
    # Common Tesseract errors — diacritics missed
    "nagon": "någon", "nagot": "något", "nagra": "några",
    "yssna": "lyssna", "yssnar": "lyssnar",
    "idning": "tidning", "idningen": "tidningen", "idningarnas": "tidningarnas",
    "anviinder": "använder", "anviind": "använd",
    "ungefiir": "ungefär", "fiir": "fär",
    "spraket": "språket", "sprak": "språk", "spraken": "språken",
    "trendsprak": "trendspråk",
    "lastips": "lästips",
    "anga": "ånga",
    "forstår": "förstår", "forsta": "förstå",
    "oversätter": "översätter", "ovriga": "övriga",
    "laser": "läser", "lasa": "läsa",
    "tillfallen": "tillfällen", "halften": "hälften",
    "vardagliga": "vardagliga",
    "haromdagen": "häromdagen",
    "jamt": "jämt",
    "avlagsen": "avlägsen",
    "tyvarr": "tyvärr",
    "sarskilt": "särskilt",
    "forelasningen": "föreläsningen",
    "klatt": "klätt",
    "annu": "ännu",
    "vastan": "nästan",
    "amerikanska": "amerikanska",
    "vardagliga": "vardagliga",
    "asa": "åsa",
    "dsprak": "språk",
    "forsent": "för sent", "försent": "för sent",
    "honhar": "hon har",
    # Rivstart-specific diacritic misses (OCR reads a/ä/o/ö as plain vowels)
    "fran": "från",
    "varfor": "varför", "varifran": "varifrån",
    "lakare": "läkare",
    "dar": "där", "nar": "när",
    "lang": "lång", "langt": "långt",
    "ratt": "rätt",
    "tva": "två", "tvaa": "två",
    "ata": "äta",
    "saga": "säga", "sager": "säger",
    "gang": "gång",
    "sjalva": "själva", "sjalv": "själv",
    "obestamd": "obestämd", "bestamd": "bestämd",
    "halsnings": "hälsnings", "halsa": "hälsa",
    "tillampning": "tillämpning",
    "fortsattning": "fortsättning",
    "forbjuden": "förbjuden",
    "enliat": "enligt",
    "lasa": "läsa",
    "gor": "gör",
    "attio": "åttio", "nittio": "nittio",
    "ettusen": "ett tusen",
    "hundraen": "hundra ett",
    "hundratva": "hundra två",
    "tjugotva": "tjugotvå",
    "langre": "längre",
    # Page 29 pronunciation garbage
    "tena": "tjej",
    "siu": "sju",
    # Page 33 garbage
    "THe": "", "enbok": "en bok", "ree": "",
    "åims": "", "egx": "", "yim": "",
    "ater": "äter", "tHe": "", "byE": "", "a's": "",
    "gallande": "gällande",
    "engangsmaterial": "engångsmaterial",
    "kanelbulle": "kanelbulle", "kanelbutle": "kanelbulle",
    # Rivstart batch — diacritic misses
    "mandag": "måndag", "mandagar": "måndagar",
    "alskar": "älskar", "alskade": "älskade",
    "trakig": "tråkig", "trakiga": "tråkiga",
    "spannande": "spännande",
    "laskig": "läskig", "laskiga": "läskiga",
    "forstar": "förstår",
    "klader": "kläder",
    "pensionar": "pensionär",
    "raksallad": "räksallad",
    "narbutiken": "närbutiken",
    "paron": "päron",
    "ganger": "gånger",
    "ikvall": "ikväll",
    "jattehungrig": "jättehungrig",
    "harlig": "härlig",
    "skargarden": "skärgården",
    "fyrtiotvaorna": "fyrtiotvåorna",
    "ater": "äter",
    # Rivstart batch — article merging (OCR reads "en"+word as one token)
    "enchokladruta": "chokladruta",
    "englass": "glass",
    "endammsugare": "dammsugare",
    "etttacke": "täcke",
    "enmadrass": "madrass",
    "enkudde": "kudde",
    "ettunderlakan": "underlakan",
    "ettpåslakan": "påslakan",
    "tillhavet": "havet",
    "tillenstad": "stad",
    # Rivstart batch 3 — remaining diacritics
    "foraldrar": "föräldrar",
    "maste": "måste",
    "anvanda": "använda",
    "beratta": "berätta",
    "ocksa": "också",
    "ovanfor": "ovanför",
    "fornamn": "förnamn",
    "forlat": "förlåt",
    "smorgasar": "smörgåsar",
    "frimarken": "frimärken",
    "pasar": "påsar",
    "applen": "äpplen",
    "stopparin": "stoppa in",
    "dppen": "öppen",
    "behdver": "behöver",
    "acker": "åker",
    # Rivstart batch 3 — article merging
    "entermin": "termin",
    "enlektion": "lektion",
    "entrast": "trast",
    "encykel": "cykel",
    "enliten": "liten",
    # Rivstart batch 3 — garbage
    "rarna": "gärna",
    "kEraf": "",
    "terier": "",
}

def ocr_correct(word: str) -> str:
    lower = word.lower()
    if lower in _OCR_FIXES:
        fixed = _OCR_FIXES[lower]
        if not fixed:
            return fixed
        if word[0].isupper():
            fixed = fixed[0].upper() + fixed[1:]
        return fixed
    return word

NOUN_PROPER_RE = re.compile(r"^[A-ZÅÄÖ][a-zåäö]+$")

def is_valid_swedish_word(word: str) -> bool:
    """Check if a word is likely valid Swedish (not OCR garbage)."""
    _init_known_words()
    if len(word) < 3 or len(word) > 30:
        return False
    if not re.match(r"^[a-zåäöA-ZÅÄÖ][a-zåäöA-ZÅÄÖ\-']*$", word):
        return False
    # Check for improbable consonant clusters (OCR garbage signature)
    if re.search(r"[bcdfghjklmnpqrstvwxz]{4,}", word, re.IGNORECASE):
        return False
    if re.search(r"[aeiouyåäö]{4,}", word, re.IGNORECASE):
        return False
    word_lower = word.lower()
    # Reject all-uppercase tokens (section headers like TJUGO-LJUDET)
    if not any(c.islower() for c in word):
        return False
    # Reject proper nouns without Swedish characters (names like Daniel, Jan)
    word_is_proper = word[0].isupper() and len(word) > 1 and word[1:].islower()
    if word_is_proper and not any(c in SWEDISH_CHARS for c in word):
        return False
    # Check known word set
    if word_lower in _known_sv_words:
        return True
    # Words with Swedish characters are almost certainly valid Swedish
    if any(c in SWEDISH_CHARS for c in word):
        return True
    # Short words (3-4 letters) without Swedish chars need extra evidence
    if len(word) <= 4:
        # Check known lemmas
        nlp = _get_nlp("sv")
        doc = nlp(word_lower)
        for token in doc:
            if token.lemma_ in _known_sv_lemmas:
                return True
        return False
    # Medium+ words (5+ chars) — accept if they look like real words
    # (no improbable consonant/vowel clusters already checked above)
    return True


# ── PAGE CLASSIFIER ──────────────────────────────────────────────────
class PageClassifier:
    @classmethod
    def classify(cls, page: fitz.Page) -> dict:
        raw = page.get_text().strip()
        text_len = len(raw)
        img_count = len(page.get_images())
        corruption = detect_corruption(raw)

        # Force OCR if text has no Swedish chars but has substantial text (corrupt encoding)
        no_swedish_chars = text_len > 100 and not any(c in SWEDISH_CHARS for c in raw)
        return {
            "text_len": text_len,
            "images": img_count,
            "corruption": corruption,
            "raw_text": raw,
            "use_ocr": corruption > 0.1 or text_len < 200 or no_swedish_chars,
        }


# ── DICTIONARY CACHE ─────────────────────────────────────────────────
_dict_cache: dict[str, list[str]] = {}

def load_dictionary_from_pdf(pdf_path: str):
    from concurrent.futures import ThreadPoolExecutor, as_completed
    doc = fitz.open(pdf_path)
    print(f"[Dict] Loading {pdf_path} ({doc.page_count} pages)...", file=sys.stderr)

    def ocr_page_wrapper(i):
        p = doc[i]
        return i, ocr_page(p, "swe+eng")

    entries = 0
    with ThreadPoolExecutor(max_workers=4) as ex:
        futures = {ex.submit(ocr_page_wrapper, i): i for i in range(doc.page_count)}
        for f in as_completed(futures):
            i, text = f.result()
            for line in text.split("\n"):
                line = line.strip()
                if not line or len(line) < 3:
                    continue
                for sep in [" — ", " – ", " - ", "\t"]:
                    if sep in line:
                        parts = line.split(sep, 1)
                        if len(parts) == 2:
                            sv_word = parts[0].strip().lower()
                            en_gloss = parts[1].strip()
                            if sv_word and en_gloss and len(sv_word) > 1 and len(en_gloss) > 1:
                                if sv_word not in _dict_cache:
                                    _dict_cache[sv_word] = []
                                _dict_cache[sv_word].append(en_gloss)
                                entries += 1
                        break
    doc.close()
    print(f"[Dict] Loaded {entries} entries from {os.path.basename(pdf_path)}", file=sys.stderr)

def lookup_translation(sv_word: str) -> Optional[str]:
    key = sv_word.lower().strip()
    if key in _dict_cache:
        return _dict_cache[key][0]
    nlp = _get_nlp("sv")
    doc = nlp(key)
    lemma = doc[0].lemma_ if doc else key
    if lemma != key and lemma in _dict_cache:
        return _dict_cache[lemma][0]
    return None


# ── PHRASE VALIDATOR ─────────────────────────────────────────────────
class PhraseValidator:
    STOP_WORDS = {
        "jag", "du", "han", "hon", "den", "det", "vi", "ni", "de", "man", "dig", "sig",
        "och", "att", "som", "en", "ett", "inte", "är", "har", "kan", "ska", "skall",
        "var", "när", "hur", "vad", "men", "till", "med", "av", "för", "från", "om",
        "på", "pa", "i", "vid", "under", "över", "efter", "före", "mellan", "genom", "utan",
        "också", "bara", "redan", "alltid", "aldrig", "ofta", "sällan", "ibland",
        "här", "där", "inte", "nog", "kanske", "mycket", "lite", "mera", "mindre",
        "vara", "bli", "ha", "kunna", "göra", "säga", "gå", "komma", "se", "ge", "ta",
        "finna", "vilja", "måste", "få", "sin", "sitt", "sina", "din", "ditt", "dina",
        "min", "mitt", "mina", "vår", "vårt", "våra", "er", "ert", "era",
        "denne", "denna", "detta", "dessa", "samma", "annan", "annat", "andra",
        "ingen", "inget", "inga",
        "finns", "heter", "kallas", "säger", "gör", "vill", "vet",
        "sedan", "då", "nu", "sen", "ändå", "ju", "väl", "viss", "vissa",
        "hela", "enda", "sista", "första", "andra", "tredje",
        "någon", "något", "några", "någonstans", "någonting",
        "varje", "alla", "båda", "flera", "många", "flesta", "mesta",
        "dag", "vecka", "månad", "år", "tid", "gång", "sätt", "del",
        "bra", "dålig", "dåliga", "stor", "stort", "stora", "liten", "litet", "små",
        "ny", "nytt", "nya", "gammal", "gammalt", "gamla", "hel", "helt", "hela",
        "sådan", "sådant", "sådana", "egen", "eget", "egna",
        "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio",
        "upp", "ner", "in", "ut", "bort", "fram", "hem", "hit", "dit",
        "hej", "ja", "nej", "jo",
        "fortfarande", "tyvärr", "tycker",
        "som", "vilket", "vilken", "vilka", "vars",
        "nästan", "ungefär", "cirka", "drygt", "knappt",
        "faktiskt", "egentligen", "naturligtvis", "självklart",
        "samt", "samtidigt", "dessutom", "därför", "därmed",
        "ock", "ty", "ty att", "alltså", "allra",
        "tv", "ord", "texten", "text", "texter", "bok", "boken", "böcker", "kapitel",
        "fast", "fastän", "än", "ännu", "ehr", "allt", "all", "alla",
        "kommer", "kom", "kommit", "gick", "gått",
        "klockan", "elva", "tolv", "ett", "halv", "kvart", "minut", "timme",
        "henne", "honom", "dem", "deras", "oss", "eran",
        "sade", "sa", "sagt", "tog", "tagit", "fick", "fått",
        "blev", "blivit", "gjorde", "gjort", "varit", "var",
        "sent", "sena", "tidig", "tidigt", "tidiga",
        "på", "pa", "men", "också", "eller", "utan", "genom",
        "mellan", "över", "under", "innan", "efter", "före",
        "vid", "ur", "mot", "hos", "lång", "långt", "långa",
        # Copyright footer leakage
        "rivstart", "kopiering", "engångsmaterial", "engangsmaterial",
        "förbjuden", "forbjuden", "enligt", "lag", "gällande",
        "avtal", "saledes",
    }

    @classmethod
    def is_good_entry(cls, phrase: str) -> tuple[bool, str]:
        phrase = phrase.strip()
        if len(phrase) < 2:
            return False, "too short"
        if len(phrase) > 60:
            return False, "too long"
        # Check for OCR garbage (non-letter chars)
        clean = re.sub(r"[a-zåäöA-ZÅÄÖ\s\-']", "", phrase)
        if clean:
            return False, f"non-alpha chars: {clean}"
        # Check for repeated garbage patterns
        words = phrase.split()
        if len(words) > 1 and all(w.lower() in cls.STOP_WORDS for w in words):
            return False, "all stop words"
        # Check each word
        for w in words:
            if len(w) <= 1 and w.lower() not in ("i", "ö", "å"):
                return False, f"too short word: {w}"
        # At least one word should pass the Swedish validator (after OCR correction)
        valid_words = sum(1 for w in words if is_valid_swedish_word(ocr_correct(w)))
        if valid_words == 0 and len(words) > 1:
            return False, "no valid swedish words"
        return True, ""


# ── BASE STRATEGY ────────────────────────────────────────────────────
class BaseStrategy:
    name = "base"

    def __init__(self, book_name: str):
        self.book_name = book_name
        self.entries: list[Entry] = []

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        raise NotImplementedError

    def get_entries(self) -> list[Entry]:
        return self.entries

    def _make_entry(self, phrase: str, **kw) -> Entry:
        kwargs = dict(kw)
        conf = kwargs.pop("confidence", 1.0)
        entry = Entry(
            phrase=phrase.strip(),
            meaning=kwargs.pop("meaning", phrase.strip()) or phrase.strip(),
            translation=kwargs.pop("translation", ""),
            category=kwargs.pop("category", "unknown"),
            difficulty=kwargs.pop("difficulty", "medium"),
            related=kwargs.pop("related", None) or [],
            sentence=kwargs.pop("sentence", None),
            blankAnswer=kwargs.pop("blankAnswer", None),
            partOfSpeech=kwargs.pop("partOfSpeech", None),
            wordClass=kwargs.pop("wordClass", None),
            lemma=kwargs.pop("lemma", None),
            notes=kwargs.pop("notes", None),
            source=SourceInfo(
                book=self.book_name,
                chapter=kwargs.pop("chapter", ""),
                page=kwargs.pop("page_num", 0),
                section=kwargs.pop("section", ""),
                confidence=conf,
            ),
            confidence=conf,
            strategy=self.name,
        )
        return entry

    def _guess_difficulty(self, text: str) -> str:
        words = text.split()
        avg_len = sum(len(w) for w in words) / max(len(words), 1)
        if avg_len < 5:
            return "easy"
        if avg_len < 7:
            return "medium"
        return "hard"


# ── DIALOG STRATEGY ──────────────────────────────────────────────────
class DialogStrategy(BaseStrategy):
    """Extracts vocabulary from dialogue exchanges — detects Q&A patterns."""

    name = "dialog"
    Q_RE = re.compile(
        r"(Vad|Var|Varifrån|Varför|Hur|När|Vem|Vilken|Vilket|Vilka)\b",
        re.IGNORECASE,
    )
    ANSWER_CLEAN_RE = re.compile(r"^(Nej|Ja|Jodå|Jo|Nja|Nix)\s*[,.]?\s*", re.IGNORECASE)

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        lines = text.split("\n")
        for i in range(len(lines) - 1):
            q = lines[i].strip()
            if not q or len(q) < 4:
                continue
            if not self.Q_RE.search(q):
                continue

            # Find the answer: the next non-empty line
            a = ""
            for j in range(i + 1, min(i + 3, len(lines))):
                candidate = lines[j].strip()
                if candidate and len(candidate) > 3:
                    a = candidate
                    break
            if not a:
                continue

            a_clean = self.ANSWER_CLEAN_RE.sub("", a).strip()
            results = []

            q_lower = q.lower()
            if "vad" in q_lower and "heter" in q_lower:
                m = re.match(r"([A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)*)", a_clean)
                if m:
                    results.append((m.group(1), m.group(1), "intro"))
            elif "varifrån" in q_lower and "kommer" in q_lower:
                m = re.search(r"(?:Från|från)\s+([A-ZÅÄÖ][a-zåäö]+)", a)
                if m:
                    results.append((m.group(1), f"From {m.group(1)}", "travel"))
            elif re.search(r"språk|talar|tala", q_lower):
                m = re.search(r"([a-zåäö]+(?: och [a-zåäö]+)*)", a_clean)
                if m:
                    lang = m.group(1)
                    if not re.match(r"^(Jag|Det|Han|Hon|Vi|De)", lang, re.IGNORECASE):
                        results.append((lang, f"Language: {lang}", "intro"))
            elif re.search(r"arbetar|jobbar|studerar", q_lower):
                m = re.search(r"(?:som|är)\s+([a-zåäö]+(?:\s+[a-zåäö]+)*)", a_clean)
                if m:
                    job = m.group(1).strip()
                    results.append((job, f"Profession: {job}", "work"))
            elif re.search(r"var\s+(ligger|är)", q_lower):
                m = re.search(r"([A-ZÅÄÖ][a-zåäö]+)", a_clean)
                if m:
                    loc = m.group(1)
                    results.append((loc, f"Location: {loc}", "travel"))
            elif "vad" in q_lower and re.search(r"(göra|händer)", q_lower):
                good_words = [
                    t for t in a_clean.split()
                    if is_valid_swedish_word(t) and t.lower() not in PhraseValidator.STOP_WORDS
                ]
                for w in good_words[:3]:
                    results.append((w, w, "daily"))

            for phrase, gloss, cat in results:
                if len(phrase) < 2:
                    continue
                valid, _ = PhraseValidator.is_good_entry(phrase)
                if not valid:
                    continue
                entry = self._make_entry(
                    phrase=phrase,
                    meaning=f"{phrase} — {cat}",
                    translation=gloss,
                    category=cat,
                    difficulty=self._guess_difficulty(phrase),
                    sentence=a[:200],
                    page_num=page_num,
                    section="Dialog",
                    confidence=0.05,
                )
                self.entries.append(entry)


# ── WORD LIST STRATEGY ───────────────────────────────────────────────
class WordListStrategy(BaseStrategy):
    """Generic word/phrase list extraction for any textbook.

    Detects word lists by:
      1. Headers matching known patterns (På svenska 2 style)
      2. Line-level word-bank detection (lines with 3+ isolated Swedish words)
      3. Phrase box detection (groups of short phrases)
    All use the same token processing pipeline (OCR correction, validation, stop words).
    """

    name = "word_list"
    HEADER_RE = re.compile(
        r"\b(minns\s+du\s+ordet|ordlista|glosor|nyckelord|"
        r"vokabulär|ord\s+och\s+uttryck|frase\w*|viktiga\s+ord|"
        r"lär\s+in\s+orden|studera\s+orden)\b",
        re.IGNORECASE,
    )
    NON_VOCAB_RE = re.compile(
        r"^(Övn|Exempel|Kopiering|RIVSTART|PÅ SVENSKA|Facit|Svar"
        r"|Lyssna|Läsa|Skriv|Titta|Arbeta|Kombinera|Sortera"
        r"|Stryk|Ringa|Läng|Kort|Hörförståelse)",
        re.IGNORECASE,
    )
    # Lines matching this pattern are copyright footers (skip)
    # Match copyright/law boilerplate even when OCR drops diacritics
    COPYRIGHT_RE = re.compile(
        r"(rivstart|kopiering\s+av\s+detta|"
        r"eng.nsk.material|f. rbjuden|kapitel\s+\d+\s*[+\u2013])"
        r".*(?:enli[gkt]|enliat)\s+lag",
        re.IGNORECASE,
    )
    # Word bank detection: a line must have at least this many valid non-stop words
    MIN_WORD_BANK_TOKENS = 4
    MIN_WORD_RATIO = 0.65
    # Page activates with 1 strong bank line (5+ words) or 2+ moderate lines
    MIN_WORD_BANK_LINES = 1
    MIN_WORDS_SINGLE_LINE = 5
    # Skip pages before this (title, copyright, TOC)
    SKIP_PAGES_BEFORE = 10
    # Max entries per page
    MAX_PER_PAGE = 25
    # Minimum consecutive short lines to treat as a phrase box
    MIN_PHRASE_BOX_LINES = 3
    MAX_PHRASE_CHARS = 80

    def _tokenize_line(self, line: str) -> list[str]:
        """Split a line into cleaned alpha-only tokens."""
        tokens = re.split(r"[\s—–]+", line)
        result = []
        for t in tokens:
            t = t.strip(".,;:!?()\"'")
            if not t or len(t) < 2 or len(t) > 30:
                continue
            if not re.match(r"^[a-zåäöA-ZÅÄÖ][a-zåäöA-ZÅÄÖ\-']*$", t):
                continue
            if re.match(r"^\d+[.:)]?$", t):
                continue
            result.append(t)
        return result

    def _extract_valid_words(self, tokens: list[str]) -> list[str]:
        """Filter tokens through OCR correction, stop words, and Swedish validation."""
        seen = set()
        result = []
        for t in tokens:
            c = ocr_correct(t)
            key = c.lower()
            if key in seen:
                continue
            if key in PhraseValidator.STOP_WORDS:
                continue
            valid, _ = PhraseValidator.is_good_entry(c)
            if not valid:
                continue
            if not is_valid_swedish_word(c):
                continue
            seen.add(key)
            result.append(c)
        return result

    def _line_word_count(self, tokens: list[str]) -> int:
        """Count how many tokens in a line are valid non-stop Swedish words."""
        count = 0
        for t in tokens:
            c = ocr_correct(t)
            key = c.lower()
            if key in PhraseValidator.STOP_WORDS:
                continue
            if is_valid_swedish_word(c):
                count += 1
        return count

    def _detect_phrase_boxes(self, lines: list[str]) -> list[str]:
        """Find groups of consecutive short lines that look like a phrase list."""
        scratch_mark = [False] * len(lines)

        for i, line in enumerate(lines):
            stripped = line.strip()
            if not stripped:
                continue
            if len(stripped) > self.MAX_PHRASE_CHARS:
                continue
            if self.COPYRIGHT_RE.search(stripped):
                continue
            if not re.match(r"^[A-ZÅÄÖ]\w", stripped):
                continue
            words = stripped.split()
            if len(words) < 2 or len(words) > 12:
                continue
            has_verb_or_prep = any(
                w.lower() in ("är", "har", "vill", "ska", "kan", "för", "på", "i", "med", "till", "att", "och")
                for w in words
            )
            if not has_verb_or_prep:
                continue
            scratch_mark[i] = True

        runs = []
        start = None
        for i, is_phrase in enumerate(scratch_mark):
            if is_phrase and start is None:
                start = i
            elif not is_phrase and start is not None:
                if i - start >= self.MIN_PHRASE_BOX_LINES:
                    runs.append((start, i))
                start = None
        if start is not None and len(lines) - start >= self.MIN_PHRASE_BOX_LINES:
            runs.append((start, len(lines)))

        result = []
        for start, end in runs:
            for i in range(start, end):
                result.append(lines[i].strip())
        return result

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        lines = text.split("\n")
        collected_words: list[str] = []
        seen_global = set()

        def add_words(word_list: list[str]):
            for w in word_list:
                key = w.lower()
                if key not in seen_global:
                    seen_global.add(key)
                    collected_words.append(w)

        # --- Mode 1: Header-triggered extraction (På svenska 2 style) ---
        word_lines: list[str] = []
        in_vocab = False
        max_collect = 0
        for line in lines:
            stripped = line.strip()
            if not stripped:
                in_vocab = False
                continue
            if self.HEADER_RE.search(stripped):
                in_vocab = True
                max_collect = 8
                continue
            if not in_vocab or max_collect <= 0:
                continue
            max_collect -= 1
            if self.NON_VOCAB_RE.search(stripped):
                continue
            if re.match(r"^\d+\s*$", stripped):
                continue
            word_lines.append(stripped)

        if word_lines:
            for line in word_lines:
                tokens = self._tokenize_line(line)
                add_words(self._extract_valid_words(tokens))

        # --- Mode 2: Page-level word bank detection ---
        # Only trigger for content pages
        if page_num >= self.SKIP_PAGES_BEFORE:
            # First pass: score each line for word-bank-likeness
            bank_lines = []
            for line in lines:
                stripped = line.strip()
                if not stripped:
                    continue
                if self.COPYRIGHT_RE.search(stripped):
                    continue
                tokens = self._tokenize_line(stripped)
                if len(tokens) < self.MIN_WORD_BANK_TOKENS:
                    continue
                total = len(tokens)
                valid = self._line_word_count(tokens)
                ratio = valid / max(total, 1)
                if valid >= self.MIN_WORD_BANK_TOKENS and ratio >= self.MIN_WORD_RATIO:
                    bank_lines.append(tokens)

            # Extract if enough word-bank lines, or a single strong word bank
            total_valid_words = sum(self._line_word_count(t) for t in bank_lines)
            has_strong_single = any(self._line_word_count(t) >= self.MIN_WORDS_SINGLE_LINE for t in bank_lines)
            if len(bank_lines) >= self.MIN_WORD_BANK_LINES or has_strong_single:
                for tokens in bank_lines:
                    add_words(self._extract_valid_words(tokens))
                    if len(collected_words) >= self.MAX_PER_PAGE:
                        break

        # --- Mode 3: Phrase box detection ---
        if len(collected_words) < self.MAX_PER_PAGE:
            phrases = self._detect_phrase_boxes(lines)
            for phrase in phrases:
                if phrase.lower() in seen_global:
                    continue
                valid, _ = PhraseValidator.is_good_entry(phrase)
                if valid:
                    seen_global.add(phrase.lower())
                    collected_words.append(phrase)
                    if len(collected_words) >= self.MAX_PER_PAGE:
                        break

        if len(collected_words) < 2:
            return

        for w in collected_words:
            corrected = ocr_correct(w)
            translation = lookup_translation(corrected.lower()) or ""
            entry = self._make_entry(
                phrase=corrected,
                meaning=translation or f"Vocabulary: {w}",
                translation=translation,
                category="vocabulary",
                difficulty=self._guess_difficulty(w),
                page_num=page_num,
                section="Word List",
                confidence=0.55,
            )
            self.entries.append(entry)


# ── DICTIONARY STRATEGY ──────────────────────────────────────────────
class DictionaryStrategy(BaseStrategy):
    """Extracts headword entries from Swedish PDF dictionaries (Norstedts, etc.).

    Uses text layer block positions to split two-column layout, then parses
    entries from the text layer (fast). Applies diacritic restoration using
    OCR on just the headword region (small image = fast) to get correct spelling.
    Falls back to full-column OCR for pages without extractable text layer.
    """

    name = "dictionary"
    handles_own_ocr = True

    POS_RE = re.compile(
        r"^([A-ZÅÄÖa-zåäö\.\-']+)\s+(subst\.|s\.|verb|v\.|adj\.|adv\.|pron\.|prep\.|konj\.|interj\.|räkn\.|num\.)"
    )
    SKIP_RE = re.compile(
        r"^(Norstedts|Svenska|Copyright|Tryck\b|ISBN|Redakt|Illustrat|Omslag|"
        r"§|Faktaru|bilaga|karta|A\b|B\b|C\b|D\b|E\b|F\b|G\b|H\b|I\b|J\b|K\b|"
        r"L\b|M\b|N\b|O\b|P\b|Q\b|R\b|S\b|T\b|U\b|V\b|W\b|X\b|Y\b|Z\b|Å\b|Ä\b|Ö\b)",
        re.IGNORECASE,
    )
    SKIP_FIRST = 14
    MAX_PER_PAGE = 50

    def _fix_headword(self, word: str) -> str:
        """Restore diacritics to an ASCII-fied headword from the text layer.
        
        Uses a combination of known fixes, safe prefix rules, and heuristics.
        """
        fixed = ocr_correct(word)
        if fixed != word:
            return fixed

        w = word
        # Safe prefix substitution: for- → för- (100% safe in Swedish)
        if w.lower().startswith("for") and len(w) > 4 and not w.lower().startswith("forn"):
            w = "för" + w[3:]
        # Safe prefix substitution: over- → över-
        if w.lower().startswith("over"):
            w = "över" + w[4:]

        # Common suffix substitutions
        lower = w.lower()
        if lower.endswith("ar") and len(lower) > 4:
            # "ar" is often "är" for verbs (present tense), but could be valid
            # For headwords, the infinitive form ends in -a, not -ar
            # So -ar as a headword is likely OCR error for -är
            candidate = w[:-2] + "är"
            if w[0].isupper():
                candidate = candidate[0].upper() + candidate[1:]
            w = candidate

        # Fix common words manually
        _fixes = {
            "forkyld": "förkyld", "forkylning": "förkylning",
            "forklar": "förklar", "forkort": "förkort",
            "forlam": "förlam", "forlat": "förlåt",
            "forlan": "förlän", "forlor": "förlor",
            "forlov": "förlov", "forlust": "förlust",
            "forman": "förmån", "formiddag": "förmiddag",
            "fornamn": "förnamn", "fornimm": "förnimm",
            "fornuft": "förnuft", "forny": "förny",
            "foraldr": "föräldr", "forand": "föränd",
            "erhall": "erhåll", "erkann": "erkänn",
            "avratt": "avrätt", "avsevard": "avsevärd",
            "avskrack": "avskräck", "avskyvard": "avskyvärd",
            "byra": "byrå", "byrar": "byråer",
            "busfro": "busfrö", "busfron": "busfrön",
            "storre": "större", "storsta": "största",
            "borja": "börja", "borjar": "börjar",
            "kanna": "känna", "kanner": "känner", "kanne": "känne",
            "satta": "sätta", "satter": "sätter", "satt": "satt",
            "lada": "låda", "lador": "lådor", "laden": "lådan",
            "nal": "nål", "nalen": "nålen", "nalar": "nålar",
            "avstand": "avstånd", "avstandet": "avståndet",
            "avsand": "avsänd", "avsandare": "avsändare",
            "manniska": "människa", "manniskor": "människor",
            "vacker": "vacker", "vackra": "vackra",
            "battre": "bättre", "bast": "bäst",
            "lang": "lång", "langa": "långa", "langre": "längre",
            "angra": "ångra", "andra": "ändra",
            "over": "över", "oppen": "öppen", "oppna": "öppna",
            "farg": "färg", "fargen": "färgen", "farger": "färger",
        }
        for ascii_fix, correct in _fixes.items():
            if w.lower().startswith(ascii_fix):
                rest = w[len(ascii_fix):]
                w = correct + rest
                if word[0].isupper():
                    w = w[0].upper() + w[1:]
                break

        return w

    @staticmethod
    def _ocr_region(page: fitz.Page, clip: fitz.Rect) -> str:
        import tempfile, shutil
        pix = page.get_pixmap(dpi=200, colorspace=fitz.csRGB, clip=clip)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        tmp = tempfile.mkdtemp()
        try:
            img_path = os.path.join(tmp, "reg.png")
            img.save(img_path)
            result = subprocess.run(
                [_TESSERACT_CMD, img_path, "stdout", "-l", "swe+eng", "--psm", "6"],
                capture_output=True, timeout=60,
            )
            return result.stdout.decode("utf-8", errors="replace")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    @staticmethod
    def _has_good_text_layer(blocks: list) -> bool:
        """Check if text layer has sufficient Swedish character density
        (threshold: >=0.1% åäö chars) to avoid broken OCR fallback."""
        total = 0
        swedish = 0
        for b in blocks:
            if b["type"] != 0:
                continue
            for line in b["lines"]:
                txt = "".join(s["text"] for s in line["spans"])
                total += len(txt)
                swedish += sum(1 for c in txt if c in "åäöÅÄÖ")
        if total < 100:
            return False
        return swedish / total >= 0.001

    def _get_column_text(self, page: fitz.Page) -> list[str]:
        """Extract text per column — prefer text layer, fall back to OCR."""
        ph = page.rect.height
        pw = page.rect.width
        mid_x = pw / 2

        blocks = page.get_text("dict")["blocks"]
        text_blocks = [b for b in blocks if b["type"] == 0]

        if text_blocks and self._has_good_text_layer(blocks):
            left_lines: list[tuple[float, str]] = []
            right_lines: list[tuple[float, str]] = []
            for b in text_blocks:
                cx = (b["bbox"][0] + b["bbox"][2]) / 2
                for line in b["lines"]:
                    txt = "".join(s["text"] for s in line["spans"]).strip()
                    if txt:
                        if cx < mid_x:
                            left_lines.append((line["bbox"][1], txt))
                        else:
                            right_lines.append((line["bbox"][1], txt))
            left_lines.sort(key=lambda x: x[0])
            right_lines.sort(key=lambda x: x[0])

            results = []
            for col_lines in [left_lines, right_lines]:
                if col_lines:
                    text = "\n".join(txt for _, txt in col_lines)
                    results.append(text)
            return results
        else:
            cols = [
                fitz.Rect(0, 0, mid_x, ph),
                fitz.Rect(mid_x, 0, pw, ph),
            ]
            results = []
            for clip in cols:
                if clip.y1 - clip.y0 > 30:
                    text = self._ocr_region(page, clip)
                    if text.strip():
                        results.append(text)
            return results

    def _parse_column(self, text: str, page_num: int):
        lines = text.split("\n")
        entries: list[tuple[str, str, str]] = []

        i = 0
        while i < len(lines):
            line = lines[i].strip()
            i += 1
            if not line or len(line) < 4:
                continue

            m = self.POS_RE.match(line)
            if not m:
                continue

            headword = self._fix_headword(m.group(1))
            pos = m.group(2)

            if not is_valid_swedish_word(headword):
                continue
            if headword.lower() in PhraseValidator.STOP_WORDS:
                continue

            def_start = m.end()
            def_parts = [line[def_start:].strip()] if line[def_start:].strip() else []

            while i < len(lines):
                nxt = lines[i].strip()
                if not nxt:
                    i += 1
                    continue
                if self.POS_RE.match(nxt):
                    break
                if self.SKIP_RE.match(nxt):
                    i += 1
                    break
                def_parts.append(nxt)
                i += 1

            definition = re.sub(r"\s+", " ", " ".join(def_parts)).strip()
            definition = re.sub(r"^[•*+\-|e�]\s*", "", definition)
            if len(definition) < 5:
                continue

            entries.append((headword, pos, definition))

        seen = set()
        for headword, pos, definition in entries:
            key = headword.lower()
            if key in seen:
                continue
            seen.add(key)

            diff = "easy" if len(headword) < 6 else "medium" if len(headword) < 10 else "hard"
            entry = self._make_entry(
                phrase=headword,
                meaning=definition[:400],
                translation="",
                category="vocabulary",
                difficulty=diff,
                partOfSpeech=pos,
                page_num=page_num,
                section="Dictionary",
                confidence=0.85,
            )
            self.entries.append(entry)

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        if page_num <= self.SKIP_FIRST:
            return

        col_texts = self._get_column_text(page)
        for col_text in col_texts:
            self._parse_column(col_text, page_num)
            if len(self.entries) >= self.MAX_PER_PAGE:
                break


# ── RICH DICTIONARY STRATEGY (Svensk ordbok) ────────────────────────
class RichDictionaryStrategy(BaseStrategy):
    """Extracts rich entries from Svensk ordbok (SAOB/SO) — headword,
    pronunciation, POS, inflection, numbered definitions, example sentences,
    and etymology. Uses the text layer directly (no OCR needed)."""

    name = "rich_dictionary"
    handles_own_ocr = True

    POS_RE = re.compile(
        r"^([A-ZÅÄÖa-zåäö\'\-]+)\s+(subst\.|s\.|verb|v\.|adj\.|adv\.|pron\.|prep\.|konj\.|interj\.|räkn\.|num\.)"
    )
    SKIP_FIRST = 10
    MAX_PER_PAGE = 30
    # Lines to skip completely
    SKIP_LINE_RE = re.compile(
        r"^\d+$|^\d+\s+\d+|^[|]+$|^[•\*\-–—|]+$",
    )
    # Property labels to detect
    HIST_RE = re.compile(r"^HIST\b", re.IGNORECASE)
    KONSTR_RE = re.compile(r"^KONSTR\.", re.IGNORECASE)
    JFR_RE = re.compile(r"^JFR\b", re.IGNORECASE)

    def _get_column_text(self, page) -> list[str]:
        """Extract text per column using text layer block positions."""
        ph = page.rect.height
        pw = page.rect.width
        mid_x = pw / 2
        blocks = page.get_text("dict")["blocks"]
        text_blocks = [b for b in blocks if b["type"] == 0]
        if not text_blocks:
            return []

        left_lines, right_lines = [], []
        for b in text_blocks:
            cx = (b["bbox"][0] + b["bbox"][2]) / 2
            for line in b["lines"]:
                txt = "".join(s["text"] for s in line["spans"]).strip()
                if txt:
                    target = left_lines if cx < mid_x else right_lines
                    target.append((line["bbox"][1], txt))
        left_lines.sort(key=lambda x: x[0])
        right_lines.sort(key=lambda x: x[0])
        results = []
        for col in [left_lines, right_lines]:
            if col:
                results.append("\n".join(t for _, t in col))
        return results

    def _clean_headword(self, hw: str) -> str:
        """Remove stress marks and clean up headword."""
        hw = hw.replace("'", "").replace("ˈ", "").replace("`", "")
        return hw.strip()

    def process_page(self, page_num: int, text: str, page):
        if page_num <= self.SKIP_FIRST:
            return

        col_texts = self._get_column_text(page)
        for col_text in col_texts:
            self._parse_column(col_text, page_num)
            if len(self.entries) >= self.MAX_PER_PAGE:
                break

    def _parse_column(self, text: str, page_num: int):
        lines = text.split("\n")
        i = 0
        parsed = 0
        while i < len(lines) and parsed < self.MAX_PER_PAGE:
            line = lines[i].strip()
            i += 1
            if not line or len(line) < 4:
                continue
            if self.SKIP_LINE_RE.match(line):
                continue

            m = self.POS_RE.match(line)
            if not m:
                continue

            headword = self._clean_headword(m.group(1))
            pos = m.group(2)
            rest = line[m.end():].strip()

            if headword.lower() in PhraseValidator.STOP_WORDS:
                continue

            # Collect all following lines until next entry
            def_parts = [rest] if rest else []
            def_lines = []
            example_lines = []
            etymology = ""
            construction = ""
            inflection = ""
            in_definition = True

            while i < len(lines):
                nxt = lines[i].strip()
                if not nxt:
                    i += 1
                    continue
                if self.SKIP_LINE_RE.match(nxt):
                    i += 1
                    continue
                # Check if next entry starts
                if self.POS_RE.match(nxt):
                    break

                i += 1

                if self.HIST_RE.match(nxt):
                    etymology = nxt
                    in_definition = False
                    continue
                if self.KONSTR_RE.match(nxt):
                    construction = nxt
                    continue

                # Collect inflection lines (starting with > or ~)
                if nxt.startswith(">") or nxt.startswith("~"):
                    inflection = nxt
                    in_definition = False
                    continue
                # Compound breakdown lines (starting with +)
                if nxt.startswith("+"):
                    continue
                # Cross-reference lines
                if self.JFR_RE.match(nxt):
                    continue

                if in_definition:
                    def_lines.append(nxt)
                else:
                    example_lines.append(nxt)

            # Process definition
            definition = " ".join(def_lines)
            definition = re.sub(r"\s+", " ", definition).strip()
            # Clean definition markers
            definition = re.sub(r"^[«»\"\s]+", "", definition)
            definition = re.sub(r"[«»\"\s]+$", "", definition)

            # Extract example sentences (text after : or within ())
            examples = re.findall(r":\s*([^;]+)", definition)

            diff = "medium" if len(headword) < 6 else "hard" if len(headword) < 10 else "hard"
            entry = self._make_entry(
                phrase=headword,
                meaning=definition[:500] or f"Definition: {headword}",
                translation="",
                category="vocabulary",
                difficulty=diff,
                partOfSpeech=pos,
                sentence=examples[0].strip()[:300] if examples else None,
                notes=etymology[:300] if etymology else None,
                page_num=page_num,
                section="Svensk ordbok",
                confidence=0.9,
            )
            self.entries.append(entry)
            parsed += 1


# ── EXERCISE STRATEGY ────────────────────────────────────────────────
class ExerciseStrategy(BaseStrategy):
    """Extracts fill-in-blank exercises (___ pattern) with answer keys."""

    name = "exercise"
    BLANK_RE = re.compile(r"_{3,}")

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        lines = text.split("\n")
        blanks = []
        for line in lines:
            if self.BLANK_RE.search(line):
                blanks.append(line.strip())

        if not blanks:
            return

        for i, bline in enumerate(blanks):
            sentence = bline.replace("___", " ___ ")
            sentence = re.sub(r"\s+", " ", sentence).strip()

            # Find answer in inline parentheses
            answer = None
            inline = re.search(r"\(([^)]+)\)", bline)
            if inline:
                answer = inline.group(1).strip()
            else:
                for j in range(i + 1, min(i + 5, len(blanks))):
                    candidate = blanks[j].strip().split()[-1]
                    if len(candidate) > 2 and candidate.isalpha():
                        answer = candidate
                        break

            if not answer:
                continue
            if len(answer) > 30:
                continue
            valid, _ = PhraseValidator.is_good_entry(answer)
            if not valid:
                continue

            entry = self._make_entry(
                phrase=answer,
                meaning=f"Fill-in-blank: {sentence[:100]}",
                translation="",
                category="grammar",
                difficulty="medium",
                sentence=sentence,
                blankAnswer=answer,
                page_num=page_num,
                section="Exercise",
                confidence=0.7,
            )
            self.entries.append(entry)


# ── GRAMMAR RULE STRATEGY ────────────────────────────────────────────
class GrammarRuleStrategy(BaseStrategy):
    """Extracts grammar rules from sections with bold headers and examples."""

    name = "grammar"
    HEADER_RE = re.compile(
        r"(substanti[vf]|verb[^a]|adjektiv|pronomen|preposition|ordföljd|"
        r"bisats|huvudsats|tempus|imperfekt|presens|perfekt|futurum|"
        r"bestämd|obestämd|singular|plural|komparativ|superlativ|"
        r"imperativ|infinitiv|supinum|konjunktion)",
        re.IGNORECASE,
    )

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        lines = text.split("\n")
        grammar_section = False
        buffer = []

        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
            if self.HEADER_RE.search(stripped) and len(stripped) < 70:
                grammar_section = True
                continue
            if grammar_section and stripped and len(stripped) < 80:
                buffer.append(stripped)
            elif grammar_section and len(buffer) > 2:
                self._process_block(buffer, page_num)
                buffer = []
                grammar_section = False

        if buffer and len(buffer) > 2:
            self._process_block(buffer, page_num)

    def _process_block(self, lines: list[str], page_num: int):
        text = " ".join(lines)
        pairs = re.findall(
            r"([a-zåäöA-ZÅÄÖ][a-zåäö]+(?:[\s-]+[a-zåäö]+)*)\s*[—–=]\s*([a-zA-Z][a-zA-Z\s/]+)",
            text,
        )
        for sv, en in pairs:
            sv = sv.strip()
            en = en.strip()
            if len(sv) < 2 or len(en) < 2 or len(sv) > 60:
                continue
            valid, _ = PhraseValidator.is_good_entry(sv)
            if not valid:
                continue
            entry = self._make_entry(
                phrase=sv,
                meaning=en,
                translation=en,
                category="grammar",
                difficulty="medium",
                page_num=page_num,
                section="Grammar",
                confidence=0.7,
                notes=text[:300],
            )
            self.entries.append(entry)


# ── NOVEL STRATEGY ───────────────────────────────────────────────────
class NovelStrategy(BaseStrategy):
    """Extracts sentence examples from running text (for literature)."""

    name = "novel"

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        nlp = _get_nlp("sv")
        doc = nlp(text)

        seen_lemmas = set()
        for sent in doc.sents:
            sent_text = sent.text.strip()
            if len(sent_text) < 15 or len(sent_text) > 250:
                continue
            for token in sent:
                if token.pos_ not in ("NOUN", "VERB", "ADJ", "ADV"):
                    continue
                if len(token.text) < 3:
                    continue
                if token.text.lower() in PhraseValidator.STOP_WORDS:
                    continue
                if token.lemma_ in seen_lemmas or token.text.lower() in seen_lemmas:
                    continue
                valid, _ = PhraseValidator.is_good_entry(token.text)
                if not valid:
                    continue
                seen_lemmas.add(token.lemma_)
                seen_lemmas.add(token.text.lower())

                translation = lookup_translation(token.lemma_) or ""
                entry = self._make_entry(
                    phrase=token.text,
                    meaning=token.lemma_,
                    translation=translation,
                    category="literature",
                    difficulty=self._guess_difficulty(token.text),
                    sentence=sent_text,
                    page_num=page_num,
                    section="Reading",
                    confidence=0.4,
                    partOfSpeech=token.pos_,
                    lemma=token.lemma_,
                )
                self.entries.append(entry)


# ── IDIOM STRATEGY (Svenska idiom 3500) ──────────────────────────────
class IdiomStrategy(BaseStrategy):
    """Extracts Swedish idioms with definitions and example sentences.
    
    Handles full-page OCR for scanned PDFs. Each page = multiple idiom
    entries. Entry format: idiom phrase → definition → » example sentence.
    """

    name = "idiom"
    handles_own_ocr = True
    SKIP_FIRST = 3

    def _ocr_page(self, page: fitz.Page) -> str:
        pix = page.get_pixmap(dpi=200, colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        import tempfile, shutil
        tmp = tempfile.mkdtemp()
        try:
            img_path = os.path.join(tmp, "page.png")
            img.save(img_path)
            result = subprocess.run(
                [_TESSERACT_CMD, img_path, "stdout", "-l", "swe+eng", "--psm", "3"],
                capture_output=True, timeout=120,
            )
            return result.stdout.decode("utf-8", errors="replace")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        if page_num <= self.SKIP_FIRST:
            return

        ocr_text = self._ocr_page(page)

        # Split into paragraphs (blank-line separated = one idiom per paragraph)
        paragraphs = re.split(r"\n\s*\n", ocr_text.strip())

        for para in paragraphs:
            para = re.sub(r"\s+", " ", para).strip()
            if len(para) < 20:
                continue

            # Remove page headers (single-letter/bold alphabetical markers like "Aa", "Bb")
            para = re.sub(r"^[A-ZÅÄÖ][a-zåäö]?\s+", "", para)

            entry = self._parse_idiom_entry(para, page_num)
            if entry:
                self.entries.append(entry)

    def _parse_idiom_entry(self, para: str, page_num: int):
        """Parse one idiom paragraph into an Entry."""

        # Find example marker: » or +
        marker = None
        marker_pos = -1
        for m in ("»", " + ", " +"):
            pos = para.find(m)
            if pos != -1 and len(para) - pos > 15:
                marker = m
                marker_pos = pos
                break

        if marker_pos != -1:
            before = para[:marker_pos].strip()
            after = para[marker_pos + len(marker):].strip()
        else:
            before = para
            after = ""

        if len(before) < 10:
            return None

        # Remove leading punctuation/accents
        before = re.sub(r"^[•*\-|'`´‘ˈ]+", "", before).strip()

        # Strategy: extract idiom from the start of `before`.
        # The idiom is the first short phrase. The definition starts when
        # we encounter a word that clearly begins explanatory text.
        #
        # Common definition-starting indicators:
        # - "Man" (one, you) — very unlikely in an idiom
        # - "Någon/Något/Några" (someone/something)
        # - "När" (when), "Om" (if), "Att" (to) starting a clause
        # - "Bli/Blev/Vara/Ha/Göra/Säga" as explanatory verbs
        # - "Inte" + verb (not + verb — explanatory negation)
        # - "Allt/Alla/Ingen/Inget" (everything/everyone/nothing)
        # - "Utan/För/Genom" as prepositions starting a clause
        # - "Säga/Stödja/Kämpa/Förlora/etc" infinitive verbs explaining
        # - A word followed by a colon (definition pattern)
        # - "Verkligen/Faktiskt/Alltid/Aldrig" as adverbs starting explanation

        words = before.split()
        split_idx = len(words)

        # Pass 1: find a clear definition-start boundary
        # Check each word position (from index 2 to 6) for strong starters
        strong_starters = {
            "man", "någon", "något", "några", "när", "om", "att",
            "bli", "blev", "blivit", "vara", "varit", "göra", "gjorde",
            "säga", "sa", "sade", "säger", "inta", "inte",
            "alla", "allt", "ingen", "inget", "ingenting",
            "verkligen", "faktiskt", "alltid", "aldrig",
            "både", "utan", "genom", "genast", "fort",
            "stödja", "kämpa", "förlora", "hjälpa", "vinna",
            "misslyckas", "använda", "uttrycka", "betyda", "kallas",
            "mena", "innebära", "visa", "handla", "förklara",
            "uppleva", "känna", "tycka", "tro", "veta",
            "skratta", "gråta", "springa", "sitta", "stå", "ligga",
            "arbeta", "studera", "leva", "överleva", "klara",
            "acceptera", "förstå", "inse", "försöka",
            "sluta", "börja", "fortsätta", "hålla",
            "minska", "öka", "förbättra", "försämra",
            "kan", "måste", "skall", "ska", "får", "vill",
        }

        for i in range(2, min(len(words), 8)):
            w = words[i].lower().strip(".,:;\"'!?")
            if w in strong_starters:
                split_idx = i
                break
            # Also: word starting a new sentence after punctuation
            if i > 0 and words[i - 1][-1] in ".!?" and words[i][0].isupper():
                split_idx = i
                break

        # Pass 2: if no clear split found, use first sentence boundary
        if split_idx == len(words):
            first_sentence_match = re.match(r"^(.+?[.!])\s+", before)
            if first_sentence_match:
                first_sent = first_sentence_match.group(1)
                # The idiom is the first few words of the first sentence.
                # Take words up to the first natural verb/preposition boundary.
                sent_words = first_sent.split()
                for i in range(2, min(len(sent_words), 6)):
                    w = sent_words[i].lower().strip(".,:;")
                    if w in {"är", "betyder", "kallas", "innebär", "man", "när", "om"}:
                        split_idx = i
                        break
                if split_idx == len(sent_words):
                    split_idx = min(len(sent_words), min(len(words), 5))

        # Fallback: take first few words as idiom (try longer first)
        if split_idx == len(words):
            for guess in (6, 5, 3, 4, 2):
                if guess <= len(words):
                    split_idx = guess
                    break

        idiom = " ".join(words[:split_idx])
        definition = " ".join(words[split_idx:]) if split_idx < len(words) else ""

        # Clean up
        idiom = self._clean(idiom)
        definition = self._clean(definition)
        after = self._clean(after)

        # OCR fix
        idiom = ocr_correct(idiom)
        definition = ocr_correct(definition)
        after = ocr_correct(after)

        if len(idiom) < 3:
            return None

        diff = "easy" if len(idiom.split()) <= 3 else "medium" if len(idiom.split()) <= 5 else "hard"
        return self._make_entry(
            phrase=idiom,
            meaning=definition[:500] or idiom,
            translation="",
            category="Idiom",
            difficulty=diff,
            sentence=after[:300] if after else None,
            page_num=page_num,
            section="Idiom",
            confidence=0.9,
        )

    @staticmethod
    def _clean(s: str) -> str:
        return re.sub(r"\s+", " ", s).strip().strip(".,:;\"'")


# ── VOCAB EXERCISE STRATEGY (Bygg upp ditt ordförråd) ──────────────
class VocabExerciseStrategy(BaseStrategy):
    """Extracts vocabulary from Swedish exercise/workbook PDFs.
    
    Handles synonym/antonym pairs, word lists, fill-in-blank, and
    preposition exercises. Detects exercise type automatically per page.
    """

    name = "vocab_exercise"
    handles_own_ocr = True
    SKIP_FIRST = 3

    BLANK_RE = re.compile(r"\.{3,}|_{3,}")
    CHOICE_RE = re.compile(r"^[a-e]\)?\s*")
    NUM_ITEM_RE = re.compile(r"^\d+\s+")

    def _ocr_page(self, page: fitz.Page) -> str:
        pix = page.get_pixmap(dpi=200, colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        import tempfile, shutil
        tmp = tempfile.mkdtemp()
        try:
            img_path = os.path.join(tmp, "page.png")
            img.save(img_path)
            result = subprocess.run(
                [_TESSERACT_CMD, img_path, "stdout", "-l", "swe+eng", "--psm", "3"],
                capture_output=True, timeout=120,
            )
            return result.stdout.decode("utf-8", errors="replace")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        if page_num <= self.SKIP_FIRST:
            return

        ocr_text = self._ocr_page(page)
        lines = [l.strip() for l in ocr_text.split("\n") if l.strip()]

        # Extract topic header from first few lines
        topic = self._detect_topic(lines)

        # Classify exercise type
        if self._is_word_list(lines):
            self._parse_word_list(lines, page_num, topic)
        elif self._is_synonym_exercise(lines):
            self._parse_pair_exercise(lines, page_num, topic, "synonym")
        elif self._is_antonym_exercise(lines):
            self._parse_pair_exercise(lines, page_num, topic, "antonym")
        elif self._is_fill_blank(lines):
            self._parse_fill_blank(lines, page_num, topic)

    def _detect_topic(self, lines: list[str]) -> str:
        """Extract the topic/header from the page."""
        for line in lines[:10]:
            # Topic looks like: "13 Affärer, byggnader m. m." or "5 Motsatsord 1: adjektiv"
            m = re.match(r"^\d+\s+([A-ZÅÄÖ][A-Za-zåäö\s,.:;]+)", line)
            if m:
                return m.group(1).strip()
        return "Vocabulary"

    def _is_word_list(self, lines: list[str]) -> bool:
        """Detect if page has a list of single vocabulary words (labeling exercise)."""
        word_count = 0
        for line in lines:
            # Word list pattern: "en stekpanna", "ett rivjarn"
            if self._is_word_list_line(line):
                word_count += 1
        return word_count >= 5

    @staticmethod
    def _is_word_list_line(line: str) -> bool:
        """True if line is 'en/ett <word>' with only letters, spaces, hyphens after."""
        m = re.match(r"^(en|ett)\s+([A-Za-zåäöÅÄÖ][A-Za-zåäöÅÄÖ-]*(\s+[A-Za-zåäöÅÄÖ][A-Za-zåäöÅÄÖ-]*)*)$", line.strip(), re.IGNORECASE)
        if not m:
            return False
        rest = m.group(2)
        if re.search(r"[0-9a-e]\b", rest):  # reject "ai b av c pa" choice junk
            return False
        return len(rest) >= 2

    def _is_synonym_exercise(self, lines: list[str]) -> bool:
        """Detect synonym exercise."""
        for line in lines[:20]:
            if "synonym" in line.lower() and "skriv" in line.lower():
                return True
        return False

    def _is_antonym_exercise(self, lines: list[str]) -> bool:
        for line in lines[:20]:
            if "motsatsord" in line.lower():
                return True
        return False

    def _is_fill_blank(self, lines: list[str]) -> bool:
        blank_count = 0
        for line in lines:
            if self.BLANK_RE.search(line):
                blank_count += 1
        return blank_count >= 3

    def _parse_word_list(self, lines: list[str], page_num: int, topic: str):
        """Extract vocabulary from word lists like 'en stekpanna', 'ett rivjarn'."""
        for line in lines:
            line = re.sub(r"\s+", " ", line).strip()
            if not self._is_word_list_line(line):
                continue
            m = re.match(r"^(en|ett)\s+(.+)$", line, re.IGNORECASE)
            if m:
                article = m.group(1).lower()
                word = m.group(2).strip().rstrip(".,:;")
                word = ocr_correct(word)
                if len(word) < 2:
                    continue
                phrase = f"{article} {word}" if article == "en" else f"{article} {word}"
                entry = self._make_entry(
                    phrase=phrase,
                    meaning=word,
                    translation="",
                    category=topic,
                    difficulty="medium",
                    page_num=page_num,
                    section=topic,
                    confidence=0.9,
                    partOfSpeech="s.",
                )
                self.entries.append(entry)

    def _parse_pair_exercise(self, lines: list[str], page_num: int, topic: str, pair_type: str):
        """Extract word pairs from synonym/antonym exercises.

        Format:
        1 snäll          trist
        2 hemsk          nervös
        etc.
        """
        # Collect numbered items
        pairs: list[tuple[str, str]] = []
        for line in lines:
            m = re.match(r"^(\d+)\s+(.+)$", line)
            if m:
                rest = m.group(2).strip()
                # Check if the rest has two words or more
                parts = re.split(r"\s{2,}", rest)  # split on 2+ spaces
                if len(parts) >= 2:
                    left = parts[0].strip().rstrip(".,:;")
                    right = parts[-1].strip().rstrip(".,:;")  # last part = answer
                    if len(left) > 1 and len(right) > 1:
                        pairs.append((left, right))
                else:
                    # Single word on left, answer in a box/pool at top
                    # For these, each numbered item is just one word
                    pass

        # If pairs found, create entries
        for left, right in pairs:
            left_clean = ocr_correct(left)
            right_clean = ocr_correct(right)
            for word, related in [(left_clean, right_clean), (right_clean, left_clean)]:
                if len(word) < 2:
                    continue
                entry = self._make_entry(
                    phrase=word,
                    meaning=f"{pair_type}: {related}",
                    translation="",
                    category=f"{topic} ({pair_type})",
                    difficulty="medium",
                    related=[related],
                    page_num=page_num,
                    section=topic,
                    confidence=0.85,
                )
                self.entries.append(entry)

        # Fallback: numbered items on separate lines (word bank exercise).
        # e.g. "1 snäll" then word bank below. Pairing unknown -> extract
        # each numbered word as an individual entry.
        if not pairs:
            numbered = []
            for line in lines:
                m = re.match(r"^(\d+)\s+([A-Za-zåäöÅÄÖ][A-Za-zåäöÅÄÖ-]+)$", line.strip())
                if m:
                    numbered.append((m.group(1), m.group(2)))
            bank_limit = max(len(numbered), 1)

            for _, raw in numbered:
                word = ocr_correct(raw)
                if len(word) < 2:
                    continue
                entry = self._make_entry(
                    phrase=word,
                    meaning=f"{pair_type} exercise word ({topic})",
                    translation="",
                    category=f"{topic} ({pair_type})",
                    difficulty="medium",
                    page_num=page_num,
                    section=topic,
                    confidence=0.7,
                )
                self.entries.append(entry)

            # Word bank: single alpha-only words after numbered list,
            # capped at the number of numbered items (stops at other content)
            bank_started = False
            bank_count = 0
            for line in lines:
                m = re.match(r"^(\d+)\s+([A-Za-zåäöÅÄÖ][A-Za-zåäöÅÄÖ-]+)$", line.strip())
                if m:
                    bank_started = True
                    continue
                if not bank_started or bank_count >= bank_limit:
                    continue
                w = line.strip().rstrip(".,;:")
                if (re.fullmatch(r"[A-Za-zåäöÅÄÖ][A-Za-zåäöÅÄÖ-]{1,19}", w)
                        and not w.isupper()):
                    word = ocr_correct(w)
                    if len(word) < 2:
                        continue
                    bank_count += 1
                    entry = self._make_entry(
                        phrase=word,
                        meaning=f"{pair_type} word bank ({topic})",
                        translation="",
                        category=f"{topic} ({pair_type})",
                        difficulty="medium",
                        page_num=page_num,
                        section=topic,
                        confidence=0.7,
                    )
                    self.entries.append(entry)

    def _parse_fill_blank(self, lines: list[str], page_num: int, topic: str):
        """Extract fill-in-blank exercises (only clean sentence patterns)."""
        blanks = []
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            if self.BLANK_RE.search(line):
                # Check for multiple choice options on following lines
                choices = []
                for j in range(i + 1, min(i + 5, len(lines))):
                    next_line = lines[j].strip()
                    if self.CHOICE_RE.match(next_line):
                        choices.append(next_line)
                    elif next_line.startswith("a ") or next_line.startswith("b "):
                        choices.append(next_line)
                    else:
                        break
                blanks.append((line, choices))
            i += 1

        for sentence, choices in blanks[:20]:
            sentence_clean = re.sub(r"[.\-_]{2,}", " ... ", sentence)
            sentence_clean = re.sub(r"\s+", " ", sentence_clean).strip()
            # Quality gate: mostly letters/spaces, at least 4 real words
            letters = sum(1 for c in sentence_clean if c.isalpha())
            total = len([c for c in sentence_clean if c.strip()])
            words = [w for w in sentence_clean.split() if w.isalpha()]
            if total and letters / total < 0.6:
                continue
            if len(words) < 4:
                continue
            if not any(w in sentence_clean.lower() for w in ("är", "ar", "har", "att", "till", "i ", "pa", "på", "om", "med", "for", "för", "kan", "ska", "skall", "vill", "en", "ett", "den", "det")):
                continue
            entry = self._make_entry(
                phrase=sentence_clean[:200],
                meaning=f"{topic}: fill in the blank",
                translation="",
                category=topic or "Grammar",
                difficulty="medium",
                blankAnswer="...",
                page_num=page_num,
                section=topic or "Exercise",
                confidence=0.4,
            )
            self.entries.append(entry)


# ── PHRASE STRATEGY ─────────────────────────────────────────────────
class PhraseStrategy(BaseStrategy):
    """Extracts situation-based phrases from dialogue books (e.g. 'Så säger man').

    Layout: chapter header line, then mini-dialogues. Each turn starts with
    an em-dash ('—', OCR'd as '-'/'–'/'~'). Parenthetical comments in the
    right column attach to the preceding turn as usage notes.
    """

    name = "phrase"
    handles_own_ocr = True

    TURN_RE = re.compile(r"^[—–~\-–]+\s*(.+)$")
    HEADER_RE = re.compile(r"^(\d+)\s+([A-ZÅÄÖ][A-Za-zåäöÅÄÖ,.\s:;()/-]{4,80})$")
    COMMENT_RE = re.compile(r"^\((.+)\)$")
    TRAILING_NUMBERS_RE = re.compile(r"\s+\d+(\.\d+)*\.?\s*$")

    def _ocr_page(self, page: fitz.Page) -> str:
        pix = page.get_pixmap(dpi=200, colorspace=fitz.csRGB)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        import tempfile, shutil
        tmp = tempfile.mkdtemp()
        try:
            img_path = os.path.join(tmp, "page.png")
            img.save(img_path)
            result = subprocess.run(
                [_TESSERACT_CMD, img_path, "stdout", "-l", "swe+eng", "--psm", "3"],
                capture_output=True, timeout=120,
            )
            return result.stdout.decode("utf-8", errors="replace")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def process_page(self, page_num: int, text: str, page: fitz.Page):
        ocr_text = self._ocr_page(page)
        lines = [l.strip() for l in ocr_text.split("\n") if l.strip()]

        turn_count = 0
        for line in lines:
            if self.TURN_RE.match(line):
                turn_count += 1
        if turn_count < 4:
            return

        topic = self._detect_topic(lines)
        current = None          # list of lines for the current turn
        pending_note = None
        seen_comment = False

        def flush():
            nonlocal current, pending_note
            if current:
                self._emit(" ".join(current), topic, pending_note, page_num)
            current = None
            pending_note = None

        for line in lines:
            m = self.TURN_RE.match(line)
            if m:
                flush()
                current = [m.group(1).strip()]
                seen_comment = False
                continue
            if self.COMMENT_RE.match(line):
                seen_comment = True
                note = self.COMMENT_RE.match(line).group(1).strip()
                pending_note = note if pending_note is None else pending_note + " " + note
                continue
            if self.HEADER_RE.match(line):
                flush()
                topic = line
                continue
            # Comment continuation (no opening paren)
            if seen_comment and ")" in line:
                txt = re.sub(r"^[+\-–—~\s]+", "", line).rstrip(")")
                if txt:
                    pending_note = pending_note + " " + txt if pending_note else txt
                continue
            # Turn continuation line (wrapped dialogue text)
            if current is not None and not seen_comment and "(" not in line:
                current.append(line)

        flush()

    def _detect_topic(self, lines: list[str]) -> str:
        for line in lines[:12]:
            m = self.HEADER_RE.match(line)
            if m:
                return line
        return "Fraser"

    def _emit(self, phrase: str, topic: str, note: str, page_num: int):
        # Strip inline parenthetical comments and keep as note
        inline = re.findall(r"\(([^()]{2,60})\)", phrase)
        phrase = re.sub(r"\s*\([^()]*\)\s*", " ", phrase)
        if inline and note is None:
            note = " ".join(inline)
        phrase = re.sub(r"\s+", " ", phrase).strip()
        phrase = re.sub(r"-\s+", "", phrase)  # rejoin hyphen-split lines
        phrase = self.TRAILING_NUMBERS_RE.sub("", phrase)
        phrase = phrase.rstrip("—–-")
        phrase = ocr_correct(phrase)
        if len(phrase) < 2 or len(phrase) > 160:
            return
        words = [w for w in phrase.split() if w.isalpha()]
        letters = sum(1 for c in phrase if c.isalpha())
        if letters and letters / len([c for c in phrase if c.strip()]) < 0.5:
            return
        if len(words) < 1:
            return
        entry = self._make_entry(
            phrase=phrase,
            meaning=topic,
            translation="",
            category=topic,
            difficulty="medium",
            notes=note or None,
            page_num=page_num,
            section=topic,
            confidence=0.75,
        )
        self.entries.append(entry)


# ── FUSION ENGINE ────────────────────────────────────────────────────
class FusionEngine:
    """Cross-strategy voting to deduplicate and score entries."""

    def __init__(self):
        self.min_auto_accept = 0.5

    def fuse(self, all_entries: list[Entry]) -> tuple[list[Entry], list[Entry]]:
        groups: dict[str, list[Entry]] = {}
        for e in all_entries:
            key = e.phrase.strip().lower()
            groups.setdefault(key, []).append(e)

        accepted = []
        review = []

        for key, entries in groups.items():
            strategies = set(e.strategy for e in entries)
            best = max(entries, key=lambda x: x.confidence)

            confidences = [e.confidence for e in entries]
            avg_conf = sum(confidences) / len(confidences)
            strategy_bonus = min(0.15, (len(strategies) - 1) * 0.08)
            fused_conf = min(1.0, avg_conf + strategy_bonus)
            best.confidence = fused_conf

            sources = [e.source for e in entries if e.source]
            if sources:
                best.source = sources[0]

            all_related = set()
            for e in entries:
                all_related.update(e.related or [])
            if all_related:
                best.related = sorted(all_related)[:10]

            sentences = [e.sentence for e in entries if e.sentence]
            if sentences:
                best.sentence = max(sentences, key=len)

            meanings = [e.meaning for e in entries if e.meaning and e.meaning != e.phrase]
            if meanings:
                best.meaning = max(meanings, key=len)

            translations = [e.translation for e in entries if e.translation]
            if translations:
                best.translation = max(translations, key=len)

            if fused_conf >= self.min_auto_accept:
                accepted.append(best)
            else:
                review.append(best)

        accepted.sort(key=lambda x: -x.confidence)
        review.sort(key=lambda x: -x.confidence)
        return accepted, review


# ── PIPELINE ─────────────────────────────────────────────────────────
class ExtractionPipeline:
    def __init__(self, pdf_path: str, enable_novel: bool = False):
        self.pdf_path = pdf_path
        self.book_name = os.path.splitext(os.path.basename(pdf_path))[0]
        self.doc = fitz.open(pdf_path)
        self.page_count = self.doc.page_count
        self.strategies: list[BaseStrategy] = []
        self.fusion = FusionEngine()
        self.enable_novel = enable_novel

    def add_strategy(self, strategy: BaseStrategy):
        self.strategies.append(strategy)

    def classify_and_extract(self, max_pages: int = None, start_page: int = 0):
        limit = max_pages or self.page_count
        for i in range(min(limit, self.page_count)):
            page_num = i + 1
            page = self.doc[i]
            info = PageClassifier.classify(page)

            # If any strategy handles its own OCR (e.g., DictionaryStrategy),
            # skip the full-page OCR to save time
            needs_full_ocr = any(
                getattr(s, "handles_own_ocr", False) is False
                for s in self.strategies
            )

            text = info["raw_text"]
            if needs_full_ocr:
                if info["use_ocr"]:
                    text = ocr_page(page, "swe+eng")
                if not text or len(text.strip()) < 20:
                    text = ocr_page(page, "swe+eng")

            # Skip strategy processing for pages before resume point
            if page_num > start_page:
                if text and len(text.strip()) > 10:
                    for strategy in self.strategies:
                        strategy.process_page(page_num, text.strip(), page)
                else:
                    for strategy in self.strategies:
                        if getattr(strategy, "handles_own_ocr", False):
                            strategy.process_page(page_num, "", page)

            yield page_num, page, info

    def run(self, max_pages: int = None, start_page: int = 0) -> tuple[list[Entry], list[Entry]]:
        print(f"[Pipeline] {self.book_name[:50]} — {self.page_count}p, {len(self.strategies)} strategies", file=sys.stderr)

        consumed = 0
        for _ in self.classify_and_extract(max_pages, start_page=start_page):
            consumed += 1

        raw = sum(len(s.get_entries()) for s in self.strategies)
        print(f"[Pipeline] Processed {consumed}p, {raw} raw candidates", file=sys.stderr)

        all_entries = []
        for s in self.strategies:
            all_entries.extend(s.get_entries())

        accepted, review = self.fusion.fuse(all_entries)
        print(f"[Pipeline] Auto-accepted: {len(accepted)}, Needs review: {len(review)}", file=sys.stderr)
        return accepted, review

    def close(self):
        self.doc.close()


# ── RUNNER ───────────────────────────────────────────────────────────
AUTO_ACCEPT_THRESHOLD = 0.7

def run(pdf_path: str, max_pages: int = None,
        preload_dictionaries: list[str] = None,
        enable_novel: bool = False,
        strategy: str = "word_list",
        checkpoint_path: str = None,
        checkpoint_every: int = 25,
        resume: bool = False,
        start_page: int = 0) -> dict:

    if preload_dictionaries:
        for d in preload_dictionaries:
            if os.path.exists(d):
                load_dictionary_from_pdf(d)

    book_name = os.path.splitext(os.path.basename(pdf_path))[0]

    # Load checkpoint to resume
    loaded_entries: list[dict] = []
    if resume and checkpoint_path and os.path.exists(checkpoint_path):
        with open(checkpoint_path, "r", encoding="utf-8") as f:
            ckpt = json.load(f)
            loaded_entries = ckpt.get("entries", [])
            start_page = ckpt.get("next_page", 0)
        print(f"[Checkpoint] Resumed from page {start_page}, {len(loaded_entries)} saved entries", file=sys.stderr)

    pipe = ExtractionPipeline(pdf_path, enable_novel=enable_novel)
    if strategy == "dictionary":
        pipe.add_strategy(DictionaryStrategy(book_name))
    elif strategy == "rich_dictionary":
        pipe.add_strategy(RichDictionaryStrategy(book_name))
    elif strategy == "idiom":
        pipe.add_strategy(IdiomStrategy(book_name))
    elif strategy == "vocab_exercise":
        pipe.add_strategy(VocabExerciseStrategy(book_name))
    elif strategy == "phrase":
        pipe.add_strategy(PhraseStrategy(book_name))
    elif strategy == "novel":
        pipe.add_strategy(NovelStrategy(book_name))
    else:
        pipe.add_strategy(WordListStrategy(book_name))
    if enable_novel:
        pipe.add_strategy(NovelStrategy(book_name))

    # Collect previously extracted entries
    from imports.extract.schemas import Entry
    previous_entries: list[Entry] = []
    seen_keys: set[tuple[str, str]] = set()
    for d in loaded_entries:
        e = Entry.from_dict(d)
        key = (e.phrase.lower().strip(), e.category)
        if key not in seen_keys:
            seen_keys.add(key)
            previous_entries.append(e)

    # Skip already-processed pages
    limit = max_pages or pipe.page_count
    processed = start_page
    all_entries = list(previous_entries)

    def save_checkpoint():
        acc, rev = pipe.fusion.fuse(all_entries + 
            [e for s in pipe.strategies for e in s.get_entries()])
        ckpt = {
            "next_page": processed + 1,
            "total_pages": pipe.page_count,
            "total_raw": len(all_entries) + sum(len(s.get_entries()) for s in pipe.strategies),
            "auto_accepted": len(acc),
            "needs_review": len(rev),
            "entries": [e.to_dict() for e in all_entries]
                + [e.to_dict() for s in pipe.strategies for e in s.get_entries()],
        }
        with open(checkpoint_path, "w", encoding="utf-8") as f:
            json.dump(ckpt, f, ensure_ascii=False, indent=2)
        print(f"[Checkpoint] Saved page {processed}/{pipe.page_count}, "
              f"{len(acc)} accepted, {len(rev)} review", file=sys.stderr)

    for i, page, info in pipe.classify_and_extract(limit, start_page=start_page):
        if i <= start_page:
            continue
        processed = i
        if checkpoint_path and processed % checkpoint_every == 0:
            save_checkpoint()

    # Final: fuse all entries
    for s in pipe.strategies:
        all_entries.extend(s.get_entries())

    total_raw = len(all_entries)
    print(f"[Pipeline] Processed {processed}p, {total_raw} raw candidates", file=sys.stderr)

    accepted_entries, review_entries = pipe.fusion.fuse(all_entries)
    print(f"[Pipeline] Auto-accepted: {len(accepted_entries)}, Needs review: {len(review_entries)}", file=sys.stderr)

    pipe.close()

    result = {
        "accepted": [e.to_dict() for e in accepted_entries],
        "review": [e.to_dict() for e in review_entries],
        "stats": {
            "total_raw": total_raw,
            "auto_accepted": len(accepted_entries),
            "needs_review": len(review_entries),
        },
    }

    if checkpoint_path:
        with open(checkpoint_path, "w", encoding="utf-8") as f:
            json.dump({
                "next_page": processed + 1,
                "total_pages": pipe.page_count,
                "total_raw": total_raw,
                "auto_accepted": len(accepted_entries),
                "needs_review": len(review_entries),
                "accepted": result["accepted"],
                "review": result["review"],
                "entries": [e.to_dict() for e in all_entries],
            }, f, ensure_ascii=False, indent=2)
        print(f"[Checkpoint] Final save: {len(accepted_entries)} accepted", file=sys.stderr)

    return result


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Extract flashcards from Swedish PDF")
    parser.add_argument("pdf", help="Path to PDF file")
    parser.add_argument("--max-pages", type=int, default=None)
    parser.add_argument("--dictionary", nargs="*", default=[])
    parser.add_argument("--novel", action="store_true", help="Enable novel (full-text vocab) strategy")
    parser.add_argument("--output", default=None)
    args = parser.parse_args()

    result = run(args.pdf, args.max_pages, args.dictionary, args.novel)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"Saved to {args.output}")
    else:
        print(json.dumps(result["stats"], indent=2))
        for e in result["accepted"][:15]:
            print(json.dumps(e, ensure_ascii=False))
