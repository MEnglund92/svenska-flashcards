"""
Build novels_reading.json — chapter text + key vocabulary for all 8 novels.

Chapter segmentation:
- TOC-driven where the EPUB TOC has real chapter entries (solsken, expeditionen,
  harskarteknik, idioter, tio tankar, alevangeliet)
- Auto units for Ondskan (no chapter structure at all) and Sapiens (parts only)
- All page numbers in EPUB page numbering (matches data_<book>.json page_num,
  which keeps per-chapter vocabulary mapping exact)
"""

import sys, os, json, re, glob
from collections import Counter
sys.stdout.reconfigure(encoding='utf-8')
from _common import ROOT, APP_DIR, SOURCES_DIR, setup_paths
setup_paths()

import fitz
import spacy

SOURCES = SOURCES_DIR

# book id -> (glob pattern on Sources, data file for vocab)
BOOKS = [
    ('solsken',          'Ett jävla solsken*',            'data_ett_javla_solsken.json'),
    ('expeditionen',     'Expeditionen*',                 'data_expeditionen_min_karlekshistoria.json'),
    ('harskarteknik',    'Härskarteknik*',                'data_harskarteknik.json'),
    ('idioter',          'Omgiven av idioter*',           'data_omgiven_av_idioter_hur_man_forstar_dem_som_inte_gar_att_forsta.json'),
    ('ondskan',          'Ondskan*',                      'data_ondskan.json'),
    ('sapiens',          'Sapiens*',                      'data_sapiens.json'),
    ('tio_tankar',       'Tio tankar om arbete*',         'data_tio_tankar_om_arbete.json'),
    ('alevangeliet',     'Ålevangeliet*',                 'data_alevangeliet_berattelsen_om_varldens_mest_gatfulla_fisk.json'),
]

FRONT_MATTER = {'omslag', 'titel', 'titelsida', 'upphovsrätt', 'copyright', 'innehåll',
                'tack', 'källor', 'kallor', 'bilder', 'mer om', 'om fatima', 'tidigare utgivning',
                'referens- och inspirationslitteratur', 'referens', 'författaren'}

SKIP_CHAPTERS = {
    'solsken':   {'om boken', 'några ord om mina källor'},
    'harskarteknik': {'tack'},
    'idioter':   {},
    'expeditionen': {},
    'tio_tankar': {},
    'alevangeliet': {},
    'sapiens':   {},
    'ondskan':   {},
}


def parse_meta(filename):
    name = os.path.basename(filename)
    title = name.split(' (')[0]
    m = re.search(r'\((.*?)\)', name)
    author = m.group(1).strip() if m else ''
    return title, author


def toc_chapters(doc):
    """Return (title, page) list from TOC, page numbers 1-based."""
    toc = doc.get_toc()
    if not toc:
        return []
    chapters = []
    for lvl, title, page in toc:
        if lvl != 1:
            continue
        t = title.strip()
        low = t.lower()
        if any(low.startswith(fm) for fm in FRONT_MATTER):
            continue
        chapters.append((t, page))
    return chapters


def build_page_texts(doc):
    texts = []
    for i in range(doc.page_count):
        texts.append(doc[i].get_text())
    return texts


def find_headers(page_texts):
    """Lines appearing on many pages = running headers/footers."""
    counter = Counter()
    for t in page_texts:
        seen = set()
        for line in t.split('\n'):
            s = line.strip()
            if 3 <= len(s) <= 45 and not s.endswith(('.', '!', '?', ':')) and not s.startswith('—'):
                seen.add(s)
        counter.update(seen)
    thresh = max(0.35 * len(page_texts), 8)
    return {line for line, c in counter.items() if c >= thresh}


def clean_text(raw, headers):
    """Returns (clean_text, ends_with_paragraph_break)."""
    out_lines = []
    for line in raw.split('\n'):
        s = line.strip()
        if not s:
            if out_lines and out_lines[-1] != '':
                out_lines.append('')
            continue
        if s in headers:
            continue
        if re.fullmatch(r'[\dIVXLCivxlc.,\-–—\s]*', s) and len(s) <= 12 and s.replace(' ', '').isdigit():
            continue
        if re.match(r'^(https?://|www\.)', s):
            continue
        out_lines.append(s)
    text = '\n'.join(out_lines)
    text = re.sub(r'([a-zåäö])-\n([a-zåäö])', r'\1\2', text)   # join hyphen splits
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip(), (out_lines and out_lines[-1] == '')


def segment_toc(chapters, page_count):
    """Build (title, start1, end1) inclusive ranges from TOC entries."""
    segs = []
    for idx, (title, start) in enumerate(chapters):
        end = chapters[idx + 1][1] - 1 if idx + 1 < len(chapters) else page_count
        if end < start:
            continue
        segs.append((title, start, end))
    return segs


def fixed_units(title, start1, end1, size):
    out = []
    n = 1
    for s in range(start1, end1 + 1, size):
        e = min(s + size - 1, end1)
        out.append((f'{title} {n}', s, e))
        n += 1
    return out


def load_entry_index(data_file):
    """lemma/phrase -> entry info, from data_<book>.json review entries."""
    load_data_js_translations()
    load_vocab_translations()
    idx = {}
    try:
        with open(os.path.join(ROOT, data_file), encoding='utf-8') as f:
            d = json.load(f)
    except Exception:
        return idx
    entries = []
    if isinstance(d, dict):
        entries = d.get('review', []) + d.get('accepted', [])
    elif isinstance(d, list):
        entries = d
    for e in entries:
        lemma = (e.get('lemma') or e.get('phrase') or '').strip().lower()
        if not lemma or len(lemma) < 3:
            continue
        if lemma not in idx:
            trans = (e.get('translation') or '').strip() or DATA_JS_TRANS.get(lemma, '') or VOCAB_TRANS.get(lemma, '')
            idx[lemma] = {
                'pos': e.get('partOfSpeech', ''),
                'trans': trans,
                'phrase': e.get('phrase', ''),
            }
    return idx


def chapter_vocab(text, nlp, index, limit=30):
    doc = nlp(text)
    counts = Counter()
    forms = {}
    for tok in doc:
        if tok.pos_ not in ('NOUN', 'VERB', 'ADJ', 'ADV'):
            continue
        if len(tok.text) < 3:
            continue
        lemma = tok.lemma_.lower()
        if lemma in COMMON_WORDS:
            continue
        if lemma not in index:
            continue
        counts[lemma] += 1
        forms.setdefault(lemma, tok.text)
    out = []
    for lemma, c in counts.most_common(limit):
        if c < 2:
            continue
        info = index[lemma]
        out.append({'w': forms[lemma], 'lemma': lemma, 'pos': info['pos'],
                    'trans': info['trans'], 'count': c})
    return out


# Very common content words excluded from per-chapter vocab lists
COMMON_WORDS = set('''
bli blir blev blivit vara är var varit varit var inte inte ha har hade haft ha
göra gör gjorde gjort gå går gick gått kom kommer kommit komma se ser såg sett
såg säga säger sa sagt säger tala talar talade sagt fråga frågade frågar säga
vet veta visste vet veta ville vill velat vilja kunna kan kunde kunnat ska skall
skulle ska ta tar tog tagit ge ger gav gett få får fick fått finna finner fann
funnit finnas finns fanns ligga ligger låg legat stå står stod stått sitta
sitter satt suttit äta äter åt ätit dricka dricker drack druckit lägga lägger
lade lagt kalla kallar kallade kallat tänka tänker tänkte tänkt tro tror trodde
trott tycka tycker tyckte tyckt mena menar menade menat börja började börjat
sluta slutar slutade slutat fortsätta fortsätter fortsatte fortsatt göra tog
samma samma mycket mycket mycket många många fler flest mer mest minst mindre
stor stort stora större störst liten litet lilla mindre minst gammal gamla
äldre äldst ny nya nytt nyare nyast bra bättre bäst dålig dåliga sämre sämst
god gott goda bättre bäst man mannen män folk människor människa tid tiden tider
år året åren dag dagen dagar natt natten nätter vecka veckan veckor månad
månaden minuter timme timmen timmar ögonblick ögonblicket kväll kvällen morgon
morgonen hem hus huset rum rummet plats platsen ställe stället sak saken saker
del delen delar gång gången gånger sätt sättet sätt fall fallet fråga frågan
frågor svar svaret frågor frågorna ord ordet orden mening meningen meningar
historia historien berättelse berättelsen berättelser bok boken böcker
värld världen land landet länder stad staden städer liv livet gång ögonen öga
ögon hand händerna huvud huvudet ansikte ansiktet kropp kroppen röst rösten
röster barn barnet barnen pojke pojken pojkar flicka flickan flickor kvinna
kvinnan kvinnor mannen männen farsan farsan mor modern mamma pappa far fadern
föräldrar föräldrarna familj familjen familjer hemmet
'''.split())

# Fallback translations from the curated data.js
DATA_JS_TRANS = {}
VOCAB_TRANS = {}


def load_vocab_translations():
    global VOCAB_TRANS
    if VOCAB_TRANS:
        return
    path = os.path.join(ROOT, 'vocab_translations.json')
    if os.path.exists(path):
        try:
            VOCAB_TRANS = json.load(open(path, encoding='utf-8'))
        except Exception:
            VOCAB_TRANS = {}


def load_data_js_translations():
    global DATA_JS_TRANS
    if DATA_JS_TRANS:
        return
    path = os.path.join(APP_DIR, 'data.js')
    if not os.path.exists(path):
        return
    text = open(path, encoding='utf-8').read()
    for m in re.finditer(r'phrase:\s*"([^"]+)",[^}]*?translation:\s*"([^"]+)"', text):
        DATA_JS_TRANS[m.group(1).strip().lower()] = m.group(2).strip()
    # also map via meaning-like Swedish forms
    for m in re.finditer(r'meaning:\s*"([^"]+)",[^}]*?translation:\s*"([^"]+)"', text):
        sv = m.group(1).split('—')[0].split(' – ')[0].strip().lower()
        if len(sv) > 2:
            DATA_JS_TRANS.setdefault(sv, m.group(2).strip())


def split_units(text, target=12000, min_unit=4000):
    """Split chapter text into reading units at paragraph boundaries."""
    paras = text.split('\n\n')
    units, cur, curlen = [], [], 0
    for p in paras:
        if cur and curlen + len(p) > target:
            units.append('\n\n'.join(cur))
            cur, curlen = [], 0
        cur.append(p)
        curlen += len(p)
    if cur:
        units.append('\n\n'.join(cur))
    if len(units) <= 1:
        return units
    merged = []
    for u in units:
        if merged and len(u) < min_unit and len(merged[-1]) + len(u) < target * 1.6:
            merged[-1] += '\n\n' + u
        else:
            merged.append(u)
    return merged


def slug(s):
    return re.sub(r'[^a-zåäö0-9]+', '_', s.lower()).strip('_')


def main():
    nlp = spacy.load('sv_core_news_sm')
    novels = []
    for bid, pattern, data_file in BOOKS:
        matches = sorted(glob.glob(os.path.join(SOURCES, pattern + '.epub')))
        if not matches:
            matches = sorted(glob.glob(os.path.join(SOURCES, pattern + '.pdf')))
        if not matches:
            print(f'!! no source for {bid}')
            continue
        src = matches[0]
        title, author = parse_meta(src)
        doc = fitz.open(src)
        n_pages = doc.page_count
        page_texts = build_page_texts(doc)
        headers = find_headers(page_texts)

        toc = toc_chapters(doc)
        skips = SKIP_CHAPTERS.get(bid, set())
        if bid == 'sapiens':
            parts = toc_chapters(doc)
            parts = [p for p in parts if p[0].lower() not in FRONT_MATTER]
            segs = []
            for (pt, ps) in parts:
                pe = parts[parts.index((pt, ps)) + 1][1] - 1 if parts.index((pt, ps)) + 1 < len(parts) else n_pages
                segs.extend(fixed_units(pt, ps, pe, 15))
        elif bid == 'ondskan':
            segs = fixed_units('Del', 4, n_pages, 14)
        else:
            chapters = [(t, p) for t, p in toc if t.lower() not in skips]
            if not chapters:
                segs = fixed_units('Del', 4, n_pages, 14)
            else:
                segs = segment_toc(chapters, n_pages)

        index = load_entry_index(data_file)
        book = {'id': bid, 'title': title, 'author': author, 'source': os.path.basename(src),
                'chapters': []}
        for n, (ctitle, s, e) in enumerate(segs, 1):
            joined = []
            prev_break = True
            for p in range(s - 1, e):
                c, ends = clean_text(page_texts[p], headers)
                if not c:
                    continue
                if joined:
                    joined.append('\n\n' if prev_break else ' ')
                joined.append(c)
                prev_break = ends
            text = ''.join(joined)
            units = split_units(text)
            for ui, unit in enumerate(units, 1):
                if len(units) > 1:
                    utitle = f'{ctitle} ({ui}/{len(units)})'
                else:
                    utitle = ctitle
                vocab = chapter_vocab(unit, nlp, index) if unit else []
                book['chapters'].append({
                    'n': n, 'title': utitle, 'pages': f'{s}–{e}', 'text': unit, 'vocab': vocab,
                })
                print(f'{bid} ch{n:02d}{("."+str(ui)) if len(units)>1 else ""} [{s:>3}-{e:>3}] {utitle[:42]:44s} {len(unit):>6} chars, {len(vocab)} vocab')
        novels.append(book)
        doc.close()

    out = os.path.join(APP_DIR, 'novels_reading.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump({'generated': '2026-07-31', 'novels': novels}, f, ensure_ascii=False)

    total_ch = sum(len(b['chapters']) for b in novels)
    total_chars = sum(len(c['text']) for b in novels for c in b['chapters'])
    print(f'\n{len(novels)} novels, {total_ch} chapters, {total_chars:,} chars -> {out}')


if __name__ == '__main__':
    main()
