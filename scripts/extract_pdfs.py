#!/usr/bin/env python3
"""extract_pdfs.py — Extract text from the text-layer PDFs in Sources/Extractable into books_extracted.json.

Uses PDF bookmarks as chapter boundaries when present; otherwise groups pages (12-page "Del N" chunks).
Appends to books_extracted.json (same shape as extract_epubs.py output, source: "pdf").
Local-only file (gitignored) — extracted texts are copyrighted material.
"""
import datetime
import json
import os
import re
import unicodedata

import fitz

from _common import ROOT, SOURCES_DIR, setup_paths
setup_paths()

SOURCES = os.path.join(SOURCES_DIR, 'Extractable')
OUT = os.path.join(ROOT, 'books_extracted.json')

PDFS = [
    {'needle': 'Pa svenska 2',
     'title': 'På svenska 2 – Lärobok (B1)', 'author': 'Ulla Göransson, Annika Helander, Mai Parada',
     'id': 'pa-svenska-2-larobok'},
    {'needle': 'Rivstart  svenska som frammande sprak. B1 + B2, Ovningsbok',
     'title': 'Rivstart B1 + B2 – Övningsbok', 'author': 'Paula Levy Scherrer, Karl Lindemalm',
     'id': 'rivstart-b1-b2-ovningar'},
    {'needle': 'Svenska skrivregler for punktskrift',
     'title': 'Svenska skrivregler för punktskrift', 'author': 'Punktskriftsnämnden, Språkrådet',
     'id': 'skrivregler-punktskrift'},
    # ---- A1-A2 batch ----
    {'needle': 'Pa svenska Svenska som frammande sprak Ovningsbok',
     'title': 'På svenska 1 – Övningsbok (A1-A2)', 'author': 'Ulla Göransson, Annika Helander, Mai Parada',
     'id': 'pa-svenska-1-ovningar'},
    {'needle': 'Rivstart A1 + A2 svenska som frammande sprak textbok',
     'title': 'Rivstart A1 + A2 – Textbok', 'author': 'Paula Levy Scherrer, Karl Lindemalm',
     'id': 'rivstart-a1-a2-textbok'},
    {'needle': 'Rivstart svenska som frammande sprak. [1, 2], A1 + A2 Ovningsbok',
     'title': 'Rivstart A1 + A2 – Övningsbok', 'author': 'Paula Levy Scherrer, Karl Lindemalm',
     'id': 'rivstart-a1-a2-ovningar'},
    {'needle': 'Bygg upp ert',
     'title': 'Bygg upp ert ordförråd med roliga övningar och enkla prov', 'author': 'Agneta Hebbe',
     'id': 'bygg-upp-ert-ordforrad'},
    # ---- C1-C2 batch ----
    {'needle': 'Svenska impulser 3',
     'title': 'Svenska impulser 3', 'author': 'Carl-Johan Markstedt, Sven Eriksson',
     'id': 'svenska-impulser-3'},
    {'needle': 'Svenska skrivregler', 'exact': True, 'toc_levels': 1,
     'title': 'Svenska skrivregler', 'author': 'Ola Karlsson',
     'id': 'svenska-skrivregler'},
    {'needle': 'Uppsatshandboken',
     'title': 'Uppsatshandboken', 'author': 'Siv Strömquist',
     'id': 'uppsatshandboken'},
]

SKIP_LINE = re.compile(r'^\s*(\d+\s*|\.+\s*)?$')
PAGE_NUM = re.compile(r'^\s*(?:s\.?\s*)?\d+\s*$')
JUNK_BOOKMARK = re.compile(r'^\d+\.pdf\s*\(p\.\d+\)$', re.I)
WORD3 = re.compile(r'[a-zåäö]{3,}')


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = re.sub(r'[\u0300-\u036f]', '', s)
    s = s.lower().strip()
    s = re.sub(r'\s+', ' ', s)
    return s


def slug(s):
    s = re.sub(r'[^a-z0-9]+', '-', norm(s)).strip('-')
    return s or 'book'


def is_junk_line(ln):
    """Drop OCR noise lines (e.g. 'mm Om 00 Om 5 0 0 1 1', '0', page furniture)."""
    if not ln:
        return True
    if PAGE_NUM.match(ln) or SKIP_LINE.match(ln):
        return True
    if len(ln) <= 2:
        return True
    return not WORD3.search(ln.lower())


def reconstruct(blocks_text):
    """Turn page text (lines) into paragraphs, filtering OCR junk lines."""
    lines = [l.strip() for l in blocks_text.split('\n')]
    paras, cur = [], []
    for ln in lines:
        if is_junk_line(ln):
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


def toc_is_junk(good):
    """Detect z-library style TOCs whose level-1 titles are only numbers or pdf filenames."""
    if len(good) < 3:
        return True
    l1 = [e for e in good if e[0] == 1]
    if not l1:
        return False
    junk = sum(1 for e in l1
               if re.match(r'^\d+$', e[1].strip())
               or e[1].lower().endswith('.pdf')
               or e[1].lower().startswith('pages from '))
    return junk / len(l1) >= 0.5


def extract_pdf(path, toc_levels=2):
    doc = fitz.open(path)
    toc = doc.get_toc()
    ranges = []
    good = [e for e in toc if e[0] <= toc_levels and not JUNK_BOOKMARK.match(e[1])]
    if len(good) >= 3 and not toc_is_junk(good):
        for i, (lvl, title, page) in enumerate(good):
            end = good[i + 1][2] - 1 if i + 1 < len(good) else doc.page_count
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


def all_pdfs():
    for dp, _d, fs in os.walk(SOURCES):
        for fn in fs:
            if fn.lower().endswith('.pdf'):
                yield os.path.join(dp, fn)


def main():
    if os.path.exists(OUT):
        data = json.load(open(OUT, encoding='utf-8'))
    else:
        data = {'generated': '', 'books': []}
    known = {b['id'] for b in data['books']}
    by_name = {norm(os.path.basename(p).split('(')[0]): p for p in all_pdfs()}
    done = 0
    for spec in PDFS:
        if spec.get('exact'):
            matches = [p for n, p in by_name.items() if n == norm(spec['needle'])]
        else:
            matches = [p for n, p in by_name.items() if norm(spec['needle']) in n]
        if not matches:
            print('no match for:', spec['needle'])
            continue
        p = matches[0]
        try:
            b = extract_pdf(p, toc_levels=spec.get('toc_levels', 2))
        except Exception as e:
            print('SKIP %s (%s)' % (os.path.basename(p), e))
            continue
        b['id'] = spec['id']
        b['title'] = spec['title']
        b['author'] = spec['author']
        if b['id'] in known:
            print('already present:', b['id'])
            continue
        chs = b['chapters']
        print('%-42s %4d ch %9d chars' % (b['title'][:42], len(chs), sum(len(c['text']) for c in chs)))
        data['books'].append(b)
        known.add(b['id'])
        done += 1
    data['generated'] = datetime.date.today().isoformat()
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('added:', done, '| total books:', len(data['books']))


if __name__ == '__main__':
    main()
