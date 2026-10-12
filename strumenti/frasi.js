// Elenca tutte le frasi che le guide dell'"Orario raccontato" diranno con l'orario pubblicato,
// per registrarle con le voci naturali (strumenti/voci.py). Usa racconto.js, lo stesso file della pagina,
// quindi le frasi registrate sono identiche a quelle che la pagina cerca.
// Uso: node strumenti/frasi.js > frasi.json
const fs = require('fs'), path = require('path');
const radice = path.join(__dirname, '..');
const { GUIDE } = require('../guide.js');
const R = require('../racconto.js');

const leggi = f => JSON.parse(fs.readFileSync(path.join(radice, f), 'utf8'));
const settimana = leggi('dati/settimana.json');
let corsi = [];
try { corsi = leggi('dati/corsi.json'); } catch (e) {}

const frasi = new Map();
for (const giorno of R.GIORNI) {
  if (!settimana.lezioni.some(l => l.day === giorno)) continue;
  for (const saluto of R.SALUTI) {
    for (const b of R.battute(settimana, corsi, giorno, saluto)) {
      const file = R.fileAudio(giorno, b.parlato), v = GUIDE[giorno].voce;
      frasi.set(file, { file, voce: v.nome, velocita: v.velocita, tono: v.tono, testo: b.parlato });
    }
  }
}
process.stdout.write(JSON.stringify([...frasi.values()], null, 1));
