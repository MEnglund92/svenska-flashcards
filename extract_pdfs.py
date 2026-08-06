#!/usr/bin/env python3
"""extract_pdfs.py — Extract text from the text-layer PDFs in Sources/ into books_extracted.json.

Uses PDF bookmarks as chapter boundaries when present; otherwise groups pages.
Appends to books_extracted.json (same shape as extract_epubs.py output, source: "pdf").
Local-only file (gitignored) — extracted texts are copyrighted material.
"""
import datetime
import glob
import json
import os
import re
import unicodedata

import fitz

ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCES = os.path.join(ROOT, 'Sources')
OUT = os.path.join(ROOT, 'books_extracted.json')

PDFS = [
    'Pa svenska 2',
    'Rivstart  svenska som frammande sprak. B1 + B2, Ovningsbok',
    'Svenska skrivregler for punktskrift',
]

SKIP_LINE = re.compile(r'^\s*(\d+\s*|\.+\s*)?$')
PAGE_NUM = re.compile(r'^\s*(?:s\.?\s*)?\d+\s*$')


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = re.sub(r'[\u0300-\u036f]', '', s)
    s = s.lower().strip()
    s = re.sub(r'\s+', ' ', s)
    return s


def slug(s):
    s = re.sub(r'[^a-z0-9]+', '-', norm(s)).strip('-')
    return s or 'book'


def reconstruct(blocks_text):
    """Turn page text (lines) into paragraphs."""
    lines = [l.strip() for l in blocks_text.split('\n')]
    paras, cur = [], []
    for ln in lines:
        if not ln or PAGE_NUM.match(ln):
            if cur:
                paras.append(' '.join(cur))
                cur = []
            continue
        cur.append(ln)
        if ln.endswith(('.', '!', '?', '\u2026', '"', '\u201d', ':', ';')):
            paras.append(' '.join(cur))
            cur = []
    if cur:
        paras.append(' '.join(cur))
    return '\n\n'.join(p for p in paras if p)


def extract_pdf(path):
    doc = fitz.open(path)
    toc = doc.get_toc()
    ranges = []
    if len(toc) >= 3:
        entries = [e for e in toc if e[0] <= 2]
        for i, (lvl, title, page) in enumerate(entries):
            end = entries[i + 1][2] - 1 if i + 1 < len(entries) else doc.page_count
            ranges.append((title, page - 1, end))
    else:
        step = 12
        for start in range(0, doc.page_count, step):
            end = min(start + step, doc.page_count)
            ranges.append(('Del %d' % (len(ranges) + 1), start, end))

    chapters = []
    for title, start, end in ranges:
        text = '\n'.join(doc[i].get_text() for i in range(start, end))
        text = reconstruct(text)
        if not text.strip():
            continue
        chapters.append({'n': len(chapters) + 1, 'title': title.strip(), 'text': text})

    doc.close()
    return {
        'id': slug(os.path.splitext(os.path.basename(path))[0]),
        'title': os.path.splitext(os.path.basename(path))[0].split('(')[0].strip(),
        'author': '',
        'source': 'pdf',
        'chapters': chapters,
    }


def main():
    if os.path.exists(OUT):
        data = json.load(open(OUT, encoding='utf-8'))
    else:
        data = {'generated': '', 'books': []}
    known = {b['id'] for b in data['books']}
    done = 0
    for needle in PDFS:
        matches = [p for p in glob.glob(os.path.join(SOURCES, '*.pdf'))
                   if norm(needle) in norm(os.path.basename(p).split('(')[0])]
        if not matches:
            print('no match for:', needle)
            continue
        p = matches[0]
        try:
            b = extract_pdf(p)
        except Exception as e:
            print('SKIP %s (%s)' % (os.path.basename(p), e))
            continue
        if b['id'] in known:
            print('already present:', b['id'])
            continue
        chs = b['chapters']
        print('%-45s %4d ch %9d chars' % (b['title'][:45], len(chs), sum(len(c['text']) for c in chs)))
        data['books'].append(b)
        known.add(b['id'])
        done += 1
    data['generated'] = datetime.date.today().isoformat()
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('added:', done, '| total books:', len(data['books']))


if __name__ == '__main__':
    main()
