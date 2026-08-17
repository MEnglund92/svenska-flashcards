import json, sys
sys.stdout.reconfigure(encoding='utf-8')
d = json.load(open('novels_reading.json', encoding='utf-8'))
missing = {}
for b in d['novels']:
    for c in b['chapters']:
        for v in c['vocab']:
            if not v.get('trans'):
                missing.setdefault(v['lemma'], v['pos'])
print(f'unique missing lemmas: {len(missing)}')
with open('untranslated_lemmas.txt', 'w', encoding='utf-8') as f:
    for lemma, pos in sorted(missing.items()):
        f.write(f'{lemma}\t{pos}\n')
