"""Shared bootstrap helpers for scripts in this directory.

Centralizes repo-relative path resolution and Tesseract discovery so no
script hardcodes a developer-specific machine location.
"""
import os
import shutil
import sys

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SCRIPTS_DIR)           # repository root
SERVER_DIR = os.path.join(ROOT, 'server')     # python backend (server.py + imports/)
APP_DIR = os.path.join(ROOT, 'app')           # web frontend (staged by the installer)
SOURCES_DIR = os.path.join(ROOT, 'Sources')   # course material (local only)

# Common Tesseract install locations, tried after PATH lookup.
TESSDATA_CANDIDATES = (
    r'C:\Program Files\Tesseract-OCR\tessdata',
    os.path.expandvars(r'%LOCALAPPDATA%\Tesseract-OCR\tessdata'),
    os.path.expandvars(r'%LOCALAPPDATA%\Programs\Tesseract-OCR\tessdata'),
)

TESS_EXE_CANDIDATES = (
    r'C:\Program Files\Tesseract-OCR\tesseract.exe',
    os.path.expandvars(r'%LOCALAPPDATA%\Tesseract-OCR\tesseract.exe'),
)


def setup_paths():
    """Put the repo root and server dir on sys.path (idempotent)."""
    for p in (ROOT, SERVER_DIR):
        if p not in sys.path:
            sys.path.insert(0, p)


def tesseract_exe():
    """Resolve the tesseract executable or raise a clear error."""
    exe = shutil.which('tesseract')
    if exe:
        return exe
    for cand in TESS_EXE_CANDIDATES:
        if os.path.isfile(cand):
            return cand
    raise SystemExit(
        'tesseract executable not found. Install Tesseract OCR or add it to PATH.')


def tessdata_dir():
    """Resolve the Tesseract tessdata directory (TESSDATA_PREFIX)."""
    env = os.environ.get('TESSDATA_PREFIX')
    if env and os.path.isdir(env):
        return env
    exe = shutil.which('tesseract')
    if exe:
        cand = os.path.join(os.path.dirname(exe), 'tessdata')
        if os.path.isdir(cand):
            return cand
    for cand in TESSDATA_CANDIDATES:
        if os.path.isdir(cand):
            return cand
    raise SystemExit(
        'tessdata directory not found. Install Tesseract OCR or set '
        'TESSDATA_PREFIX to its tessdata folder.')