import io, os, wave, piper

ENV_BASE = os.environ.get('TTS_MODELS_DIR', '')
if ENV_BASE and os.path.isdir(ENV_BASE):
    BASE = ENV_BASE
else:
    here = os.path.dirname(os.path.abspath(__file__))
    BASE = ''
    for cand in (os.path.join(here, '..', '..', '..', 'tts-models'),
                 os.path.join(here, '..', '..', 'tts-models')):
        if os.path.isdir(cand):
            BASE = os.path.normpath(cand)
            break

VOICE_CONFIGS = {
    'en-US': {
        'model': os.path.join(BASE, 'en_US-lessac-medium.onnx'),
        'config': os.path.join(BASE, 'en_US-lessac-medium.onnx.json'),
    },
    'sv-SE': {
        'model': os.path.join(BASE, 'sv_SE-nst-medium.onnx'),
        'config': os.path.join(BASE, 'sv_SE-nst-medium.onnx.json'),
    },
}

_voices = {}

def preload_all():
    for cfg in VOICE_CONFIGS.values():
        key = cfg['model']
        if key not in _voices:
            _voices[key] = piper.PiperVoice.load(cfg['model'], config_path=cfg['config'])

def _load_voice(lang):
    cfg = VOICE_CONFIGS.get(lang)
    if cfg is None:
        cfg = VOICE_CONFIGS['en-US']
    key = cfg['model']
    if key not in _voices:
        _voices[key] = piper.PiperVoice.load(cfg['model'], config_path=cfg['config'])
    return _voices[key]

def synthesize(text, lang='en-US'):
    voice = _load_voice(lang)
    chunks = list(voice.synthesize(text))
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as wav:
        wav.setnchannels(chunks[0].sample_channels)
        wav.setsampwidth(chunks[0].sample_width)
        wav.setframerate(chunks[0].sample_rate)
        for chunk in chunks:
            wav.writeframes(chunk.audio_int16_bytes)
    return buf.getvalue()
