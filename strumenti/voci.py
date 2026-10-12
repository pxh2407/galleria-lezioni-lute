# Registra con le voci naturali (edge-tts) le frasi dell'"Orario raccontato".
# Uso: python strumenti/voci.py frasi.json      (frasi.json lo prepara strumenti/frasi.js)
# - le frasi già registrate non si rifanno (il nome del file cambia solo se cambia la frase o la voce);
# - le registrazioni che non servono più si cancellano;
# - audio/elenco.json dice alla pagina quali frasi sono pronte e quando la guida pronuncia ogni parola
#   (serve a muovere la bocca solo mentre parla).
import asyncio, json, os, sys
import edge_tts

CARTELLA = 'audio'
ELENCO = os.path.join(CARTELLA, 'elenco.json')


async def registra(f, percorso):
    opz = dict(voice=f['voce'], rate=f['velocita'], pitch=f['tono'])
    try:
        com = edge_tts.Communicate(f['testo'], boundary='WordBoundary', **opz)
    except TypeError:   # versioni vecchie di edge-tts: le parole arrivano già senza chiederle
        com = edge_tts.Communicate(f['testo'], **opz)
    parole, audio = [], bytearray()
    async for c in com.stream():
        if c['type'] == 'audio':
            audio.extend(c['data'])
        elif c['type'] == 'WordBoundary':
            inizio = c['offset'] / 10000   # da decimi di microsecondo a millisecondi
            parole.append([round(inizio), round(inizio + c['duration'] / 10000)])
    if len(audio) < 2000:
        raise RuntimeError('registrazione vuota')
    with open(percorso, 'wb') as out:
        out.write(audio)
    return parole


async def main():
    frasi = json.load(open(sys.argv[1], encoding='utf-8'))
    os.makedirs(CARTELLA, exist_ok=True)
    try:
        vecchio = json.load(open(ELENCO, encoding='utf-8'))
    except Exception:
        vecchio = {}
    elenco, nuove, errori = {}, 0, 0
    for f in frasi:
        percorso = os.path.join(CARTELLA, f['file'])
        if os.path.exists(percorso) and f['file'] in vecchio:
            elenco[f['file']] = vecchio[f['file']]
            continue
        for prova in range(5):
            try:
                elenco[f['file']] = await registra(f, percorso)
                nuove += 1
                break
            except Exception as e:   # il servizio ogni tanto rifiuta (403): si riprova con pause crescenti
                print(f'  riprovo ({prova + 1}) {f["file"]}: {e}', flush=True)
                await asyncio.sleep(3 * (prova + 1) ** 2)
        else:
            errori += 1   # questa frase la dirà la voce del telefono
    for nome in os.listdir(CARTELLA):
        if nome.endswith('.mp3') and nome not in elenco:
            os.remove(os.path.join(CARTELLA, nome))
    with open(ELENCO, 'w', encoding='utf-8', newline='\n') as out:
        json.dump(elenco, out, separators=(',', ':'))
    # mai uscire con errore: GitHub manderebbe email di allarme; le frasi mancanti si riprovano al giro dopo
    print(f'Frasi: {len(frasi)} · registrate ora: {nuove} · già pronte: {len(elenco) - nuove} · non riuscite: {errori}')


asyncio.run(main())
