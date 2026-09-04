const QUALITY_ALIASES = {
  '': 'major', 'maj': 'major', 'major': 'major',
  'm': 'minor', 'min': 'minor', 'minor': 'minor', '-': 'minor',
  '7': '7', '7sus4': '7sus4',
  'maj7': 'maj7', 'delta': 'maj7',
  'm7': 'm7', 'min7': 'm7', '-7': 'm7',
  'dim': 'dim', 'o': 'dim',
  'dim7': 'dim7',
  'm7b5': 'm7b5', 'm7-5': 'm7b5',
  'aug': 'aug', '+': 'aug',
  'sus2': 'sus2',
  'sus4': 'sus4', 'sus': 'sus4',
  '6': '6',
  'm6': 'm6', 'min6': 'm6',
  '9': '9',
  'm9': 'm9', 'min9': 'm9',
  'maj9': 'maj9',
  'add9': 'add9',
  'madd9': 'madd9',
  '11': '11',
  'maj11': 'maj11',
  'm11': 'm11',
  '13': '13',
  'maj13': 'maj13',
  'mmaj7': 'mmaj7',
  '69': '69',
  'm69': 'm69',
};

export const QUALITY_LABELS = {
  major: '', minor: 'm', '7': '7', '7sus4': '7sus4', maj7: 'maj7', m7: 'm7',
  dim: 'dim', dim7: 'dim7', m7b5: 'm7b5', aug: 'aug', sus2: 'sus2', sus4: 'sus4',
  '6': '6', m6: 'm6', '9': '9', m9: 'm9', maj9: 'maj9', add9: 'add9',
  madd9: 'madd9', '11': '11', maj11: 'maj11', m11: 'm11', '13': '13',
  maj13: 'maj13', mmaj7: 'mmaj7', '69': '69', m69: 'm69',
};

const CHORD_RE = /^([A-Ga-g][#b]?)([A-Za-z0-9+\-]*)(?:\/([A-Ga-g][#b]?))?$/;

export function parseChordSymbol(symbol) {
  const trimmed = symbol.trim();
  const match = CHORD_RE.exec(trimmed);
  if (!match) return null;
  const [, rawRoot, rawQuality, rawBass] = match;
  const quality = QUALITY_ALIASES[rawQuality.toLowerCase()];
  if (quality === undefined) return null;
  const root = rawRoot[0].toUpperCase() + rawRoot.slice(1);
  const bass = rawBass ? rawBass[0].toUpperCase() + rawBass.slice(1) : null;
  return { root, quality, bass, symbol: trimmed };
}

export function parseProgression(text) {
  return text
    .split(/[\s,]+/)
    .map(token => token.trim())
    .filter(Boolean)
    .map(token => ({ token, chord: parseChordSymbol(token) }));
}
