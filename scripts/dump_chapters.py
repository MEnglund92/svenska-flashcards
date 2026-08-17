import json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from _common import ROOT, APP_DIR, setup_paths
setup_paths()

OUT = os.path.join(ROOT, 'novels_text')


def slug(s):
    return re.sub(r'[^a-z���0-9]+', '_', s.lower()).strip('_')


d = json.load(open(os.path.join(APP_DIR, 'novels_reading.json'), encoding='utf-8'))
total = 0
for b in d['novels']:
    bdir = os.path.join(OUT, b['id'])
    os.makedirs(bdir, exist_ok=True)
    for idx, c in enumerate(b['chapters'], 1):
        fn = os.path.join(bdir, f"{idx:03d}_{c['n']:02d}_{slug(c['title'])[:60]}.txt")
        header = (f"BOK: {b['title']} ({b['author']})\n"
                  f"KAPITEL {c['n']}: {c['title']}\n"
                  f"SIDOR: {c['pages']}\n"
                  + '=' * 60 + '\n\n')
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(header + c['text'])
        total += 1
print(f'{total} chapter files written under {OUT}')
