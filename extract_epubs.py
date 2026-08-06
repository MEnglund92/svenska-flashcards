#!/usr/bin/env python3
"""extract_epubs.py — Extract full text from the EPUB books in Sources/ into books_extracted.json.

Output shape:
{
  "generated": "<iso date>",
  "books": [
    {"id": "...", "title": "...", "author": "...", "source": "epub",
     "chapters": [{"n": 1, "title": "...", "text": "..."}]}
  ]
}
Local-only file (gitignored) — extracted texts are copyrighted material.
"""
import datetime
import glob
import json
import os
import re
import unicodedata

from bs4 import BeautifulSoup
import ebooklib
from ebooklib import epub

ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCES = os.path.join(ROOT, 'Sources')
OUT = os.path.join(ROOT, 'books_extracted.json')

HEADING_TAGS = ['h1', 'h2', 'h3', 'h4']
SKIP_TITLES_NORM = {
    'titel', 'title page', 'title', 'cover', 'omslag', 'innehall', 'innehallsforteckning',
    'contents', 'table of contents', 'innehall oversikt', 'om boken', 'about the author',
    'dedication', 'tillagnan', 'kolofon', 'copyright', 'utgivare', 'utgava',
    'tack', 'thanks', 'noter', 'notes', 'referenser', 'references', 'ex libris',
}
CLEAN_TITLE = re.compile(r'\s+')


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = re.sub(r'[\u0300-\u036f]', '', s)
    s = s.lower().strip()
    s = re.sub(r'\s+', ' ', s)
    return s


def slug(s):
    s = norm(s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s or 'book'


def strip_tags(el):
    return ' '.join(el.get_text(' ', strip=True).split())


def walk(elem, out):
    for child in elem.children:
        name = getattr(child, 'name', None)
        if name is None:
            continue
        if name in HEADING_TAGS:
            t = strip_tags(child).strip()
            if t:
                out.append(('H', t))
        elif name == 'p':
            t = strip_tags(child).strip()
            if t:
                out.append(('P', t))
        else:
            walk(child, out)


def clean_title(t):
    t = re.sub(r'^\s*(?:kapitel\s+)?\d+[.:\)]\s*', '', t.strip())
    t = re.sub(r'\s+', ' ', t)
    t = t.strip(' .:;—-–\u2013\u2014')
    t = t.strip('\u201c\u201d\u2018\u2019"\'')
    return t


def merge_tiny(chapters, min_len=140):
    """Merge chapters smaller than min_len into the previous one."""
    out = []
    for c in chapters:
        if out and len(c['text']) < min_len:
            prev = out[-1]
            prev['text'] += '\n\n' + c['text']
        else:
            out.append(dict(c))
    return out


def chunk_text(text, target=28000):
    """Split continuous text into ~target-sized parts at paragraph boundaries."""
    paras = [p for p in text.split('\n\n') if p.strip()]
    parts, cur, curlen = [], [], 0
    for p in paras:
        cur.append(p)
        curlen += len(p)
        if curlen >= target and p.strip().endswith(('.', '!', '?', '\u2026', '"', '\u201d')):
            parts.append('\n\n'.join(cur))
            cur, curlen = [], 0
    if cur:
        parts.append('\n\n'.join(cur))
    return parts or [text]


def extract_epub(path):
    book = epub.read_epub(path, options={'ignore_ncx': True})
    items = [it for it in book.get_items_of_type(ebooklib.ITEM_DOCUMENT)]
    blocks = []
    for it in items:
        try:
            soup = BeautifulSoup(it.get_content(), 'html.parser')
        except Exception:
            continue
        for tag in soup(['script', 'style', 'nav']):
            tag.decompose()
        body = soup.body or soup
        walk(body, blocks)

    chapters = []
    cur_title = None
    cur_text = []
    started = False

    def flush():
        nonlocal cur_title, cur_text
        if cur_title and cur_text:
            chapters.append({'n': len(chapters) + 1, 'title': clean_title(cur_title),
                             'text': '\n\n'.join(cur_text)})
        cur_title = None
        cur_text = []

    for kind, text in blocks:
        if kind == 'H':
            if norm(text) in SKIP_TITLES_NORM:
                continue
            if norm(text) == 'innehall' and not started:
                continue
            started = True
            flush()
            cur_title = text
        else:
            if not started:
                continue
            if norm(text) in SKIP_TITLES_NORM:
                continue
            if cur_text and len(cur_text) > 60 and norm(cur_text[-1]) == norm(text):
                continue
            cur_text.append(text)
    flush()

    chapters = [c for c in chapters if c['text'].strip()]
    if len(chapters) <= 1:
        # No heading structure — chunk the full body text.
        body = '\n\n'.join(t for _, t in blocks)
        parts = chunk_text(body)
        chapters = [{'n': i + 1, 'title': 'Del %d' % (i + 1), 'text': p}
                    for i, p in enumerate(parts)]
    else:
        chapters = merge_tiny(chapters)
        chapters = [{'n': i + 1, 'title': c['title'], 'text': c['text']}
                    for i, c in enumerate(chapters)]

    author = ''
    md = book.get_metadata('DC', 'creator')
    if md and md[0]:
        author = md[0][0]
    title = ''
    mt = book.get_metadata('DC', 'title')
    if mt and mt[0]:
        title = mt[0][0]
    if not title:
        title = os.path.splitext(os.path.basename(path))[0]
    return {
        'id': slug(title),
        'title': title,
        'author': author,
        'source': 'epub',
        'chapters': chapters,
    }


def main():
    epubs = sorted(glob.glob(os.path.join(SOURCES, '*.epub')))
    if not epubs:
        raise SystemExit('No EPUB files found in ' + SOURCES)
    books = []
    for p in epubs:
        try:
            b = extract_epub(p)
        except Exception as e:
            print('SKIP %s (%s)' % (os.path.basename(p), e))
            continue
        chs = b['chapters']
        total_chars = sum(len(c['text']) for c in chs)
        tiny = sum(1 for c in chs if len(c['text']) < 140)
        print('%-45s %4d ch %9d chars (tiny:%d)' % (b['title'][:45], len(chs), total_chars, tiny))
        books.append(b)
    data = {'generated': datetime.date.today().isoformat(), 'books': books}
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('wrote', OUT, 'books:', len(books))


if __name__ == '__main__':
    main()
