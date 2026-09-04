const OPEN_STRING_SEMITONE = [4, 9, 2, 7, 11, 4]; // low E, A, D, G, B, high E
const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];

// Slash chords ("C/G") are realized the way guitarists actually play them:
// repurpose a string the chord shape already leaves muted for the bass
// note, without touching any string the shape is using. Only accepted
// within the shape's existing hand position (open, or baseFret..baseFret+3
// -- exactly the window ChordDiagram can render); otherwise the bass note
// would need a shape of its own, so the plain voicing is returned
// unchanged rather than drawing something unplayable or off-diagram.
export function applyBassNote(voicing, bassSemitone) {
  const { frets, baseFret } = voicing;

  for (const stringIndex of [0, 1]) {
    if (frets[stringIndex] !== -1) continue; // only repurpose an already-muted string

    const absoluteFret = ((bassSemitone - OPEN_STRING_SEMITONE[stringIndex]) % 12 + 12) % 12;
    const viable = absoluteFret === 0 || (absoluteFret >= baseFret && absoluteFret <= baseFret + 3);
    if (!viable) continue;

    const relativeFret = absoluteFret === 0 ? 0 : absoluteFret - baseFret + 1;
    const newFrets = [...frets];
    const newFingers = [...voicing.fingers];
    newFrets[stringIndex] = relativeFret;
    newFingers[stringIndex] = absoluteFret === 0 ? 0 : 4;

    return {
      ...voicing,
      frets: newFrets,
      fingers: newFingers,
      midi: [OPEN_STRING_MIDI[stringIndex] + absoluteFret, ...voicing.midi],
    };
  }

  return voicing;
}
