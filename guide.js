// Le cinque guide dell'"Orario raccontato" (avatar.html): una per giorno, disegnate in SVG.
// Ogni disegno ha la bocca (.bocca, mossa da avatar.html mentre la guida parla),
// gli occhi (.occhio, battono le ciglia) e la testa (.testa, dondola mentre parla).

const GUIDE = {
  'LUNEDÌ': {
    nome: 'Lucia', sesso: 'f', tono: 1.0,
    colore: '#2f7d4f', chiaro: '#e2f0e6',
    pelle: '#f3cdaa', ombra: '#dfae88', capelli: '#d9dde2', capelliOmbra: '#b4bbc4', sopracciglia: '#a3a9b1',
    stile: 'caschetto', occhiali: 'rettangolari', montatura: '#c79a2b',
    abito: '#f3eddf', abitoOmbra: '#d9cfb8', collo: 'foulard', accento: '#2f7d4f', labbra: '#a8474a', orecchini: '#d4af37'
  },
  'MARTEDÌ': {
    nome: 'Alfredo', sesso: 'm', tono: 0.9,
    colore: '#1d4e89', chiaro: '#e1eaf6',
    pelle: '#eabd98', ombra: '#d29f79', capelli: '#ececec', capelliOmbra: '#c9c9c9', sopracciglia: '#d6d6d6',
    stile: 'calvo', baffi: '#efefef',
    abito: '#1f3a5f', abitoOmbra: '#152a46', collo: 'papillon', accento: '#c0392b', labbra: '#8f4a40'
  },
  'MERCOLEDÌ': {
    nome: 'Elena', sesso: 'f', tono: 1.05,
    colore: '#7b2d6b', chiaro: '#f3e3ef',
    pelle: '#f6d4b6', ombra: '#e2b593', capelli: '#5b3a28', capelliOmbra: '#3c2519', sopracciglia: '#4a2f20',
    stile: 'chignon',
    abito: '#7b2d6b', abitoOmbra: '#5e2051', collo: 'perle', labbra: '#b0475e', orecchini: '#e9e4d8'
  },
  'GIOVEDÌ': {
    nome: 'Vittorio', sesso: 'm', tono: 0.85,
    colore: '#9b2c2c', chiaro: '#f6e2e0',
    pelle: '#dca582', ombra: '#c38865', capelli: '#b9b9b9', capelliOmbra: '#949494', sopracciglia: '#8a8a8a',
    stile: 'ricci', barba: '#b0b0b0', occhiali: 'tondi', montatura: '#3a3a3a',
    abito: '#9b2c2c', abitoOmbra: '#7a1f1f', collo: 'camicia', accento: '#dbe7f3', labbra: '#8f4a40'
  },
  'VENERDÌ': {
    nome: 'Anna', sesso: 'f', tono: 1.12,
    colore: '#b4530b', chiaro: '#fbe9d9',
    pelle: '#f2c8a2', ombra: '#dca984', capelli: '#a8492a', capelliOmbra: '#7e331c', sopracciglia: '#7e3a22',
    stile: 'mossi',
    abito: '#e8743b', abitoOmbra: '#c95f2b', collo: 'spilla', accento: '#fff3c4', labbra: '#bd3f4f', orecchini: '#d4af37'
  }
};

// Bocca: a = 0 chiusa (sorriso), a = 1 tutta aperta
function formaBocca(a) {
  const w = 13 - 2.5 * a, y = 143;
  return `M${(120 - w).toFixed(1)},${y} Q120,${(y + 3 - a).toFixed(1)} ${(120 + w).toFixed(1)},${y} ` +
         `Q120,${(y + 7 + 15 * a).toFixed(1)} ${(120 - w).toFixed(1)},${y} Z`;
}

let contaGuide = 0;

function disegnaGuida(giorno) {
  const g = GUIDE[giorno];
  const id = 'guida' + (++contaGuide);
  const p = [];   // pezzi del disegno, dal fondo verso il primo piano

  // ---------- capelli dietro la testa ----------
  if (g.stile === 'caschetto') {
    p.push(`<path d="M56,160 C48,92 70,42 120,40 C170,42 192,92 184,160 Q176,174 158,166 Q120,152 82,166 Q64,174 56,160 Z" fill="${g.capelli}"/>`);
  } else if (g.stile === 'chignon') {
    p.push(`<circle cx="120" cy="44" r="23" fill="${g.capelli}"/>`,
           `<path d="M104,52 Q120,60 136,52" stroke="${g.capelliOmbra}" stroke-width="3" fill="none"/>`,
           `<path d="M64,124 C58,80 80,50 120,48 C160,50 182,80 176,124 Z" fill="${g.capelli}"/>`);
  } else if (g.stile === 'ricci') {
    for (let k = 0; k <= 12; k++) {
      const ang = Math.PI * (0.92 + k * 1.16 / 12), r = 56;
      p.push(`<circle cx="${(120 + r * Math.cos(ang)).toFixed(1)}" cy="${(108 + r * Math.sin(ang)).toFixed(1)}" r="16" fill="${g.capelli}"/>`);
    }
  } else if (g.stile === 'mossi') {
    p.push(`<path d="M56,188 C38,154 50,122 52,98 C56,56 86,38 120,38 C154,38 184,56 188,98 C190,122 202,154 184,188 C176,200 160,196 156,184 L84,184 C80,196 64,200 56,188 Z" fill="${g.capelli}"/>`,
           `<path d="M60,150 C56,166 62,178 70,184 M180,150 C184,166 178,178 170,184" stroke="${g.capelliOmbra}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  }

  // ---------- busto ----------
  p.push(`<path d="M12,262 C16,222 52,200 92,194 L148,194 C188,200 224,222 228,262 Z" fill="${g.abito}"/>`);
  if (g.collo === 'perle') p.push(`<path d="M98,194 L120,224 L142,194 Z" fill="${g.ombra}"/>`);
  if (g.collo === 'papillon') p.push(`<path d="M102,194 L120,240 L138,194 Z" fill="#ffffff"/>`,
                                     `<path d="M100,194 L88,212 L102,218 L94,228 L118,262 M140,194 L152,212 L138,218 L146,228 L122,262" stroke="${g.abitoOmbra}" stroke-width="3" fill="none" stroke-linejoin="round"/>`);
  if (g.collo === 'camicia') p.push(`<path d="M100,194 L120,232 L140,194 Z" fill="${g.accento}"/>`,
                                    `<path d="M100,192 L120,210 L112,220 L96,200 Z M140,192 L120,210 L128,220 L144,200 Z" fill="#ffffff" stroke="#c9d6e3" stroke-width="1"/>`,
                                    `<path d="M98,196 L120,236 L142,196" stroke="${g.abitoOmbra}" stroke-width="5" fill="none" stroke-linejoin="round"/>`);
  if (g.collo === 'foulard') p.push(`<path d="M94,198 L110,250 M146,198 L130,250" stroke="${g.abitoOmbra}" stroke-width="3" fill="none"/>`);
  if (g.collo === 'spilla') p.push(`<path d="M100,194 Q120,214 140,194 Z" fill="${g.ombra}"/>`);

  // ---------- collo ----------
  p.push(`<path d="M103,146 L103,196 Q120,208 137,196 L137,146 Z" fill="${g.ombra}"/>`);

  // accessori al collo (sopra il collo)
  if (g.collo === 'foulard') {
    p.push(`<path d="M96,188 Q120,206 144,188 L148,200 Q120,222 92,200 Z" fill="${g.accento}"/>`,
           `<path d="M126,208 L118,236 L132,232 Z M132,208 L146,232 L152,222 Z" fill="${g.accento}"/>`,
           `<ellipse cx="129" cy="207" rx="8" ry="7" fill="${g.accento}" stroke="#ffffff" stroke-opacity=".35" stroke-width="1.5"/>`,
           `<path d="M100,200 Q120,214 140,200" stroke="#ffffff" stroke-opacity=".35" stroke-width="2" fill="none"/>`);
  }
  if (g.collo === 'papillon') {
    p.push(`<path d="M104,192 L120,200 L104,208 Z M136,192 L120,200 L136,208 Z" fill="${g.accento}"/>`,
           `<circle cx="120" cy="200" r="4" fill="${g.accento}" stroke="#7d2219" stroke-width="1.2"/>`);
  }
  if (g.collo === 'perle') {
    for (let k = 0; k <= 12; k++) {
      const t = k / 12, x = (1 - t) ** 2 * 101 + 2 * (1 - t) * t * 120 + t * t * 139, y = (1 - t) ** 2 * 192 + 2 * (1 - t) * t * 216 + t * t * 192;
      p.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.3" fill="#fbf8f1" stroke="#d6ccb9" stroke-width=".8"/>`);
    }
  }
  if (g.collo === 'spilla') {
    for (let k = 0; k < 5; k++) {
      const ang = k * 2 * Math.PI / 5 - Math.PI / 2;
      p.push(`<circle cx="${(84 + 7 * Math.cos(ang)).toFixed(1)}" cy="${(222 + 7 * Math.sin(ang)).toFixed(1)}" r="5.5" fill="${g.accento}" stroke="#e0b84a" stroke-width="1"/>`);
    }
    p.push(`<circle cx="84" cy="222" r="4" fill="#e0a31a"/>`);
  }

  // ---------- testa (dondola mentre parla) ----------
  const t = [];
  // capelli ai lati della testa calva (dietro le orecchie)
  if (g.stile === 'calvo') {
    t.push(`<path d="M76,128 C58,122 54,94 70,76 C74,90 80,100 86,106 Z" fill="${g.capelli}" stroke="${g.capelliOmbra}" stroke-width="1.2"/>`,
           `<path d="M164,128 C182,122 186,94 170,76 C166,90 160,100 154,106 Z" fill="${g.capelli}" stroke="${g.capelliOmbra}" stroke-width="1.2"/>`);
  }
  // orecchie
  t.push(`<ellipse cx="70" cy="116" rx="9" ry="13" fill="${g.pelle}"/>`, `<ellipse cx="170" cy="116" rx="9" ry="13" fill="${g.pelle}"/>`,
         `<path d="M72,110 Q66,116 72,123 M168,110 Q174,116 168,123" stroke="${g.ombra}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
  if (g.orecchini) t.push(`<circle cx="70" cy="133" r="4" fill="${g.orecchini}"/>`, `<circle cx="170" cy="133" r="4" fill="${g.orecchini}"/>`);
  // viso
  t.push(`<ellipse cx="120" cy="110" rx="50" ry="58" fill="${g.pelle}"/>`);
  // rughe leggere (sono guide di una certa esperienza!)
  t.push(`<path d="M84,108 l-7,-3 M84,113 l-7,1 M156,108 l7,-3 M156,113 l7,1 M106,129 Q100,137 104,147 M134,129 Q140,137 136,147" stroke="${g.ombra}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>`);
  if (g.stile === 'calvo') t.push(`<path d="M100,76 Q120,71 140,76 M104,83 Q120,79 136,83" stroke="${g.ombra}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>`);
  // barba (prima della bocca, così la bocca resta sopra)
  if (g.barba) {
    t.push(`<path d="M72,114 C70,166 98,186 120,186 C142,186 170,166 168,114 C162,134 152,146 140,149 C132,141 108,141 100,149 C88,146 78,134 72,114 Z" fill="${g.barba}"/>`,
           `<path d="M88,156 q4,6 8,4 M146,154 q-4,6 -8,4 M112,172 q4,4 8,0 q4,4 8,0" stroke="#999" stroke-width="1.5" fill="none" stroke-linecap="round"/>`);
  }
  // capelli davanti
  if (g.stile === 'caschetto') {
    t.push(`<path d="M68,110 C64,62 94,44 122,44 C152,44 178,64 172,110 C168,92 158,80 146,74 C128,86 104,84 86,74 C78,84 72,96 68,110 Z" fill="${g.capelli}"/>`,
           `<path d="M96,60 Q120,70 146,74 M84,80 Q100,70 118,66" stroke="${g.capelliOmbra}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
  } else if (g.stile === 'calvo') {
    t.push(`<ellipse cx="102" cy="66" rx="15" ry="6" fill="#ffffff" opacity=".35" transform="rotate(-18 102 66)"/>`);
  } else if (g.stile === 'chignon') {
    t.push(`<path d="M68,112 C62,62 92,48 120,48 C148,48 178,62 172,112 C168,88 156,70 134,66 Q126,64 120,72 Q114,64 106,66 C84,70 72,88 68,112 Z" fill="${g.capelli}"/>`,
           `<path d="M120,52 L120,70 M100,58 Q86,70 78,92 M140,58 Q154,70 162,92" stroke="${g.capelliOmbra}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
  } else if (g.stile === 'ricci') {
    for (let k = 0; k <= 10; k++) {
      const ang = Math.PI * (1.08 + k * 0.84 / 10), r = 50;
      t.push(`<circle cx="${(120 + r * Math.cos(ang)).toFixed(1)}" cy="${(112 + r * Math.sin(ang)).toFixed(1)}" r="11" fill="${g.capelli}" stroke="${g.capelliOmbra}" stroke-width="1.5"/>`);
    }
  } else if (g.stile === 'mossi') {
    t.push(`<path d="M66,114 C60,66 90,42 124,44 C156,46 180,68 174,114 C172,96 164,84 152,78 C140,90 118,92 102,84 C92,80 88,76 86,72 C76,84 70,98 66,114 Z" fill="${g.capelli}"/>`,
           `<path d="M90,64 Q112,78 150,76 M78,90 Q84,76 96,70" stroke="${g.capelliOmbra}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
  }
  // sopracciglia
  const sw = g.stile === 'calvo' ? 5 : 3.5;
  t.push(`<path d="M89,97 Q100,91 111,96 M129,96 Q140,91 151,97" stroke="${g.sopracciglia}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`);
  // occhi (battono le ciglia)
  for (const cx of [100, 140]) {
    t.push(`<g class="occhio"><ellipse cx="${cx}" cy="110" rx="5" ry="6" fill="#3a2a20"/><circle cx="${cx + 1.6}" cy="107.8" r="1.7" fill="#ffffff"/></g>`);
  }
  // occhiali
  if (g.occhiali === 'rettangolari') {
    t.push(`<g fill="#ffffff" fill-opacity=".14" stroke="${g.montatura}" stroke-width="2.6">` +
           `<rect x="85" y="101" width="30" height="19" rx="7"/><rect x="125" y="101" width="30" height="19" rx="7"/></g>`,
           `<path d="M115,108 Q120,105 125,108 M85,107 L72,104 M155,107 L168,104" stroke="${g.montatura}" stroke-width="2.4" fill="none"/>`);
  } else if (g.occhiali === 'tondi') {
    t.push(`<g fill="#ffffff" fill-opacity=".14" stroke="${g.montatura}" stroke-width="2.8"><circle cx="100" cy="110" r="14"/><circle cx="140" cy="110" r="14"/></g>`,
           `<path d="M114,108 Q120,103 126,108 M86,107 L72,104 M154,107 L168,104" stroke="${g.montatura}" stroke-width="2.6" fill="none"/>`);
  }
  // naso e guance
  t.push(`<path d="M120,113 Q114,126 118,130 Q121,132 125,129" stroke="${g.ombra}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
         `<ellipse cx="91" cy="130" rx="9" ry="5" fill="#ee8a86" opacity=".32"/><ellipse cx="149" cy="130" rx="9" ry="5" fill="#ee8a86" opacity=".32"/>`);
  // bocca (animata)
  t.push(`<path class="bocca" d="${formaBocca(0)}" fill="${g.labbra}"/>`);
  // baffi (sopra la bocca)
  if (g.baffi) t.push(`<path d="M100,140 C107,131 115,134 120,137 C125,134 133,131 140,140 C133,144 125,143 120,140 C115,143 107,144 100,140 Z" fill="${g.baffi}" stroke="#cfcfcf" stroke-width="1"/>`);
  if (g.barba) t.push(`<path d="M100,141 C108,134 116,136 120,138 C124,136 132,134 140,141 C132,145 124,143 120,141 C116,143 108,145 100,141 Z" fill="#9d9d9d"/>`);

  p.push(`<g class="testa">${t.join('')}</g>`);

  return `<svg class="guida-svg" viewBox="0 0 240 260" role="img" aria-label="${g.nome}, la guida del ${giorno.toLowerCase()}">` +
    `<defs><clipPath id="${id}"><circle cx="120" cy="130" r="120"/></clipPath></defs>` +
    `<circle cx="120" cy="130" r="120" fill="${g.chiaro}"/>` +
    `<g clip-path="url(#${id})">${p.join('')}</g></svg>`;
}
