# Swedish Flashcards — Progress & Handover Plan

**Date:** 2026-07-31
**Project:** Extract flashcard entries (phrase / meaning / example sentence) from Swedish learning PDFs into JSON for a language-learning app.
**Total auto-accepted entries so far: 47,255** across 24 sources + review queues (8 novels, ~82k entries, all in review by design).

---

## 1. Project Overview

A generic multi-strategy PDF extraction pipeline that converts Swedish textbooks, workbooks, dictionaries, and phrase books into flashcard entries. Each entry contains:

- `phrase` — the word / phrase / idiom / dialogue turn
- `meaning` — Swedish definition or gloss
- `translation` — English translation (when dictionary lookup available)
- `sentence` — example sentence with the word in context
- `category` / `section` — topical grouping (e.g. "Saker i hemmet", "Synonymer")
- `difficulty` — easy / medium / hard
- `confidence` — 0.0–1.0, drives auto-accept vs review routing
- `source`, `page_num`, `notes`, `partOfSpeech`, `lemma`, `related`

Output files: `data_<book>.json` in `C:\Users\Matt\Desktop\Education\Svenska\`.

---

## 2. Environment (setup on the new computer)

- **OS:** Windows, PowerShell 5.1
- **Python:** 3.12 (`C:\Users\matti\AppData\Local\Programs\Python\Python312`) — note: 3.14 is the default `python` on PATH; ALWAYS use `py -3.12` or the full exe path
- **Dependencies** (installed 2026-07-31): `PyMuPDF` 1.28, `Pillow` 12.3, `spaCy` 3.8.14 + `sv_core_news_sm`
  - Gotcha: `py -3.12 -m spacy download` fails without `click` (`ModuleNotFoundError: No module named 'click'`) — install `click` first, or `pip install` the model wheel from the spacy-models GitHub release
- **Tesseract OCR:** 5.4 (not 5.5) at `C:\Program Files\Tesseract-OCR\tesseract.exe`
  - `swe.traineddata` lives in a USER-WRITABLE tessdata dir: `C:\Users\matti\AppData\Local\Tesseract-OCR\tessdata\`
  - **Every run script must set `os.environ['TESSDATA_PREFIX'] = r'C:\Users\matti\AppData\Local\Tesseract-OCR\tessdata'` before importing the pipeline** (Program Files is write-protected; the installed `tessdata\` only has `eng`+`osd`)
  - Settings: 200 dpi, `--psm 3` (dialogue/phrase books), `--psm 6` (dictionary columns)
  - Command: `tesseract <img> stdout -l swe+eng --psm 3` (timeout 120 s)
- **Console gotcha:** always run with `PYTHONIOENCODING=utf-8` set, or Swedish characters print as `�`. Some PowerShell inline `python -c` quoting breaks with nested f-strings — prefer writing `.py` script files.
- **Detached-run gotcha:** `Start-Process` with `-RedirectStandardOutput` — the tool/console shows `ChildProcess.kill` noise but the spawned process survives. Python stdout is block-buffered when redirected to a file, so `print()` progress appears only at process end; pipeline progress goes to stderr (`file=sys.stderr`) and appears immediately — monitor `*_err.txt`, not `*_log.txt`.
- **Corrupt download note:** one file (`På svenska 1 Lärobok` PDF) was a 0-byte corrupt download and was deleted; re-download if needed.

---

## 3. Architecture

All code lives in **`imports/extract/pipeline.py`** (~2,300 lines). Entry dataclasses in **`imports/extract/schemas.py`** (`Entry`, `SourceInfo`, `to_dict`/`from_dict`).

### Strategies (all subclass `BaseStrategy`)

| Strategy | Book types | Notes |
|---|---|---|
| `WordListStrategy` | Textbooks | Header-triggered word lists, word-bank lines (4+ tokens/line, 65%+ valid), phrase boxes |
| `DictionaryStrategy` | Dictionaries | Two-column layout via text-layer block positions, `_fix_headword()` diacritic restoration; `handles_own_ocr=True`, quality gate `_has_good_text_layer()` (<0.1% Swedish chars → OCR fallback) |
| `RichDictionaryStrategy` | Svensk ordbok | Text-layer only; headword + POS + definitions + examples + etymology |
| `IdiomStrategy` | Idiom books | Full-page OCR (`--psm 3`); parses idiom → definition → `»`/`+` example |
| `VocabExerciseStrategy` | Workbooks | Synonym/antonym pairs, word lists (`en/ett` nouns), fill-in-blank (confidence 0.4 → review) |
| `PhraseStrategy` | Dialogue books (Så säger man) | NEW; em-dash dialogue turns, wrapped-line merging, hyphen-split rejoining, parenthetical usage notes → `notes` field |
| `NovelStrategy` | Novels/literature | spaCy POS tagging, first occurrence per page with sentence context; confidence 0.4 → ALL go to review |
| `GrammarRuleStrategy` | (exists, not active by default) | |

### Pipeline flow

1. `run(pdf_path, strategy=..., checkpoint_path=..., checkpoint_every=25, resume=bool, start_page=0)`
2. `ExtractionPipeline` opens doc → `classify_and_extract(max_pages, start_page)` iterates pages:
   - `PageClassifier.classify(page)` → text layer or OCR needed
   - Full-page OCR when a non-`handles_own_ocr` strategy is present
   - Strategies that `handles_own_ocr` are called even with empty text layer (scanned PDFs)
3. `FusionEngine.fuse(all_entries)` — dedupes by phrase, merges best fields (longest sentence/meaning), `confidence ≥ 0.5` → accepted, else review.
4. Checkpoint JSON saves every N pages; resume loads entries + `next_page`.

### Checkpoint / resume (fixed this session)

- **Bug fixed:** previously, resume skipped saving pages ≤ start_page but strategies still *processed* them → duplicate entries. Fix: `classify_and_extract(max_pages, start_page=start_page)` now skips strategy processing entirely for pages ≤ start_page (pipeline.py).
- Checkpoint file fields: `next_page`, `total_pages`, `auto_accepted`, `needs_review`, `entries` (full list).
- After a run: `data_<book>.json` = `{"accepted": [...], "review": [...], "stats": {...}}`.
- Older books (pre-checkpoint) saved as raw lists of entry dicts.

---

## 4. Completed Extractions (full table)

| Source | Entries | Strategy | Notes |
|---|---|---|---|
| Rivstart A1+A2 Textbok | 725 | word_list | |
| Rivstart A1+A2 Övningsbok | 337 | word_list | |
| Rivstart B1+B2 Övningsbok | 665 | word_list | |
| På svenska 2 Lärobok | 518 | word_list | |
| På svenska Övningsbok | 375 | word_list | |
| Form i fokus A | 675 | word_list | |
| Form i fokus B1 | 465 | word_list | |
| Form i fokus B2 | 378 | word_list | |
| Form i fokus C | 984 | word_list | |
| Form i fokus C Övningar | 1,118 | word_list | |
| Svenska impulser 3 | 1,697 | word_list | |
| Norstedts första svenska ordbok | 2,981 | dictionary | text layer |
| Svensk funktionell grammatik (Bolander) | 1,780 | word_list | raw list |
| Svenska skrivregler | 1,845 | word_list | raw list |
| Svenska skrivregler för punktskrift | 226 | word_list | raw list |
| Svensk ordbok | 8,227 | rich_dictionary | 93% etymology, 64% examples |
| SAOL | 18,919 | dictionary | column OCR @200dpi `--psm 6`, checkpointed (survived interruption at p1550/1656) |
| **Svenska idiom 3500** | **3,673** | idiom | new this session; 100% with meaning, 83% with example |
| **Så säger man** (phrases/dialogues) | **454** | phrase | new strategy; all auto-accepted |
| **Bygg upp ditt ordförråd 1** | **210** (98 review) | vocab_exercise | word lists + synonym/antonym words |
| **Nybörjarsvenska Övningsbok** | **31** (20 review) | vocab_exercise | low yield — pronunciation drill format |
| **Bygg upp ert ordförråd (A. Hebbe)** | **0** | — | etymology prose + self-tests, poor fit — skipped |
| **På svenska 1 Lärobok** | — | — | corrupt 0-byte download, deleted |
| **Skrivboken (Lasse Ekholm)** | **200** | word_list | PDF preferred over EPUB — EPUB text layer had corrupt chars (`LǾt`, `g��rna`) |
| **Uppsatshandboken (Siv Strömquist)** | **772** | word_list | clean text layer |
| **TOTAL** | **47,255** | | |

Novels (NovelStrategy — all entries go to review, none auto-accepted by design):
- **ALL 8 NOVELS COMPLETE (2026-07-31, this computer):** Ett jävla solsken (14,395, resumed from p101 checkpoint), Expeditionen (7,591), Omgiven av idioter (10,824), Ondskan (13,494), Sapiens (15,095), Tio tankar om arbete (7,217), Ålevangeliet (7,745), Härskarteknik (5,532). **Total: 81,893 review entries** across `data_*.json` files.
- Note: the batch ran against the `.epub` files (old glob picked epub first); text quality verified clean (typographic quotes only). Härskarteknik was run separately from the `.pdf` because the batch pattern was `Hörskarteknik*` (ö) and the file is `Härskarteknik` (ä) — pattern now fixed in run_novels.py.

---

## 5. In-Progress Work

1. ~~**Novel batch run**~~ — **DONE 2026-07-31.** All 8 novels extracted (81,893 review entries; Ett jävla solsken resumed from its p101 checkpoint automatically). Runner `run_novels.py` is fixed (PDF preference, `Härskarteknik*` pattern, TESSDATA_PREFIX, `C:\Users\matti` paths) and reusable.
2. **Review queue triage (next big task)** — 81,893 novel review entries + ~120 existing review entries sit in `data_*.json` `review` arrays. Plan §6.4 items: drop function-word noise (`dom`, `just`, `visste`…), dedupe across books, then merge into `data.js`.
3. **PhraseStrategy quality** (Så säger man): ~42 entries/14 pages on test; good dialogue turns, occasional OCR junk (`KES`, `tagen.)`) — acceptable.

## 6. Next Steps

1. **Merge new data into the app** (`data.js`): decide what to do with ~82k novel review entries (sample/curate vs bulk-accept with low confidence), then merge Skrivboken (200) + Uppsatshandboken (772).
2. **Phase 2 deep extraction** (optional, per book):
   - `Form i fokus Facit Del C` (answer key PDF, in Sources) — cross-reference answers to Form i fokus C Övningar fill-in-blanks
   - Answer keys in Bygg upp ditt ordförråd 1 (last pages, dense multi-column) — would enable synonym/antonym *pairing* instead of individual words
   - Crossword pages (Bygg upp 1 p4, etc.) — skip unless solver written
   - Dialogue pairing for Så säger man (comment → turn mapping is approximate)
3. **Post-processing ideas:**
   - Diacritic restoration pass over OCR-derived data (å→a, ä→a, ö→o, 6→ö losses remain; `ocr_correct` covers only common cases)
   - Word-bank spillover / definition-in-phrase cleanup for idiom entries
   - Drop function-word noise from NovelStrategy review queue

---

## 7. Known Issues & Gotchas

- **OCR diacritics:** Tesseract `swe+eng` drops å/ä/ö in many scanned books (`ar` → `är`, `vag` → `väg`). `ocr_correct()` in pipeline.py fixes common cases only.
- **PSM choice matters:** `--psm 3` for prose/dialogue books; `--psm 6` for dictionary columns. `--psm 6` on dialogue books MERGES columns badly (verified on Så säger man).
- **Wrapped dialogue lines:** OCR splits justified text; PhraseStrategy merges continuations (non-dash lines after a turn) and rejoins hyphen splits (`Stock- holm` → `Stockholm`).
- **Comment blocks:** parenthetical usage notes appear at page bottom in OCR flow; they attach to the last turn of the page (approximate).
- **Resume bug (fixed):** skipped pages were reprocessed by strategies → duplicates. Now `classify_and_extract(..., start_page=...)` skips processing entirely.
- **Checkpoint sizes:** SAOL checkpoint 8.8 MB, idiom 3.7 MB — slow to load/save but safe. Novel checkpoints ~6 MB at 100 pages.
- **Console encoding:** use `PYTHONIOENCODING=utf-8`; never inline complex Python in PowerShell strings (quoting breaks) — write `.py` files instead.
- **FusionEngine:** `AUTO_ACCEPT_THRESHOLD = 0.7` is defined but UNUSED; effective accept threshold is `min_auto_accept = 0.5` in `FusionEngine.__init__`.
- **EPUB text layers can be corrupt** (Skrivboken epub: `LǾt` for `Låt`, `g��rna` for `gärna`) — always prefer `.pdf` when both exist; verify text layer before mass extraction.
- **Glob pattern typos silently skip books:** `Hörskarteknik*` (ö) never matched `Härskarteknik` (ä) and the book was skipped without error (stdout buffering hid the `!! No match` line until process exit) — check stdout after batch runs.

---

## 8. Key Files

| Path | Purpose |
|---|---|
| `imports/extract/pipeline.py` | All strategies, pipeline, fusion, runner (~2,300 lines) |
| `imports/extract/schemas.py` | `Entry`, `SourceInfo` dataclasses + to/from dict |
| `Sources/` | All source PDFs/EPUBs (20 usable, 1 corrupt deleted) |
| `data_<book>.json` | Extracted entries (`accepted` + `review` for new; raw lists for old) |
| `run_novels.py` | Novel batch runner (resumable; PDF-preferred; all 8 books now complete) |
| `run_harskarteknik.py` | Standalone Härskarteknik runner (pattern mismatch in batch) |
| `run_skrivboken.py` / `run_uppsats.py` | Writing-book runners (word_list, resumable) |
| `novels_log.txt` / `novels_err.txt` | Output of the last detached novel run |
| `*_checkpoint.json` | Checkpoint state per book (saol, idiom, bygg, sasager, ett_javla_solsken) |
| `PROGRESS_PLAN.md` | THIS document |

**Data counts by format:** SAOL 18,919 (largest) · Svensk ordbok 8,227 · idiom 3,673 · Norstedts 2,981 · Bolander 1,780 · skrivregler 1,845 · Svenska impulser 1,697 · Form i fokus series 3,620 combined · Rivstart series 1,727 combined · På svenska series 893 combined.

## Question gen checkpoint - TIO_TANKAR (one agent at a time)
- Agent A: prefixes 001-008, started 2026-08-05
- Agent B: prefixes 009-015, started 2026-08-05 09:09
- Agent C: prefixes 016-022, started 2026-08-05 09:14

- TIO_TANKAR COMPLETE 22/22 + validated 09:17

---

## 9. Reading-Comprehension Feature (Phase E) — DONE 2026-08-05

- **Questions generated for ALL 307 chapters** (8 books, 10 questions each = 3,070; 6 mcq + 4 tf per chapter; Swedish + English, answers verifiable from text). Written one agent at a time (per user request, internet instability) into `questions/<book>/`, each validated (valid JSON, 10 q, answer 0–3 / bool).
  - alevangeliet 36 · expeditionen 20 · harskarteknik 32 · idioter 46 · ondskan 61 · sapiens 33 · solsken 57 · tio_tankar 22
- **Merged into `novels_reading.json`** (merge2.py logic: chapter files `NNN_*.txt` ↔ `chapters[NNN-1]` by 3-digit prefix; validated slug↔title match). Each chapter now has `questions`. File ~5.6 MB, cached in sw.js (`svenska-v5`).
- **"Läs" tab added to index.html (13th tab):** book list → chapter list → reader (per-paragraph TTS via Piper, vocab chips with English translations + POS) → 10-question quiz (SV/EN toggle, feedback, review, retry, best score per chapter in localStorage `app_read_<bookid>`).
- **Piper TTS:** installed `piper-tts 1.6.0` into Python 3.12 (was missing); models at `../tts-models/` (`sv_SE-nst-medium`, `sv_SE-alma-medium`, `en_US-lessac-medium`).
- Working dirs `questions/` + `novels_text/` kept until final verification is done (2026-08-05, server verified on :5001).

- 2026-08-05 VERIFIED: server on :5001 serves all files; headless Edge renders app without JS errors (289 browse cards); /tts returns WAV (piper 1.6.0 installed in py3.12). Working dirs questions/ + novels_text/ deleted (derivable from novels_reading.json). To use the app: python server.py, then open http://localhost:5001, tab 'Läs'.
