import sys, json, time, os, glob
sys.stdout.reconfigure(encoding='utf-8')
from _common import ROOT, SOURCES_DIR, setup_paths, tessdata_dir
setup_paths()
os.environ['TESSDATA_PREFIX'] = tessdata_dir()
from imports.extract.pipeline import run, _ocr_cache

_ocr_cache.clear()

novels = ['Ett jävla solsken*', 'Expeditionen*', 'Omgiven av idioter*', 'Ondskan*',
          'Sapiens*', 'Tio tankar om arbete*', 'Ålevangeliet*', 'Härskarteknik*']

for pat in novels:
    matches = glob.glob(os.path.join(SOURCES_DIR, '*' + pat))
    if not matches:
        print(f'!! No match for {pat}')
        continue
    pdf = next((m for m in matches if m.lower().endswith('.pdf')), matches[0])
    name = os.path.splitext(os.path.basename(pdf))[0]
    out = os.path.join(ROOT,
                       'data_' + name.split(' (')[0].lower().replace(' ', '_').replace('.', '').replace('ä','a').replace('å','a').replace('ö','o') + '.json')
    ckpt = out.replace('.json', '_checkpoint.json')
    resume = os.path.exists(ckpt)
    print(f'\n=== {os.path.basename(pdf)} ({resume and "resume" or "fresh"}) ===')
    t0 = time.time()
    result = run(pdf, strategy='novel', checkpoint_path=ckpt, checkpoint_every=50, resume=resume)
    elapsed = time.time() - t0
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f'Time: {elapsed:.1f}s | Accepted: {len(result["accepted"])}, Review: {len(result["review"])}')
