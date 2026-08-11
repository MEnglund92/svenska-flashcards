"""fetch_fonts.py - download latin woff2 subsets of Inter + Playfair Display
into <repo>/fonts/ and generate fonts/fonts.css for 100% offline usage.
stdlib only. Run: python tools/fetch_fonts.py
"""
import hashlib, pathlib, re, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS_DIR = ROOT / 'fonts'
FAMILIES = "family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700"
CSS_URL = "https://fonts.googleapis.com/css2?" + FAMILIES + "&display=swap"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
SIZE_LIMIT = 300_000

def fetch(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()

def main():
    css = fetch(CSS_URL, {'User-Agent': UA}).decode('utf-8')
    blocks = re.split(r'/\* ([a-z-]+) \*/', css)
    FONTS_DIR.mkdir(exist_ok=True)
    seen_hashes = {}
    groups = {}
    for i in range(1, len(blocks) - 1, 2):
        subset, rule = blocks[i], blocks[i + 1]
        if subset != 'latin':
            continue
        fam = re.search(r"font-family:\s*'([^']+)'", rule).group(1)
        weight = int(re.search(r"font-weight:\s*(\d+)", rule).group(1))
        style = re.search(r"font-style:\s*(\w+)", rule).group(1)
        url = re.search(r"url\((https:[^)]+\.woff2)\)", rule).group(1)
        data = fetch(url)
        if len(data) > SIZE_LIMIT:
            raise SystemExit(f"unexpectedly large font file: {len(data)} bytes")
        digest = hashlib.sha256(data).hexdigest()
        key = (fam, style)
        groups.setdefault(key, {'weights': set(), 'file': None})
        groups[key]['weights'].add(weight)
        if digest not in seen_hashes:
            slug = fam.replace(' ', '') + ('' if style == 'normal' else '-' + style)
            path = FONTS_DIR / (slug + '.woff2')
            path.write_bytes(data)
            seen_hashes[digest] = slug + '.woff2'
            groups[key]['file'] = slug + '.woff2'
        else:
            groups[key]['file'] = seen_hashes[digest]
    rules = []
    for (fam, style), g in sorted(groups.items()):
        weights = ' '.join(str(w) for w in sorted(g['weights']))
        rules.append(
            "@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;"
            "src:url(%s) format('woff2')}" % (fam, style, weights, g['file']))
    css_text = '\n'.join(rules) + '\n'
    (FONTS_DIR / 'fonts.css').write_text(css_text, encoding='utf-8')
    print(f"Saved {len(seen_hashes)} woff2 files + fonts.css to {FONTS_DIR}")

if __name__ == '__main__':
    main()