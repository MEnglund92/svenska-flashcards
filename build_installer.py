"""build_installer.py - build the Svenska Windows installer.

Steps: stage app files, embed Python + pip deps, Chrome for Testing,
Piper voices, Whisper model, Inno Setup, ISCC -> dist/Svenska-Setup-X.exe.
Run with a local Python 3.11+ (or 3.12):  python build_installer.py
"""
import json, os, shutil, subprocess, sys, urllib.request, zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
STAGE = os.path.join(ROOT, 'build', 'stage')
DIST = os.path.join(ROOT, 'dist')
APP = os.path.join(STAGE, 'app')
PYDIR = os.path.join(APP, 'python')
VERSION = '1.0.0'
PY_VERSION = '3.12.10'
PY_EMBED = 'python-%s-embed-amd64.zip' % PY_VERSION
PY_URL = 'https://www.python.org/ftp/python/%s/%s' % (PY_VERSION, PY_EMBED)
CFT_JSON = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json'
GET_PIP = 'https://bootstrap.pypa.io/get-pip.py'
PIP_PKGS = ['piper-tts', 'faster-whisper', 'pystray', 'Pillow', 'onnxruntime']
WHISPER_BASE = 'https://huggingface.co/Systran/faster-whisper-base/resolve/main'
WHISPER_FILES = ['model.bin', 'config.json', 'tokenizer.json', 'vocabulary.txt']
WHISPER_DIR = os.path.join(APP, 'models', 'whisper')
VOICES_DIR = os.path.join(APP, 'models', 'voices')
VOICE_FILES = [
    'sv_SE-nst-medium.onnx', 'sv_SE-nst-medium.onnx.json',
    'en_US-lessac-medium.onnx', 'en_US-lessac-medium.onnx.json',
]
ISCC_CANDIDATES = [
    r'C:\Program Files (x86)\Inno Setup 6\ISCC.exe',
    r'C:\Program Files\Inno Setup 6\ISCC.exe',
    os.path.expandvars(r'%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe'),
]

# ---- fixtures copied into the installer (dev-only files excluded) ----
APP_FILES = ['index.html', 'data.js', 'data_deck.js', 'novels_reading.json',
             'manifest.json', 'sw.js', 'server.py', 'tray.pyw', 'appicon.ico']
APP_DIRS = ['icons', 'fonts', 'imports']
SKIP_IMPORTS = {'extract', '__pycache__'}

def fetch(url, dest=None, binary=True):
    print('GET', url)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=300) as r:
        data = r.read()
    if dest:
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'wb' if binary else 'w', encoding=None if binary else 'utf-8') as f:
            f.write(data)
    return data

def step(msg):
    print('\n=== ' + msg + ' ===', flush=True)

def stage_app():
    step('staging app files')
    if not os.path.isdir(APP):
        os.makedirs(APP)
    for name in APP_FILES:
        src = os.path.join(ROOT, name)
        if os.path.isfile(src):
            shutil.copy2(src, os.path.join(APP, name))
    for d in APP_DIRS:
        shutil.copytree(os.path.join(ROOT, d), os.path.join(APP, d),
                        dirs_exist_ok=True,
                        ignore=shutil.ignore_patterns('*.pyc', '__pycache__'))
    imports_dst = os.path.join(APP, 'imports', 'extract')
    if os.path.isdir(imports_dst):
        shutil.rmtree(imports_dst)
    step('syncing Sources/ (robocopy, only changed files)')
    src = os.path.join(ROOT, 'Sources')
    dst = os.path.join(APP, 'Sources')
    r = subprocess.run(['robocopy', src, dst, '/E', '/COPY:DAT', '/R:0', '/W:0',
                        '/MT:16', '/NFL', '/NDL', '/NP',
                        '/XD', 'Extractable', 'Form i fokus*', 'P\u00E5 svenska 1*'])
    if r.returncode >= 8:
        raise SystemExit('robocopy failed with code %d' % r.returncode)
    import re as _re
    for name in os.listdir(dst):
        if name == 'Extractable' or _re.match(r'Form i fokus', name) or name.startswith('P\u00E5 svenska 1'):
            target = os.path.join(dst, name)
            if os.name == 'nt':
                target = '\\\\?\\' + os.path.abspath(target)
                subprocess.run(['cmd', '/c', 'rd', '/s', '/q', target],
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                continue
            shutil.rmtree(target, ignore_errors=False)

def make_ico():
    step('generating appicon.ico')
    try:
        from PIL import Image
    except ImportError:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '--quiet', 'Pillow'], check=True)
        from PIL import Image
    img = Image.open(os.path.join(ROOT, 'icons', 'icon-512.png')).convert('RGBA')
    img.save(os.path.join(ROOT, 'appicon.ico'), sizes=[(16, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    print('appicon.ico written')

def stage_python():
    step('downloading embedded Python')
    zip_path = os.path.join(STAGE, PY_EMBED)
    fetch(PY_URL, zip_path)
    with zipfile.ZipFile(zip_path) as z:
        z.extractall(PYDIR)
    pth = os.path.join(PYDIR, 'python%s%s._pth' % (PY_VERSION.split('.')[0], PY_VERSION.split('.')[1]))
    with open(pth, 'r', encoding='utf-8') as f:
        content = f.read()
    if '#import site' in content:
        content = content.replace('#import site', 'import site')
        with open(pth, 'w', encoding='utf-8') as f:
            f.write(content)
    exe = os.path.join(PYDIR, 'python.exe')
    step('bootstrapping pip')
    fetch(GET_PIP, os.path.join(STAGE, 'get-pip.py'))
    subprocess.run([exe, os.path.join(STAGE, 'get-pip.py'), '--no-warn-script-location'], check=True)
    step('pip install ' + ' '.join(PIP_PKGS))
    subprocess.run([exe, '-m', 'pip', 'install', '--no-warn-script-location', '--no-cache-dir'] + PIP_PKGS, check=True)

def stage_chromium():
    step('downloading Chrome for Testing')
    info = json.loads(fetch(CFT_JSON).decode())
    stable = info['channels']['Stable']
    url = None
    for d in stable['downloads']['chrome']:
        if d['platform'] == 'win64':
            url = d['url']
            break
    if not url:
        raise SystemExit('no win64 chrome in cft json')
    print('chrome version', stable['version'])
    zip_path = os.path.join(STAGE, 'chrome-win64.zip')
    fetch(url, zip_path)
    step('extracting Chrome')
    with zipfile.ZipFile(zip_path) as z:
        z.extractall(STAGE)
    src = os.path.join(STAGE, 'chrome-win64')
    dst = os.path.join(APP, 'chrome')
    if os.path.isdir(dst):
        shutil.rmtree(dst)
    os.rename(src, dst)

def stage_models():
    step('copying Piper voices')
    tts_root = os.path.normpath(os.path.join(ROOT, '..', 'tts-models'))
    os.makedirs(VOICES_DIR, exist_ok=True)
    for name in VOICE_FILES:
        shutil.copy2(os.path.join(tts_root, name), os.path.join(VOICES_DIR, name))
    step('downloading Whisper base model')
    os.makedirs(WHISPER_DIR, exist_ok=True)
    for name in WHISPER_FILES:
        fetch(WHISPER_BASE + '/' + name, os.path.join(WHISPER_DIR, name))

def smoke_test():
    step('smoke test (staged python + staged app)')
    exe = os.path.join(PYDIR, 'python.exe')
    cwd = APP
    env = dict(os.environ)
    env['HOST'] = '127.0.0.1'
    env['PORT'] = '5199'
    env['WHISPER_MODEL_DIR'] = WHISPER_DIR
    env['TTS_MODELS_DIR'] = VOICES_DIR
    proc = subprocess.Popen([exe, 'server.py'], cwd=cwd, env=env,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    try:
        url = 'http://127.0.0.1:5199'
        import time
        deadline = time.time() + 120
        html = None
        while time.time() < deadline:
            try:
                html = urllib.request.urlopen(url, timeout=5).read()
                break
            except Exception:
                time.sleep(1)
        assert html and b'<!DOCTYPE html>' in html[:200], 'index failed'
        print('index.html OK')
        wav = urllib.request.urlopen(url + '/tts?text=hej', timeout=30).read()
        assert wav[:4] == b'RIFF', 'tts failed'
        print('tts OK (%d bytes)' % len(wav))
        # synthesize a short 16 kHz mono PCM WAV (1s of speech-like tone)
        import struct, io, wave
        buf = io.BytesIO()
        with wave.open(buf, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000)
            w.writeframes(b''.join(struct.pack('<h', int(3000 * ((i % 80) / 80 - 0.5))) for i in range(16000)))
        req = urllib.request.Request(url + '/stt?lang=sv&expected=hej', data=buf.getvalue(),
                                     headers={'Content-Type': 'audio/wav'}, method='POST')
        resp = json.loads(urllib.request.urlopen(req, timeout=120).read())
        assert resp.get('ok') is True, 'stt failed: ' + str(resp)
        print('stt OK:', resp)
        print('SMOKE TEST PASSED')
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except Exception:
            proc.kill()

def find_iscc():
    for cand in ISCC_CANDIDATES:
        if os.path.isfile(cand):
            return cand
    return None

def install_inno():
    step('installing Inno Setup 6 (silent, may need UAC once)')
    exe = os.path.join(STAGE, 'innosetup-installer.exe')
    fetch('https://jrsoftware.org/download.php/is.exe', exe)
    subprocess.run([exe, '/VERYSILENT', '/SUPPRESSMSGBOXES', '/NORESTART', '/SP-'], check=True)
    return find_iscc()

def render_iss():
    step('writing installer.iss')
    template = r'''
#define MyAppName "Svenska"
#define MyAppVersion "__VERSION__"
#define MyAppExeName "tray.pyw"

[Setup]
AppId={{8E969ADC-0D3C-4B3E-9D7F-0A5F27E6C1B9}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher=Local Study App
DefaultDirName={localappdata}\Programs\Svenska
DefaultGroupName=Svenska
PrivilegesRequired=lowest
OutputDir=__DIST__
OutputBaseFilename=Svenska-Setup-{#MyAppVersion}
Compression=zip
SolidCompression=no
WizardStyle=modern
SetupIconFile=__ICON__
UninstallDisplayIcon={app}\appicon.ico
DisableProgramGroupPage=yes
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop shortcut"; GroupDescription: "Additional shortcuts:"

[Files]
Source: "__APP__\*"; DestDir: "{app}"; Excludes: "chrome\*,Sources\*"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "__APP__\chrome\*"; DestDir: "{app}\chrome"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "__APP__\Sources\*.pdf"; DestDir: "{app}\Sources"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Svenska"; Filename: "{app}\python\pythonw.exe"; Parameters: "tray.pyw"; WorkingDir: "{app}"; IconFilename: "{app}\appicon.ico"; Comment: "Svenska - Swedish study app"
Name: "{autodesktop}\Svenska"; Filename: "{app}\python\pythonw.exe"; Parameters: "tray.pyw"; WorkingDir: "{app}"; IconFilename: "{app}\appicon.ico"; Tasks: desktopicon

[Run]
Filename: "{app}\python\pythonw.exe"; Parameters: "tray.pyw"; WorkingDir: "{app}"; Flags: nowait postinstall skipifsilent; Description: "Start Svenska now"
'''.replace('__VERSION__', VERSION).replace('__DIST__', DIST).replace('__ICON__', os.path.join(ROOT, 'appicon.ico').replace('\\', '\\\\')).replace('__APP__', APP.replace('\\', '\\\\'))
    iss_path = os.path.join(STAGE, 'installer.iss')
    with open(iss_path, 'w', encoding='utf-8') as f:
        f.write(template)
    return iss_path

def main():
    os.makedirs(DIST, exist_ok=True)
    os.makedirs(STAGE, exist_ok=True)
    if not os.path.isfile(os.path.join(ROOT, 'appicon.ico')):
        make_ico()
    stage_app()
    if not os.path.isfile(os.path.join(PYDIR, 'python.exe')):
        stage_python()
    if not os.path.isdir(os.path.join(APP, 'chrome')):
        stage_chromium()
    if not os.path.isdir(WHISPER_DIR):
        stage_models()
    smoke_test()
    iss = render_iss()
    iscc = find_iscc() or install_inno()
    step('running ISCC')
    subprocess.run([iscc, iss], check=True, cwd=STAGE)
    out = os.path.join(DIST, 'Svenska-Setup-%s.exe' % VERSION)
    print('\nDONE: ' + out + ' (%d MB)' % (os.path.getsize(out) // (1024 * 1024)))

if __name__ == '__main__':
    main()