"""imports/capture.py - server-side microphone capture via sounddevice.

Fallback path for STT when the renderer cannot get mic access (e.g. WebView2
permission prompts). Captures N seconds from the default input device and
returns 16 kHz mono WAV bytes ready for the whisper pipeline.
"""
import io, threading, wave

_lock = threading.Lock()

def available():
    try:
        import sounddevice as sd
        return True
    except Exception:
        return False

def capture_wav(seconds=4.0, sample_rate=16000):
    import sounddevice as sd
    frames = int(seconds * sample_rate)
    with _lock:
        data = sd.rec(frames, samplerate=sample_rate, channels=1, dtype='int16')
        sd.wait()
    pcm = data.flatten()
    out = io.BytesIO()
    with wave.open(out, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        w.writeframes(pcm.tobytes())
    return out.getvalue()
