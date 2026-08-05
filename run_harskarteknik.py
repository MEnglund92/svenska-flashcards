import sys, json, time, os, glob
sys.stdout.reconfigure(encoding='utf-8')
os.environ['TESSDATA_PREFIX'] = r'C:\Users\matti\AppData\Local\Tesseract-OCR\tessdata'
sys.path.insert(0, r'C:\Users\matti\Desktop\Education\Svenska')
from imports.extract.pipeline import run, _ocr_cache

_ocr_cache.clear()

ROOT = r'C:\Users\matti\Desktop\Education\Svenska'
matches = glob.glob(os.path.join(ROOT, 'Sources', '*Härskarteknik*'))
matches += glob.glob(os.path.join(ROOT, 'Sources', '*Harskarteknik*'))
pdf = next((m for m in matches if m.lower().endswith('.pdf')), matches[0] if matches else None)
print(f'PDF: {os.path.basename(pdf)}')

ckpt = os.path.join(ROOT, 'data_harskarteknik_checkpoint.json')
resume = os.path.exists(ckpt)
print(f'Resume: {resume}')

t0 = time.time()
result = run(pdf, strategy='novel', checkpoint_path=ckpt, checkpoint_every=50, resume=resume)
elapsed = time.time() - t0

out = os.path.join(ROOT, 'data_harskarteknik.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f'Time: {elapsed:.1f}s | Accepted: {len(result["accepted"])}, Review: {len(result["review"])}')
