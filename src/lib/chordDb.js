import chordData from './chordData.js';
import { getPowerChordVoicings } from './powerChords.js';

// The dataset's `keys` array and each entry's own `key` field spell sharps
// as e.g. "C#", but the `chords` object's own property names spell them out
// ("Csharp") instead. Map the DB_KEYS spelling to the actual property name.
const CHORDS_OBJECT_KEY = { 'C#': 'Csharp', 'F#': 'Fsharp' };

export function getVoicings(dbKeyRoot, quality) {
  // The dataset has no power-chord ("5") suffix for any root -- computed
  // from music theory instead, see powerChords.js.
  if (quality === '5') return getPowerChordVoicings(dbKeyRoot);
  const objectKey = CHORDS_OBJECT_KEY[dbKeyRoot] ?? dbKeyRoot;
  const entries = chordData.chords[objectKey];
  if (!entries) return [];
  const entry = entries.find(e => e.suffix === quality);
  return entry ? entry.positions : [];
}

export function pickEasiestVoicing(positions) {
  if (!positions || positions.length === 0) return null;
  // Fret position dominates real-world difficulty -- a low barre chord
  // (e.g. Bm at fret 1) is what guitarists actually reach for, not a
  // barre-free voicing stretched up at fret 9+. Sorting barre-free first
  // picked exactly that high, awkward voicing over the standard low one.
  return [...positions].sort((a, b) =>
    a.baseFret !== b.baseFret
      ? a.baseFret - b.baseFret
      : a.barres.length - b.barres.length
  )[0];
}
