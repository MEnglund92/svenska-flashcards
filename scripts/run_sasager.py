import sys, json, time, os, glob
sys.stdout.reconfigure(encoding='utf-8')
from _common import ROOT, SOURCES_DIR, setup_paths, tessdata_dir
setup_paths()
os.environ['TESSDATA_PREFIX'] = tessdata_dir()
from imports.extract.pipeline import run, _ocr_cache

_ocr_cache.clear()

pdf = None
for p in glob.glob(os.path.join(SOURCES_DIR, 'S� s�ger man*')):
    pdf = p
    break
print(f'PDF: {os.path.basename(pdf)}')

ckpt = os.path.join(ROOT, 'sasager_checkpoint.json')
resume = os.path.exists(ckpt)
print(f'Resume: {resume}')

t0 = time.time()
result = run(pdf, strategy='phrase', checkpoint_path=ckpt, checkpoint_every=10, resume=resume)
elapsed = time.time() - t0

out = os.path.join(ROOT, 'data_sasager_man.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f'Time: {elapsed:.1f}s ({elapsed/60:.1f} min)')
print(f'Accepted: {len(result["accepted"])}, Review: {len(result["review"])}')
