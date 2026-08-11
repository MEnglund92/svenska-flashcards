"""launcher.pyw - Svenska desktop launcher (WebView2 via pywebview).

Starts the local server (no console) and opens the app in a WebView2 window.
The server runs in a thread of this same process, so closing the window
quits the app entirely. Run with pythonw.exe.
"""
import ctypes, os, socket, sys, threading, time, traceback

BASE = os.path.dirname(os.path.abspath(__file__))
LOCAL_DATA = os.path.join(os.environ.get('LOCALAPPDATA', os.path.expanduser('~')), 'Svenska')
PORT_FILE = os.path.join(LOCAL_DATA, 'port.txt')
LOG_FILE = os.path.join(LOCAL_DATA, 'launcher.log')
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
    def _serve(host, p):
        try:
            srv.run_server(host, p)
        except OSError:
            new_port = free_port(p + 1)
            log('port busy, retrying on ' + str(new_port))
            write_port(new_port)
            srv.run_server(host, new_port)
    threading.Thread(target=_serve, args=('127.0.0.1', port), daemon=True).start()
    ok = server_ready(port)
    log('server up' if ok else 'server NOT ready')
    return port, ok

def run_plain():
    """Fallback when pywebview is missing: serve without a window."""
    os.chdir(BASE)
    sys.path.insert(0, BASE)
    os.environ.setdefault('TTS_MODELS_DIR', os.path.join(BASE, 'models', 'voices'))
    os.environ.setdefault('WHISPER_MODEL_DIR', os.path.join(BASE, 'models', 'whisper'))
    port, ok = start_server()
    log('window unavailable; server running on port ' + str(port))
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        pass
    return 0

def main():
    log('launcher start')
    if mutex_held():
        log('already running, exiting')
        return 0
    try:
        import webview
    except Exception as ex:
        log('pywebview missing: ' + str(ex))
        return run_plain()

    os.chdir(BASE)
    sys.path.insert(0, BASE)
    os.environ.setdefault('TTS_MODELS_DIR', os.path.join(BASE, 'models', 'voices'))
    os.environ.setdefault('WHISPER_MODEL_DIR', os.path.join(BASE, 'models', 'whisper'))

    port, ok = start_server()
    if not ok:
        log('server failed to start; quitting')
        return 1
    log('opening window')
    try:
        webview.create_window('Svenska', url_of(port), width=1280, height=800,
                              min_size=(900, 600), resizable=True)
        webview.start()
    except Exception as ex:
        log('webview error: ' + str(ex) + '\n' + traceback.format_exc())
        return 1
    log('window closed, exiting')
    return 0

if __name__ == '__main__':
    sys.exit(main())
