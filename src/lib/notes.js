const NOTE_TO_SEMITONE = {
  'C': 0, 'B#': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'F': 5, 'E#': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11,
};

export const DB_KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export function noteNameToSemitone(name) {
  const normalized = name[0].toUpperCase() + name.slice(1);
  const semitone = NOTE_TO_SEMITONE[normalized];
  if (semitone === undefined) throw new Error(`Unrecognized note name: ${name}`);
  return semitone;
}

export function transposeNote(root, semitoneShift) {
  const base = noteNameToSemitone(root);
  const index = ((base + semitoneShift) % 12 + 12) % 12;
  return DB_KEYS[index];
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}
