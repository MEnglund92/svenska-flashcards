import sys, json, time, os, glob
sys.stdout.reconfigure(encoding='utf-8')
from _common import ROOT, SOURCES_DIR, setup_paths, tessdata_dir
setup_paths()
os.environ['TESSDATA_PREFIX'] = tessdata_dir()
from imports.extract.pipeline import run, _ocr_cache

_ocr_cache.clear()

pdf = None
for p in glob.glob(os.path.join(SOURCES_DIR, 'Ondskan*')):
    pdf = p
    break
print(f'PDF: {os.path.basename(pdf)}')

t0 = time.time()
result = run(pdf, enable_novel=True, max_pages=30)
elapsed = time.time() - t0

print(f'Time: {elapsed:.1f}s')
print(f'Accepted: {len(result["accepted"])}, Review: {len(result["review"])}')
print()
print('=== ACCEPTED SAMPLE ===')
for e in result['accepted'][:15]:
    print(f'  {e["phrase"]} ({e.get("partOfSpeech","")})')
    if e.get('sentence'):
        print(f'    {e["sentence"][:90]}')
print()
print('=== REVIEW SAMPLE ===')
for e in result['review'][:15]:
    print(f'  {e["phrase"]} ({e.get("partOfSpeech","")})')
    if e.get('sentence'):
        print(f'    {e["sentence"][:90]}')
