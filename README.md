# Learn Swedish

> This project was made specially for a relative learning Swedish.

A complete offline-first Swedish study application: vocabulary flashcards, grammar, reading with TTS, and pronunciation practice with local speech recognition. No frameworks, no build step for the web app itself — a single-page PWA plus a small Python server for local TTS/STT, packaged as a Windows desktop app (WebView2) or a plain web server.

## Features

| # | Feature | What it does |
|---|---------|-------------|
| 1 | **TTS** | Local neural text-to-speech (Piper) — speaker button on every card, quiz option, cloze prompt, and unscramble sentence |
| 2 | **STT** | Local speech-to-text (Whisper) for pronunciation practice — mic recorded in the browser, with a server-side capture fallback |
| 3 | **SRS** | Spaced Repetition System (simplified SM-2) with Hard/Good/Easy ratings and a due-cards filter |
| 4 | **Cloze** | Type the Swedish word from its English meaning; auto-advance on correct, per-word tracking |
| 5 | **Unscramble** | Click-to-place jumbled sentences (V2 rule, inversion, negation) |
| 6 | **Läs** | 8 novels, 307 chapters with per-paragraph TTS, clickable vocabulary, and comprehension quizzes |
| 7 | **Streaks / Weak Words / Exam / Conjugate / Write** | Daily activity tracking, weak-word identification, timed tests, verb drills, writing prompts |

See the app's 12 tabs for the full feature list.

## Repository layout

```
app/                  Web frontend (PWA): index.html, data.js, sw.js, fonts, icons
server/               Python backend: server.py + imports/ (tts, stt, capture, extract)
desktop/              Desktop launcher (WebView2 via pywebview)
scripts/              Build tooling + content extraction pipelines
tools/                One-off utilities (font downloader)
docs/                 Design notes and planning docs
assets/               Logo artwork
Sources/              Course material (local only, gitignored)
```

## Requirements

- **Windows 10/11** with the WebView2 runtime (included on modern Windows)
- **Python 3.12+** (3.11 works) for the server and the installer build

## Run from source (development)

```bash
# from the repository root
cd app
python ../server/server.py
```

Then open **http://localhost:5001**. The server serves the frontend from `app/`,
with TTS/STT models resolved from `models/` or the `TTS_MODELS_DIR` /
`WHISPER_MODEL_DIR` environment variables.

`file://` URLs will not work — TTS, STT, and the service worker all require HTTP.

## Desktop app

The desktop shell (`desktop/launcher.pyw`) starts the local server and opens the
app in a WebView2 window. Closing the window quits the app. It runs in-process,
so there are no orphan server processes.

## Build the Windows installer

```bash
python scripts/build_installer.py
```

Produces a self-contained installer at `dist/Learn-Swedish-Setup-<version>.exe`
(per-user install, ~1.1 GB — it embeds Python, TTS/STT models, and all content).
Staging downloads/assembles components on first run; subsequent runs reuse
`build/stage/`.

## Content pipeline

The flashcard corpus is built from extracted textbooks and novels:

1. `scripts/extract_pdfs.py` / `extract_epubs.py` — pull text from source PDFs/EPUBs
2. `scripts/run_*.py` — per-book extraction runs (OCR pipeline for scanned books)
3. `scripts/build_deck.py` — assemble `app/data_deck.js` from the `data_*.json` corpus
4. `scripts/build_novels_reading.py` — assemble the reading library `app/novels_reading.json`

These scripts are developer tools; extracted texts are copyrighted material and
are kept out of the repository (see `.gitignore`).

## License

MIT — see `LICENSE`.
