"""tray.pyw - Svenska system tray launcher.

Starts the local server (no console), opens the bundled Chromium app window,
and keeps a tray icon for control. Run with pythonw.exe.
"""
import ctypes, os, socket, subprocess, sys, threading, time, traceback, webbrowser

BASE = os.path.dirname(os.path.abspath(__file__))
LOCAL_DATA = os.path.join(os.environ.get('LOCALAPPDATA', os.path.expanduser('~')), 'Svenska')
PORT_FILE = os.path.join(LOCAL_DATA, 'port.txt')
LOG_FILE = os.path.join(LOCAL_DATA, 'tray.log')
DEFAULT_PORT = 5001
LOCK_NAME = 'SvenskaTray'

def log(msg):
    try:
        os.makedirs(LOCAL_DATA, exist_ok=True)
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(time.strftime('%Y-%m-%d %H:%M:%S ') + msg + '\n')
    except Exception:
        pass

def mutex_held():
    try:
        ctypes.windll.kernel32.CreateMutexW(None, False, LOCK_NAME)
        return ctypes.windll.kernel32.GetLastError() == 183
    except Exception:
        return False

def read_port():
    try:
        with open(PORT_FILE, 'r') as f:
            return int(f.read().strip())
    except Exception:
        return None

def write_port(port):
    try:
        os.makedirs(LOCAL_DATA, exist_ok=True)
        with open(PORT_FILE, 'w') as f:
            f.write(str(port))
    except Exception:
        pass

def free_port(preferred):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind(('127.0.0.1', preferred))
        s.close()
        return preferred
    except OSError:
        s.close()
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind(('127.0.0.1', 0))
        port = s.getsockname()[1]
        s.close()
        return port
    except OSError:
        s.close()
        return preferred + 1

def url_of(port):
    return 'http://127.0.0.1:{0}/'.format(port)

def chrome_path():
    p = os.path.join(BASE, 'chrome', 'chrome.exe')
    return p if os.path.isfile(p) else None

def open_app_window():
    port = read_port() or DEFAULT_PORT
    exe = chrome_path()
    if exe:
        profile = os.path.join(LOCAL_DATA, 'profile')
        os.makedirs(profile, exist_ok=True)
        args = [exe,
                '--app=' + url_of(port),
                '--user-data-dir=' + profile,
                '--no-first-run',
                '--no-default-browser-check',
                '--disable-background-networking']
        try:
            subprocess.Popen(args, close_fds=True)
            return
        except Exception as ex:
            log('chrome launch failed: ' + str(ex))
    webbrowser.open(url_of(port))

def server_ready(port, timeout=120):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection(('127.0.0.1', port), timeout=2) as s:
                s.sendall(b'GET / HTTP/1.0\r\nHost: 127.0.0.1\r\n\r\n')
                if s.recv(64).startswith(b'HTTP/1.0 200'):
                    return True
        except OSError:
            pass
        time.sleep(0.5)
    return False

def start_server():
    import server as srv
    port = read_port()
    if port is None:
        port = free_port(DEFAULT_PORT)
        write_port(port)
    log('starting server on port ' + str(port))
    threading.Thread(target=srv.run_server, args=('127.0.0.1', port), daemon=True).start()
    ok = server_ready(port)
    log('server up' if ok else 'server NOT ready')
    return port, ok

def run_plain():
    """Fallback when pystray/Pillow are missing: start server + open window."""
    os.chdir(BASE)
    sys.path.insert(0, BASE)
    os.environ.setdefault('TTS_MODELS_DIR', os.path.join(BASE, 'models', 'voices'))
    os.environ.setdefault('WHISPER_MODEL_DIR', os.path.join(BASE, 'models', 'whisper'))
    port, ok = start_server()
    open_app_window()
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        pass
    return 0

def main():
    log('tray start')
    if mutex_held():
        log('already running, reopening window')
        open_app_window()
        return 0
    try:
        import pystray
        from PIL import Image
    except Exception as ex:
        log('tray deps missing: ' + str(ex))
        return run_plain()

    os.chdir(BASE)
    sys.path.insert(0, BASE)
    os.environ.setdefault('TTS_MODELS_DIR', os.path.join(BASE, 'models', 'voices'))
    os.environ.setdefault('WHISPER_MODEL_DIR', os.path.join(BASE, 'models', 'whisper'))

    img = None
    for cand in ('appicon.ico', 'icons/icon-512.png', 'icons/icon-192.png'):
        p = os.path.join(BASE, cand)
        if os.path.isfile(p):
            try:
                img = Image.open(p)
                if img.size != (64, 64):
                    img = img.resize((64, 64))
                break
            except Exception:
                img = None
    if img is None:
        img = Image.new('RGB', (64, 64), (5, 5, 8))

    def open_app(icon_, item=None):
        open_app_window()

    def open_browser(icon_, item=None):
        port = read_port() or DEFAULT_PORT
        webbrowser.open(url_of(port))

    def quit_app(icon_, item=None):
        log('tray quit')
        icon_.stop()
        os._exit(0)

    menu = pystray.Menu(
        pystray.MenuItem('\u00D6ppna appen', open_app, default=True),
        pystray.MenuItem('\u00D6ppna i webbl\u00E4sare', open_browser),
        pystray.Menu.SEPARATOR,
        pystray.MenuItem('Avsluta', quit_app),
    )
    icon = pystray.Icon('svenska', img, 'Svenska', menu)

    threading.Thread(target=lambda: _boot(), daemon=True).start()
    icon.notify('Svenska startar\u2026', 'Svenska')
    icon.run()
    return 0

def _boot():
    try:
        port, ok = start_server()
        time.sleep(0.5)
        open_app_window()
    except Exception as ex:
        log('boot error: ' + str(ex) + '\n' + traceback.format_exc())

if __name__ == '__main__':
    sys.exit(main())