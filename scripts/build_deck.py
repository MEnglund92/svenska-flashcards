#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build_deck.py - assemble a flashcard deck (data_deck.js) from the extracted
data_*.json corpus. Output is local-only (gitignored, copyrighted material).

Pipeline:
  1. load every data_*.json (skip checkpoints/baks), grouped by source type
  2. normalize entries to the app schema
  3. clean: strip z-library source noise, drop OCR junk, repair diacritics
  4. gate: review entries need meaning/sentence; novels capped per book
  5. dedupe by phrase across the whole corpus
  6. fill English translations from vocab_translations.json
  7. emit data_deck.js (const deckCourses, one course per group)
"""
import json
import glob
import os
import re
import collections

from _common import ROOT, APP_DIR, setup_paths
setup_paths()

GROUPS = {
    'ordbocker': {
        'name': 'Ordböcker',
        'cat': ('ord', 'Dictionary', 'Ordbok', '#4fc3f7'),
        'files': ['data_saol.json', 'data_norstedts_ordbok.json',
                  'data_svensk_ordbok_textlayer.json'],
    },
    'idiom': {
        'name': 'Svenska idiom',
        'cat': ('idiom', 'Idiom', 'Idiom', '#ffb74d'),
        'files': ['data_idom_3500.json'],
    },
    'fraser': {
        'name': 'Så säger man',
        'cat': ('fraser', 'Phrases', 'Fraser', '#81c784'),
        'files': ['data_sasager_man.json'],
    },
    'larobocker': {
        'name': 'Läroböcker',
        'cat': ('larobok', 'Textbook', 'Lärobok', '#ba68c8'),
        'files': ['data_bolander_grammatik.json', 'data_bygg_1.json',
                  'data_bygg_ert.json', 'data_form_i_fokus_a.json',
                  'data_form_i_fokus_b1.json', 'data_form_i_fokus_b2.json',
                  'data_form_i_fokus_c.json', 'data_form_i_fokus_c_ovningar.json',
                  'data_nyborjarsvenska.json', 'data_pa_svenska_2.json',
                  'data_pa_svenska_ovningsbok.json', 'data_rivstart_a1a2.json',
                  'data_rivstart_a1a2_ovningsbok.json',
                  'data_rivstart_b1b2_ovningsbok.json', 'data_skrivboken.json',
                  'data_skrivregler.json', 'data_skrivregler_punktskrift.json',
                  'data_svenska_impulser_3.json', 'data_uppsatshandboken.json'],
    },
    'litteratur': {
        'name': 'Romaner',
        'cat': ('litteratur', 'Literature', 'Litteratur', '#f06292'),
        'files': ['data_alevangeliet_berattelsen_om_varldens_mest_gatfulla_fisk.json',
                  'data_ett_javla_solsken.json',
                  'data_expeditionen_min_karlekshistoria.json',
                  'data_harskarteknik.json',
                  'data_omgiven_av_idioter_hur_man_forstar_dem_som_inte_gar_att_forsta.json',
                  'data_ondskan.json', 'data_sapiens.json',
                  'data_tio_tankar_om_arbete.json'],
    },
}
NOVEL_CAP = 1500

Z_LIB = re.compile(r'\s*\([^)]*(?:z-lib|z-library|1lib)[^)]*\)\s*$', re.I)
JUNK_RE = re.compile(r'[\ufffd]|^\s*[\d.,\-\s]+$|^\s*$')
VALID_RE = re.compile(r"^[A-Za-zÅÄÖåäöÉÈÊéèêÜüÁáÍíÓóÑñ0-9\s'’\-.,!?%&/()\"«»:;+]+$")
FOLD = str.maketrans({'å': 'a', 'ä': 'a', 'ö': 'o', 'é': 'e', 'è': 'e',
                      'ê': 'e', 'ü': 'u', 'á': 'a', 'í': 'i', 'ó': 'o',
                      'ñ': 'n'})


def entries_of(path):
    d = json.load(open(path, encoding='utf-8'))
    if isinstance(d, list):
        return d
    out = list(d.get('accepted', []))
    out += list(d.get('review', []))
    return out


def fix_mojibake(s):
    if not isinstance(s, str):
        return s
    try:
        cand = s.encode('latin-1').decode('utf-8')
        return cand
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


def clean_source_book(e):
    src = e.get('source') or {}
    if isinstance(src, dict) and src.get('book'):
        src['book'] = Z_LIB.sub('', src['book']).strip()
        e['source'] = src
    return e


def clean_phrase(p):
    if not p:
        return None
    p = p.strip()
    if len(p) < 1 or len(p) > 60:
        return None
    if JUNK_RE.search(p):
        return None
    if not VALID_RE.match(p):
        return None
    digits = sum(c.isdigit() for c in p)
    if len(p) <= 3 and digits == len(p):
        return None
    return re.sub(r'\s+', ' ', p)


def build_spacy_vocab(lex):
    """Proper Swedish token set + fold index from spaCy sv model; falls back to a
    fold index built from `lex` when the model (or spacy) is unavailable."""
    try:
        import spacy
        nlp = spacy.load('sv_core_news_sm')
        vocab = set(nlp.vocab.strings)
        fold_index = {}
        for w in vocab:
            fold_index.setdefault(w.translate(FOLD), []).append(w)
        return vocab, fold_index
    except Exception:
        fold_index = {}
        for w in lex:
            fold_index.setdefault(w.translate(FOLD), []).append(w)
        return None, fold_index


def build_lexicon():
    """Trusted orthography set: dictionary headwords + translations + reader vocab.
    NOTE: must not include raw corpus phrases - they carry the OCR errors we
    are trying to repair."""
    lex = set()
    for f in ['data_saol.json', 'data_norstedts_ordbok.json',
              'data_svensk_ordbok_textlayer.json']:
        path = os.path.join(ROOT, f)
        if not os.path.isfile(path):
            continue
        for e in entries_of(path):
            p = e.get('phrase')
            if isinstance(p, str):
                for tok in p.replace('/', ' ').split():
                    lex.add(tok.strip('.,;:!?()"\'»«').lower())
    try:
        vt = json.load(open(os.path.join(ROOT, 'vocab_translations.json'),
                            encoding='utf-8'))
        for k in vt:
            lex.add(fix_mojibake(k).strip().lower())
    except Exception:
        pass
    try:
        nr = json.load(open(os.path.join(ROOT, 'novels_reading.json'),
                            encoding='utf-8'))
        for b in nr['novels']:
            for c in b['chapters']:
                for v in c.get('vocab', []):
                    for key in ('w', 'lemma'):
                        val = v.get(key)
                        if isinstance(val, str):
                            for tok in val.replace('/', ' ').split():
                                lex.add(tok.strip('.,;:!?()"\'').lower())
    except Exception:
        pass
    return lex


def repair_diacritics(text, lex, vocab, fold_index):
    out = []
    for tok in text.split():
        t = tok.strip('.,;:!?()"\'»«')
        if not t:
            out.append(tok)
            continue
        key = t.lower()
        if vocab is not None:
            if key in vocab:
                out.append(tok)
                continue
        else:
            if key in lex:
                out.append(tok)
                continue
        cands = fold_index.get(key.translate(FOLD), [])
        cands = sorted(set(cands))
        if len(cands) == 1:
            cand = cands[0]
            if t[0].isupper():
                cand = cand[0].upper() + cand[1:]
            out.append(cand)
        else:
            out.append(tok)
    return ' '.join(out)


def main():
    import sys
    sys.stdout.reconfigure(line_buffering=True)
    lex = build_lexicon()
    vocab, fold_index = build_spacy_vocab(lex)
    print('lexicon:', len(lex), '| spaCy vocab:', len(vocab or []), flush=True)
    vt = {}
    try:
        raw = json.load(open(os.path.join(ROOT, 'vocab_translations.json'),
                             encoding='utf-8'))
        for k, v in raw.items():
            kk = fix_mojibake(k).strip().lower()
            if kk and isinstance(v, str) and v.strip():
                vt[kk] = v.strip()
    except Exception:
        pass

    stats = collections.Counter()
    seen = {}
    courses = []

    for gid, g in GROUPS.items():
        entries = []
        for f in g['files']:
            path = os.path.join(ROOT, f)
            if not os.path.isfile(path):
                continue
            es = entries_of(path)
            for e in es:
                if not isinstance(e, dict):
                    continue
                conf = e.get('confidence')
                try:
                    conf = float(conf) if conf is not None else 0.5
                except (TypeError, ValueError):
                    conf = 0.5
                review = conf < 0.5
                p = clean_phrase(e.get('phrase'))
                if not p:
                    continue
                meaning = (e.get('meaning') or '').strip()
                sentence = (e.get('sentence') or '').strip()
                translation = (e.get('translation') or '').strip()
                if review:
                    if not (meaning or sentence):
                        continue
                entries.append({
                    'phrase': p, 'meaning': meaning, 'translation': translation,
                    'sentence': sentence, 'conf': conf, 'review': review,
                    'src': os.path.basename(f),
                })
        if gid == 'litteratur':
            per_book = collections.defaultdict(list)
            for e in entries:
                per_book[e['src']].append(e)
            entries = []
            for src, lst in per_book.items():
                lst.sort(key=lambda e: (bool(e['sentence']), e['conf']),
                         reverse=True)
                entries += lst[:NOVEL_CAP]
        stats['%s raw' % gid] = len(entries)

        course_entries = []
        for e in entries:
            p = repair_diacritics(e['phrase'], lex, vocab, fold_index)
            if not clean_phrase(p):
                continue
            meaning = repair_diacritics(e['meaning'], lex, vocab, fold_index) if e['meaning'] else ''
            sentence = e['sentence']
            translation = e['translation']
            if not translation:
                translation = vt.get(p.lower(), '')
                if not translation:
                    translation = vt.get(repair_diacritics(e['phrase'].lower(), lex, vocab, fold_index), '')
            if not meaning:
                meaning = translation or '—'
            key = p.lower()
            score = (bool(translation), bool(sentence), e['conf'])
            norm = {'phrase': p, 'meaning': meaning, 'sentence': sentence,
                    'translation': translation, 'score': score, 'gid': gid}
            if key in seen:
                old = seen[key]
                if score > old['score']:
                    old.update(norm)
                continue
            seen[key] = norm
            course_entries.append(norm)
        stats['%s kept' % gid] = len(course_entries)
        stats['%s translated' % gid] = sum(
            1 for e in course_entries if e['translation'])
        cat_id, cat_en, cat_sv, color = g['cat']
        courses.append({
            'id': gid, 'name': g['name'],
            'categories': [{'id': cat_id, 'name': cat_en, 'nameSv': cat_sv,
                            'color': color}],
            'entries': [{'phrase': e['phrase'], 'meaning': e['meaning'],
                         'translation': e['translation'],
                         'sentence': e['sentence'],
                         'category': cat_id,
                         'difficulty': 'medium'} for e in course_entries],
        })

    total = sum(len(c['entries']) for c in courses)
    print('DECK STATS')
    for k, v in sorted(stats.items()):
        print('  %-22s %6d' % (k, v))
    print('  %-22s %6d' % ('TOTAL entries', total))
    print('  lexicon size:', len(lex), '| translation map:', len(vt))

    out = os.path.join(APP_DIR, 'data_deck.js')
    with open(out, 'w', encoding='utf-8') as f:
        f.write('/* data_deck.js - generated by build_deck.py (%s) - local-only */\n'
                % os.path.basename(out))
        f.write('const deckCourses=%s;\nwindow.deckCourses=deckCourses;\n'
                % json.dumps(courses, ensure_ascii=False))
    print('wrote', out, '(', os.path.getsize(out), 'bytes )')


if __name__ == '__main__':
    main()
