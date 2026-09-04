import { noteNameToSemitone } from './notes.js';

// The dataset has no "5" (power chord) suffix for any root, so these
// voicings are computed from music theory instead of looked up: a power
// chord is just root + perfect fifth, played as one of guitar's two
// standard movable two-string shapes.
const OPEN_STRING_SEMITONE = [4, 9, 2, 7, 11, 4]; // low E, A, D, G, B, high E
const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];

function shape(rootString, fifthString, rootSemitone) {
  const rootFret = ((rootSemitone - OPEN_STRING_SEMITONE[rootString]) % 12 + 12) % 12;
  const fifthFret = rootFret + 2;
  const baseFret = rootFret === 0 ? 1 : rootFret;
  const relative = f => (f === 0 ? 0 : f - baseFret + 1);

  const frets = [-1, -1, -1, -1, -1, -1];
  const fingers = [0, 0, 0, 0, 0, 0];
  frets[rootString] = relative(rootFret);
  frets[fifthString] = relative(fifthFret);
  fingers[rootString] = rootFret === 0 ? 0 : 1;
  fingers[fifthString] = 3;

  return {
    frets,
    fingers,
    baseFret,
    barres: [],
    midi: [OPEN_STRING_MIDI[rootString] + rootFret, OPEN_STRING_MIDI[fifthString] + fifthFret],
  };
}

export function getPowerChordVoicings(dbKeyRoot) {
  const rootSemitone = noteNameToSemitone(dbKeyRoot);
  return [
    shape(1, 2, rootSemitone), // A-shape: root on the A string
    shape(0, 1, rootSemitone), // E-shape: root on the low E string
  ];
}
