#!/usr/bin/env python3
"""bolander_ocr.py — OCR the scanned 'Svensk funktionell grammatik' (Bolander) PDF
into books_extracted.json (same shape as extract_pdfs.py output).

The PDF has no text layer and a junk TOC (FileNNNN bookmarks), so:
  * every page is rendered at 200 dpi and OCR'd (tesseract swe+eng --psm 3)
  * pages are grouped into 12-page 'Del N' chapters (pipeline fallback scheme)
  * per-page checkpoint (bolander_checkpoint.json) allows resume
Local-only file (gitignored) — extracted texts are copyrighted material.
"""
import datetime
import json
import os
import subprocess
import sys

from _common import ROOT, SOURCES_DIR, setup_paths, tesseract_exe, tessdata_dir
setup_paths()
os.environ['TESSDATA_PREFIX'] = tessdata_dir()

import fitz

PDF = os.path.join(SOURCES_DIR, 'Extractable', 'B1-B2 (Intermediate)',
                   'Educational-Books', 'Grammar',
                   'Svensk funktionell grammatik (Maria Bolander) (z-library.sk, 1lib.sk, z-lib.sk) (1).pdf')
TESS = tesseract_exe()
OUT = os.path.join(ROOT, 'books_extracted.json')
CKPT = os.path.join(ROOT, 'bolander_checkpoint.json')
BOOK_ID = 'bolander-grammatik'
MIN_CHARS = 30
STEP = 12

from extract_pdfs import reconstruct  # noqa: E402


def ocr_page(doc, pno, tmp):
    pix = doc[pno].get_pixmap(dpi=200)
    pix.save(tmp)
    r = subprocess.run([TESS, tmp, 'stdout', '-l', 'swe+eng', '--psm', '3'],
                       capture_output=True, timeout=180)
    return r.stdout.decode('utf-8', errors='replace')


def load_ckpt():
    if os.path.exists(CKPT):
        return json.load(open(CKPT, encoding='utf-8'))
    return {'pages': {}}


def main():
    ckpt = load_ckpt()
    pages = ckpt['pages']
    doc = fitz.open(PDF)
    total = doc.page_count
    tmp = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_bol_page.png')
    for pno in range(total):
        if str(pno) in pages:
            continue
        try:
            raw = ocr_page(doc, pno, tmp)
        except Exception as e:
            print('ERR p%d: %s' % (pno, e), file=sys.stderr)
            continue
        pages[str(pno)] = raw
        if (pno + 1) % 10 == 0 or pno + 1 == total:
            json.dump(ckpt, open(CKPT, 'w', encoding='utf-8'))
            print('  ocr %d/%d' % (pno + 1, total), file=sys.stderr)
    doc.close()

    chapters = []
    n_start = 0
    while n_start < total:
        n_end = min(n_start + STEP, total)
        parts = []
        for p in range(n_start, n_end):
            t = reconstruct(pages.get(str(p), ''))
            if t and len(t) >= MIN_CHARS:
                parts.append(t)
        text = '\n\n'.join(parts).strip()
        if text:
            chapters.append({'n': len(chapters) + 1,
                             'title': 'Del %d' % (len(chapters) + 1),
                             'text': text})
        n_start = n_end

    book = {'id': BOOK_ID, 'title': 'Svensk funktionell grammatik',
            'author': 'Maria Bolander',
            'source': 'ocr:' + os.path.basename(PDF),
            'chapters': chapters}

    data = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) \
        else {'generated': '', 'books': []}
    data['books'] = [b for b in data['books'] if b['id'] != BOOK_ID]
    data['books'].append(book)
    data['generated'] = datetime.date.today().isoformat()
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    chars = sum(len(c['text']) for c in chapters)
    print('bolander-grammatik: %d chapters, %d chars -> books_extracted.json'
          % (len(chapters), chars))


if __name__ == '__main__':
    main()
