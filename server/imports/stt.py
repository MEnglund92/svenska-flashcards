import io, os, struct, wave

BASE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', 'tts-models'))

_MODEL_DIR = os.environ.get('WHISPER_MODEL_DIR', '')
if not _MODEL_DIR or not os.path.isdir(_MODEL_DIR):
    here = os.path.dirname(os.path.abspath(__file__))
    for cand in (os.path.join(here, '..', '..', '..', 'models', 'whisper'),
                 os.path.join(here, '..', '..', 'models', 'whisper'),
                 os.path.join(here, '..', 'models', 'whisper')):
        if os.path.isdir(cand):
            _MODEL_DIR = os.path.normpath(cand)
            break

_model = None
_model_error = None

def _load_model():
    global _model, _model_error
    if _model is not None or _model_error is not None:
        return
    try:
        from faster_whisper import WhisperModel
        _model = WhisperModel(_MODEL_DIR, device='cpu', compute_type='int8', cpu_threads=os.cpu_count() or 4)
    except Exception as ex:
        _model_error = str(ex)

def model_available():
    if _model is None and _model_error is None:
        _load_model()
    return _model is not None

def transcribe(wav_data, lang='sv', expected=''):
    _load_model()
    if _model is None:
        raise RuntimeError(_model_error or 'STT model not loaded')
    lang_code = 'sv' if lang.lower().startswith('sv') else 'en'
    prompt = expected.strip()
    kwargs = dict(
        language=lang_code,
        temperature=0.0,
        beam_size=1,
        condition_on_previous_text=False,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=300),
    )
    if prompt:
        kwargs['initial_prompt'] = prompt
    segments, info = _model.transcribe(io.BytesIO(wav_data), **kwargs)
    text = ' '.join(seg.text.strip() for seg in segments).strip()
    return text, lang_code

def wav_to_pcm16_16k(wav_data):
    with wave.open(io.BytesIO(wav_data), 'rb') as w:
        n = w.getnframes()
        raw = w.readframes(n)
        rate = w.getframerate()
        channels = w.getnchannels()
        width = w.getsampwidth()
    if rate == 16000 and channels == 1 and width == 2:
        return wav_data
    if rate == 16000 and channels == 1 and width == 1:
        import array
        a = array.array('B', raw)
        return b''.join(struct.pack('<h', (b - 128) << 8) for b in a)
    import array
    if width == 2:
        vals = array.array('h')
        vals.frombytes(raw)
    elif width == 4:
        vals = array.array('i')
        vals.frombytes(raw)
    elif width == 1:
        a = array.array('B', raw)
        vals = array.array('h', ((b - 128) << 8 for b in a))
    else:
        raise ValueError('unsupported sample width %d' % width)
    if channels > 1:
        vals = vals[::channels]
    if rate == 16000:
        pcm = vals
    else:
        n_out = int(len(vals) * 16000 / rate)
        pcm = array.array('h', (0,)) * n_out
        if n_out > 0 and len(vals) > 0:
            for i in range(n_out):
                src = int(i * rate / 16000)
                pcm[i] = vals[min(src, len(vals) - 1)]
    out = io.BytesIO()
    with wave.open(out, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(16000)
        w.writeframes(pcm.tobytes())
    return out.getvalue()