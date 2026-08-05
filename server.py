import os, sys
from http.server import SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
from http.server import HTTPServer
from urllib.parse import urlparse, parse_qs, unquote
from imports.tts import synthesize, preload_all

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        root_path = super().translate_path(path)
        if os.path.isfile(root_path):
            return root_path
        try:
            decoded = unquote(path.split('?', 1)[0].split('#', 1)[0]).lstrip('/')
        except Exception:
            return root_path
        base = os.path.normpath(os.getcwd())
        alt = os.path.normpath(os.path.join(base, 'Sources', decoded.replace('\\', '/')))
        if alt != base and alt.startswith(base + os.sep) and os.path.isfile(alt):
            return alt
        return root_path
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
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), format % args))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print('Loading TTS models...', end=' ', flush=True)
    preload_all()
    print('Ready')
    server = ThreadedHTTPServer(('0.0.0.0', port), Handler)
    print(f'Serving on http://localhost:{port}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down')
        server.server_close()
