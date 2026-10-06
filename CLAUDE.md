# Galleria Lezioni LUTE (settimana 5–9 ottobre 2026)

- `index.html` — copia di `Desktop\Galleria.html` (app a file unico: Tailwind + icone Phosphor da CDN, dati delle lezioni nell'array `lessonsData`).
- Online: https://pxh2407.github.io/galleria-lezioni-lute/ — repo `pxh2407/galleria-lezioni-lute`, branch `main` (push: `git push`).
- `images/copertina.jpg` 1200×630 = anteprima del link (logo LUTE + titolo + date + numero lezioni + disegno dell'orario ricavato dai dati veri). Si rifà con `python crea_copertina.py` (se cambiano le lezioni, rifarla).
- 2026-10-06: corretto "Tutta la Settimana (30)" → (34): le lezioni nei dati sono 34 (8+8+9+6+3).
- Se l'utente cambia `Desktop\Galleria.html`, ricopiarla qui (rimettendo i meta og: in testa) e ripubblicare.
- 2026-10-06 correzioni per cellulare: scheda lezione con `m-auto` (prima con `items-center` usciva sopra lo schermo e la X spariva); pulsanti dei giorni in griglia a 2 colonne e aule a capo (prima scorrevano di lato, poco intuitivo); tabella con colonna dell'ora fissa e righe dei giorni corrette (il `flex` sul `<td colspan>` rompeva la riga); filtri nascosti in vista Tabella (lì non hanno effetto); foto di "Bigiotteria" sostituita (quella Unsplash non esiste più).
- NON mettere `og:url`: WhatsApp segue quell'indirizzo e riusa l'anteprima vuota memorizzata, ignorando i link nuovi (2026-10-06).
