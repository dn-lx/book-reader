"""Prepare optional Google Neural2 audio using local Google Cloud credentials.
The default command is a local preflight. --generate sends text to Google and
incurs the project's Text-to-Speech charges. Never run this in a client app.
"""
import argparse, base64, hashlib, json, subprocess, time, urllib.request
from pathlib import Path


def duration(path):
    return float(subprocess.check_output(['ffprobe', '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)], text=True).strip())


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--book', type=Path, required=True)
    p.add_argument('--project', required=True)
    p.add_argument('--voice', default='en-GB-Neural2-A')
    p.add_argument('--rate', type=float, default=.93)
    p.add_argument('--generate', action='store_true')
    a = p.parse_args()
    b = json.loads(a.book.read_text())
    passages = [s for c in b['chapters'] for s in c['segments']]
    if not passages or any(len(s['text'].encode()) > 4900 for s in passages):
        p.error('Each passage must contain 1–4900 UTF-8 bytes. Split longer passages first.')
    if not .25 <= a.rate <= 4:
        p.error('Speaking rate must be between .25 and 4.')
    print(f"{len(passages)} requests; {sum(len(s['text']) for s in passages):,} characters. Voice {a.voice}, rate {a.rate}.")
    if not a.generate:
        print('Preflight only. Check Google pricing and project quotas before adding --generate.')
        return
    target = a.book.parent / 'google'
    cache = target / 'chunks'
    cache.mkdir(parents=True, exist_ok=True)
    chapters = []
    token = ''; refreshed = 0
    for i, chapter in enumerate(b['chapters']):
        files = []; segments = []; cursor = 0
        for s in chapter['segments']:
            payload = {'input': {'text': s['text']}, 'voice': {'languageCode': 'en-GB', 'name': a.voice}, 'audioConfig': {'audioEncoding': 'LINEAR16', 'speakingRate': a.rate}}
            key = hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()
            wav = cache / (key + '.wav')
            if not wav.exists():
                if time.time() - refreshed > 1800:
                    token = subprocess.check_output(['gcloud', 'auth', 'application-default', 'print-access-token'], text=True).strip(); refreshed = time.time()
                req = urllib.request.Request('https://texttospeech.googleapis.com/v1/text:synthesize', data=json.dumps(payload).encode(), headers={'Authorization': 'Bearer ' + token, 'x-goog-user-project': a.project, 'Content-Type': 'application/json'})
                with urllib.request.urlopen(req, timeout=60) as r:
                    result = json.load(r)
                wav.write_bytes(base64.b64decode(result['audioContent']))
            length = duration(wav)
            segments.append({**s, 'start': round(cursor, 3), 'end': round(cursor + length, 3)})
            cursor += length; files.append(wav)
        concat = target / 'concat.txt'
        concat.write_text(''.join("file 'chunks/" + x.name + "'\n" for x in files))
        audio = target / f'{i+1:02}.mp3'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(concat), '-c:a', 'libmp3lame', '-b:a', '48k', str(audio)], check=True)
        length = duration(audio); scale = length / cursor
        for s in segments:
            s['start'] = round(s['start'] * scale, 3); s['end'] = round(s['end'] * scale, 3)
        prefix = f'/books/{b["id"]}/google/'
        chapters.append({**chapter, 'audio': prefix + audio.name, 'file': audio.name, 'duration': length, 'segments': segments})
        print('Prepared chapter', i+1, 'of', len(b['chapters']), flush=True)
    result = {**b, 'id': b['id'] + '-google', 'narration': 'google', 'voice': 'Google Neural2 · British English · female', 'chapters': chapters, 'duration': sum(c['duration'] for c in chapters)}
    result.pop('alternateNarration', None)
    (target / 'book.json').write_text(json.dumps(result, ensure_ascii=False))
    b['alternateNarration'] = f'/books/{b["id"]}/google/book.json'
    a.book.write_text(json.dumps(b, ensure_ascii=False))
    print('Google narration is ready. Rebuild the private website. Never commit generated media to a public repository.')


if __name__ == '__main__':
    main()
