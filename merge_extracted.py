#!/usr/bin/env python3
"""merge_extracted.py — Merge books_extracted.json into novels_reading.json.

For books already present in novels_reading.json:
  * epub novels are matched by normalized title — chapter text replaced where
    titles match (questions/vocab preserved), unmatched chapters keep old text;
  * text-layer PDF books whose old id (long filename slug) is known via
    REPLACE_IDS are fully replaced with the cleanly-identified entries.
For everything else: appended as new books.

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

REPLACE_IDS = {
    'pa-svenska-2-larobok': 'pa-svenska-2-larobok-svenska-som-frammande-sprak-b1-2nd-ed-2007-ulla-goransson-annika-helander-mai-parada-z-library-sk-1lib-sk-z-lib-sk',
    'rivstart-b1-b2-ovningar': 'rivstart-svenska-som-frammande-sprak-b1-b2-ovningsbok-levy-scherrer-paula-1963-auteur-etc-z-library-sk-1lib-sk-z-lib-sk',
    'skrivregler-punktskrift': 'svenska-skrivregler-for-punktskrift-punktskriftsnamnden-sprakradet-z-library-sk-1lib-sk-z-lib-sk',
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
    novels_by_id = {}
    for b in novels['novels']:
        novels_by_title[norm(b['title'])] = b
        novels_by_id[b['id']] = b

    for eb in ext['books']:
        en = norm(eb['title'])
        # 1) replace known old-id PDF entries with cleanly-identified ones
        old_id = REPLACE_IDS.get(eb['id'])
        if old_id and old_id in novels_by_id:
            old = novels_by_id.pop(old_id)
            novels['novels'].remove(old)
            old.clear()
            old.update({'id': eb['id'], 'title': eb['title'], 'author': eb['author'],
                        'source': 'extracted:' + eb['source'], 'chapters': eb['chapters']})
            novels['novels'].append(old)
            novels_by_id[eb['id']] = old
            print('REPLACED %-42s (%d chapters)' % (eb['title'][:42], len(eb['chapters'])))
            continue
        # 2) enrich existing novels by title
        novel = None
        for t, b in novels_by_title.items():
            if en and (en in t or t in en):
                novel = b
                break
        if novel is not None:
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
            continue
        # 3) append as new book
        if any(b['id'] == eb['id'] for b in novels['novels']):
            print('SKIP new book already present:', eb['id'])
            continue
        chapters = [{'n': c['n'], 'title': c['title'], 'pages': '',
                     'text': c['text'], 'vocab': [], 'questions': []}
                    for c in eb['chapters']]
        novels['novels'].append({'id': eb['id'], 'title': eb['title'], 'author': eb['author'],
                                 'source': 'extracted:' + eb['source'], 'chapters': chapters})
        novels_by_id[eb['id']] = novels['novels'][-1]
        print('ADDED new book %-40s (%d chapters)' % (eb['title'][:40], len(chapters)))

    novels['generated'] = datetime.date.today().isoformat()
    with open(NOVELS, 'w', encoding='utf-8') as f:
        json.dump(novels, f, ensure_ascii=False, indent=1)
    print('wrote', NOVELS, 'books:', len(novels['novels']))


if __name__ == '__main__':
    main()
