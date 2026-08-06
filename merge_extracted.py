#!/usr/bin/env python3
"""merge_extracted.py — Merge books_extracted.json into novels_reading.json.

For the 8 existing novels: replace chapter text with the extracted EPUB text where a
chapter matches by title (questions/vocab preserved); unmatched EPUB chapters are
appended. Skrivboken + the 3 PDF books are added as new entries.

Output: novels_reading.json (local-only, gitignored).
"""
import datetime
import json
import os
import re
import unicodedata

ROOT = os.path.dirname(os.path.abspath(__file__))
NOVELS = os.path.join(ROOT, 'novels_reading.json')
EXT = os.path.join(ROOT, 'books_extracted.json')

NEW_BOOK_IDS = {
    'skrivboken': 'skrivboken',
    'pa-svenska-2-larobok-svenska-som-frammande-sprak-b1': 'pa-svenska-2',
    'rivstart-svenska-som-frammande-sprak-b1-b2-ovningsbok': 'rivstart-b1-b2',
    'svenska-skrivregler-for-punktskrift': 'skrivregler-punktskrift',
}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = re.sub(r'[\u0300-\u036f]', '', s)
    s = s.lower().strip()
    return re.sub(r'\s+', ' ', s)


def clean_key(t):
    t = re.sub(r'^[\s\d.:\)\-–—]+', '', t or '')
    t = re.sub(r'\s*\(\d+/\d+\)\s*$', '', t)
    t = re.sub(r'[^a-zåäö0-9]+', ' ', norm(t)).strip()
    return t


def match_title(epub_title, existing_titles):
    k = clean_key(epub_title)
    if not k:
        return None
    for i, t in enumerate(existing_titles):
        ek = clean_key(t)
        if not ek:
            continue
        if k == ek or (len(k) >= 8 and (k in ek or ek in k)):
            return i
    return None


def main():
    novels = json.load(open(NOVELS, encoding='utf-8'))
    ext = json.load(open(EXT, encoding='utf-8'))
    novels_by_title = {}
    for b in novels['novels']:
        novels_by_title[norm(b['title'])] = b

    for eb in ext['books']:
        en = norm(eb['title'])
        novel = None
        for t, b in novels_by_title.items():
            if en and (en in t or t in en):
                novel = b
                break
        if novel is None:
            # New book
            bid = NEW_BOOK_IDS.get(eb['id'], eb['id'])
            if any(b['id'] == bid for b in novels['novels']):
                print('SKIP new book already present:', bid)
                continue
            chapters = [{'n': c['n'], 'title': c['title'], 'pages': '',
                         'text': c['text'], 'vocab': [], 'questions': []}
                        for c in eb['chapters']]
            novels['novels'].append({'id': bid, 'title': eb['title'], 'author': eb['author'],
                                     'source': 'extracted:' + eb['source'], 'chapters': chapters})
            print('ADDED new book %-40s (%d chapters)' % (eb['title'][:40], len(chapters)))
            continue

        old = novel['chapters']
        old_keys = [clean_key(c['title']) for c in old]
        replaced = 0
        for ec in eb['chapters']:
            idx = match_title(ec['title'], old_keys)
            if idx is not None:
                old[idx]['text'] = ec['text']
                replaced += 1
        for i, c in enumerate(old):
            c['n'] = i + 1
        print('ENRICHED %-40s replaced %3d chapter texts' % (eb['title'][:40], replaced))

    novels['generated'] = datetime.date.today().isoformat()
    with open(NOVELS, 'w', encoding='utf-8') as f:
        json.dump(novels, f, ensure_ascii=False, indent=1)
    print('wrote', NOVELS, 'books:', len(novels['novels']))


if __name__ == '__main__':
    main()
