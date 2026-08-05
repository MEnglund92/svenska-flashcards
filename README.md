# Svenska — Swedish Language Flashcards

A complete single-page vanilla HTML/CSS/JS flashcard application for learning Swedish vocabulary, grammar, and sentence structure. No frameworks, no build step — open source, runs entirely in the browser, PWA-ready with offline support via service worker.

## What It Is

This is a self-contained study tool built around a corpus of **289 Swedish entries** drawn from 6 course textbooks. It combines traditional flashcards with 10 advanced language-learning features:

| # | Feature | What it does |
|---|---------|-------------|
| 1 | **🔊 TTS** | Text-to-Speech via Piper TTS (local neural voice models) — speaker button on every card, quiz option, cloze prompt, and unscramble sentence |
| 2 | **🔥 Streaks** | Tracks daily study activity; flame emojis scale with streak length; shown on dashboard hero |
| 3 | **✍️ Cloze** | 9th tab — shows English meaning, you type the Swedish word; auto-advance on correct, tracks results per word |
| 4 | **🔄 SRS** | Spaced Repetition System (simplified SM-2) with Hard/Good/Easy ratings; toggle to filter flashcards to only due cards |
| 5 | **🎯 Weak Words** | Identifies words with ≥3 attempts and ≥40% error rate; "Weak" filter in Browse; dedicated dashboard card |
| 6 | **🎙️ STT** | Speech-to-Text via `webkitSpeechRecognition` (Chromium only); mic button on flashcard back and Cloze |
| 7 | **🔗 Related Words** | Clickable pill tags on flashcard back face link to related vocabulary |
| 8 | **🧩 Unscramble** | 10th tab — click-to-place jumbled sentence words into correct order (V2 rule, inversion, negation, etc.) |
| 9 | **📖 Läs (Reading)** | 13th tab — read full novel chapters (8 books, 307 chapters) with per-paragraph TTS and clickable vocab with translations, then take a 10-question comprehension quiz (6 multiple-choice + 4 true/false, Swedish/English toggle, score saved per chapter) |

### 12 Tabs

1. **Browse** — Search, filter by category, filter weak words
2. **Flashcards** — Flip, shuffle, SRS mode, TTS, STT on back
3. **Quiz** — Multiple choice (4 options), instant feedback, timed
4. **Match** — Drag words to their meanings
5. **Concepts** — 20 grammar topics across 6 courses
6. **Resources** — 40+ textbooks & references grouped by type
7. **Exam** — Timed test with configurable length and shuffle
8. **Cloze** — Type-answer from meaning
9. **Unscramble** — Sentence word ordering game
10. **Conjugate** — Verb conjugation drills (present, preterite, supine)
11. **Write** — Creative writing prompts with example answers
12. **Läs** — Read 8 Swedish novels (307 chapters, 2.9M chars) with TTS, vocab, and comprehension quizzes

## Content

| Course | Entries | Difficulty (E/M/H) | With Related Words | With Sentence Examples |
|--------|---------|-------------------|-------------------|----------------------|
| Rivstart A1+A2 — Beginner Swedish | 52 | 28/22/2 | 49 | 21 |
| På Svenska 1 — Swedish A1–A2 | 66 | 23/43/0 | 65 | 24 |
| Form i fokus — Swedish Grammar | 61 | 10/35/16 | 61 | 9 |
| Svenska idiom — Idioms & Expressions | 44 | 1/43/0 | 31 | 0 |
| Nybörjarsvenska — Beginner's Swedish | 36 | 26/10/0 | 36 | 7 |
| Swedish Literature & Culture | 30 | 3/19/8 | 33 | 0 |
| **Total** | **289** | **91/172/26** | **~275** | **~61** |

Plus 20 grammar concepts across 6 courses, 41 verb conjugations, 20 writing prompts with model answers, and 40+ resources grouped by type.

## How to Start

The app requires a **Python 3 server** to run — it serves static files and provides Piper TTS (local neural text-to-speech). Voice models are loaded from `../tts-models/` on startup.

```bash
# Navigate to the app directory
cd "C:\Users\Matt\Desktop\Education\Svenska"

# Start server (models preload at startup, ~4s)
python server.py
```

Then open **http://localhost:5001** in your browser.

> Note: `file://` URLs won't work — TTS, STT, and Service Worker all require HTTP.

## How It Works

**TTS (Piper):** When you click a speaker button, the frontend calls `GET /tts?text=...&lang=...` on the same server. The server uses Piper TTS with local ONNX voice models (`sv_SE-nst-medium` for Swedish, `en_US-lessac-medium` for English) to generate WAV audio in ~70–190ms. Swedish is auto-detected when text contains å/ä/ö.

**STT (Chrome only):** Uses the browser's `webkitSpeechRecognition` API — no server needed.

## Project Files

| File | Purpose |
|------|---------|
| `server.py` | Python HTTP server — serves static files + Piper TTS `/tts` endpoint |
| `imports/tts.py` | TTS module — loads voices, synthesizes WAV audio |
| `index.html` | Entire app — HTML structure, CSS (~40K), and all JavaScript (~70K) |
| `data.js` | All course content — 289 entries, 20 concepts, 40+ resources |
| `novels_reading.json` | Reading library — 8 novels, 307 chapters (text + vocab + 10 questions each, ~5.6 MB) |
| `manifest.json` | PWA manifest for installable web app |
| `sw.js` | Service worker for offline caching |
| `../tts-models/` | Shared Piper voice models (`sv_SE-nst-medium`, `en_US-lessac-medium`) |
