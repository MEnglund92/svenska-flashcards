import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')
from _common import APP_DIR, ROOT, setup_paths
setup_paths()

d = json.load(open(os.path.join(APP_DIR, 'novels_reading.json'), encoding='utf-8'))
missing = {}
for b in d['novels']:
    for c in b['chapters']:
        for v in c['vocab']:
            if not v.get('trans'):
                missing.setdefault(v['lemma'], v['pos'])
print(f'unique missing lemmas: {len(missing)}')
with open(os.path.join(ROOT, 'untranslated_lemmas.txt'), 'w', encoding='utf-8') as f:
    for lemma, pos in sorted(missing.items()):
        f.write(f'{lemma}\t{pos}\n')
