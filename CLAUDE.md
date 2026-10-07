# Galleria Lezioni LUTE (orario settimanale)

Online: https://pxh2407.github.io/galleria-lezioni-lute/ — repo `pxh2407/galleria-lezioni-lute`, branch `main` (push: `git push`).

## Come è fatta (dal 2026-10-07): front-end + back-end
- **Front-end (soci)** `index.html`: solo visualizzazione. Legge `dati/settimana.json` (`caricaSettimana()`), calcola date dei giorni, periodo, pulsanti dei giorni, `timeSlot`, immagine `images/corsi/<cod>.jpg?v=<versioneImmagini>`. Nessun dato scritto a mano nella pagina (date in `.w-periodo` / `.w-aggiornato`).
- **`dati/settimana.json`**: `{dal, al, aggiornato, pubblicato, versioneImmagini, lezioni:[{id, day, startTime, endTime ("Termine" ammesso), aula, title, teacher, category, categoryColor (classe Tailwind), cod, description}]}`.
- **`dati/corsi.json`**: catalogo dei 61 corsi (cod, nome, doc, area) preso da `CLAUDE\CORSI LUTE\index.html`; **`images/corsi/<cod>.jpg`** = le 61 immagini di CORSI LUTE (scelta dell'utente: stile uniforme, NON le Gemini). Se si aggiunge un corso al catalogo: aggiungere voce + immagine qui.
- **Back-end (solo PC di Filippo)** `gestione/Gestione Orario.html` (+ `gestione/chiave.js` con il token GitHub) — cartella in `.gitignore`, MAI online. Icona sul Desktop "Gestione Orario LUTE". Funzioni: settimana (lunedì → venerdì automatico, "Passa alla settimana successiva"), aggiornato al, elenco per giorno con Modifica/Sostituisci, Elimina, Aggiungi (corso dal catalogo → titolo, docente, categoria e immagine automatici), avviso sovrapposizioni stessa aula, bozza automatica in localStorage, **Pubblica** = via API GitHub: `images/copertina-<dal>.jpg` (disegnata con canvas, stesso stile di `crea_copertina.py`), `dati/settimana.json`, meta og:/title di `index.html`; poi attende che il sito sia aggiornato e dà il link `?dal-<g>-<mese>` per WhatsApp.
- Prova in locale: server `galleria-lezioni` in `CLAUDE\.claude\launch.json` (porta 8795); il back-end si apre anche da file://.
- 2026-10-07: primo "Pubblica" fatto dall'utente → tutto OK (settimana.json, copertina-2026-10-05.jpg, meta og:). A me il pulsante Pubblica è negato dal sistema: lo preme l'utente.
- ⚠ Il programma scrive direttamente su GitHub: prima di lavorare in questa cartella fare SEMPRE `git pull`.

## Regole
- NON mettere `og:url`: WhatsApp segue quell'indirizzo e riusa l'anteprima vuota memorizzata (2026-10-06).
- Ogni settimana un link nuovo (`?dal-12-ottobre`…): WhatsApp memorizza le anteprime per indirizzo.
- Se si sostituisce un'immagine con lo stesso nome: aumentare `versioneImmagini` nel JSON (cache dei telefoni).
- Mostrare ai soci solo ciò che è nel foglio ufficiale: "Istruttore LUTE", "Relatori Ospiti LUTE", "Aula Magna" e le descrizioni erano state aggiunte da chi fece la prima app (per ora restano, decisione rimandata).

## Storia
- 2026-10-06: pubblicata (copia di `Desktop\Galleria.html`); copertina `crea_copertina.py` (ora superato dal back-end); conteggio 30→34; correzioni cellulare (scheda `m-auto`, giorni in griglia 2 colonne, tabella compatta `#tableMobile` sul telefono); Foglio A4 (solo PC, html2canvas, adattamento `--k` per stare in una pagina); 12 lezioni di 2 ore corrette dal foglio ufficiale (immagine A4 da Excel).
- 2026-10-07: foto senza velo e scritte scure; immagini intere 16:9 con giorno/orario/aula sotto; immagini Gemini provate e poi sostituite da quelle di CORSI LUTE (020 Cineforum per "Vi racconto un film", 215 balli di gruppo, 210 balli di coppia, 800A per Medicina Lutelisir, 640 provvisoria per "Noi siamo i tempi"); separazione front-end / back-end.
