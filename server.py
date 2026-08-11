import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from http.server import SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
from http.server import HTTPServer
from urllib.parse import urlparse, parse_qs, unquote
from imports.tts import synthesize, preload_all
try:
    from imports import stt as stt_mod
except Exception:
    stt_mod = None

def _long(path):
    p = os.path.abspath(path)
    if os.name == 'nt' and len(p) >= 240 and not p.startswith('\\\\?\\'):
        return '\\\\?\\' + p
    return p

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        root_path = super().translate_path(path)
        if os.path.isfile(_long(root_path)):
            return _long(root_path)
        try:
            decoded = unquote(path.split('?', 1)[0].split('#', 1)[0]).lstrip('/')
        except Exception:
            return root_path
        base = os.path.normpath(os.getcwd())
        alt = os.path.normpath(os.path.join(base, 'Sources', decoded.replace('\\', '/')))
        if alt != base and alt.startswith(base + os.sep) and os.path.isfile(_long(alt)):
            return _long(alt)
        return root_path
    def _json(self, code, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)
    def do_HEAD(self):
        parsed = urlparse(self.path)
        if parsed.path == '/tts':
            self.send_response(200)
            self.send_header('Content-Length', '0')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            return
        super().do_HEAD()
    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/stt':
            if stt_mod is None or not stt_mod.model_available():
                self._json(501, {'ok': False, 'error': 'STT unavailable'})
                return
            params = parse_qs(parsed.query)
            lang = params.get('lang', ['sv'])[0]
            expected = params.get('expected', [''])[0]
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length) if length else b''
                wav = stt_mod.wav_to_pcm16_16k(body) if body else b''
                if len(wav) < 2000:
                    self._json(400, {'ok': False, 'error': 'audio too short'})
                    return
                text, lang_out = stt_mod.transcribe(wav, lang, expected)
                self._json(200, {'ok': True, 'text': text, 'lang': lang_out})
            except Exception as ex:
                self._json(500, {'ok': False, 'error': str(ex)})
            return
        self._json(405, {'ok': False, 'error': 'POST not supported'})
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/tts':
            params = parse_qs(parsed.query)
            text = params.get('text', [''])[0]
            lang = params.get('lang', ['en-US'])[0]
            if not text:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Missing text parameter')
                return
            try:
                wav = synthesize(text, lang)
                self.send_response(200)
                self.send_header('Content-Type', 'audio/wav')
                self.send_header('Content-Length', str(len(wav)))
                self.send_header('Cache-Control', 'no-cache')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(wav)
            except Exception as ex:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(('TTS error: ' + str(ex)).encode())
            return
        super().do_GET()
    def end_headers(self):
        p = urlparse(self.path).path
        if p.lower().endswith('.pdf'):
            self.send_header('Content-Disposition', 'inline')
        super().end_headers()
    def log_message(self, format, *args):
        try:
            sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), format % args))
        except Exception:
            pass

def run_server(host='127.0.0.1', port=5001, preload=True):
    if preload:
        preload_all()
    server = ThreadedHTTPServer((host, port), Handler)
    server.serve_forever()

def main():
    port = int(os.environ.get('PORT', 5001))
    host = os.environ.get('HOST', '127.0.0.1')
    print('Loading TTS models...', end=' ', flush=True)
    preload_all()
    print('Ready')
    server = ThreadedHTTPServer((host, port), Handler)
    print(f'Serving on http://{host}:{port}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down')
        server.server_close()

if __name__ == '__main__':
    main()