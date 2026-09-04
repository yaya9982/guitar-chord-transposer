const OPEN_STRING_SEMITONE = [4, 9, 2, 7, 11, 4]; // low E, A, D, G, B, high E
const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];

// Only accept a placement within the shape's existing hand position (open,
// or baseFret..baseFret+3 -- exactly ChordDiagram's renderable window).
function fretFor(stringIndex, targetSemitone, baseFret) {
  const absoluteFret = ((targetSemitone - OPEN_STRING_SEMITONE[stringIndex]) % 12 + 12) % 12;
  const viable = absoluteFret === 0 || (absoluteFret >= baseFret && absoluteFret <= baseFret + 3);
  return viable ? absoluteFret : null;
}

function withFret(voicing, stringIndex, absoluteFret) {
  const relativeFret = absoluteFret === 0 ? 0 : absoluteFret - voicing.baseFret + 1;
  const frets = [...voicing.frets];
  const fingers = [...voicing.fingers];
  frets[stringIndex] = relativeFret;
  fingers[stringIndex] = absoluteFret === 0 ? 0 : 4;
  return { frets, fingers, newMidi: OPEN_STRING_MIDI[stringIndex] + absoluteFret };
}

// Slash chords ("C/G", "C/B") are realized the way guitarists actually
// play them, in order of preference:
//
// 1. Add the bass note on a string the shape already leaves muted (e.g.
//    C/G: C major's open shape mutes the low E string, and G lands on its
//    3rd fret).
// 2. Retarget the shape's current lowest-sounding string to the bass note
//    instead (e.g. C/B: changing the A string from fret 3 (C, the root --
//    doubled on the B string, so nothing is lost) to fret 2 (B) is the
//    standard C/B fingering, x-2-2-0-1-0). Only attempted on a barre-free
//    shape, and only when the root survives on another string.
//
// Either way, only within the shape's existing hand position; otherwise a
// slash chord would need a shape of its own; falls back to the plain
// voicing unchanged rather than something unplayable or off-diagram.
export function applyBassNote(voicing, bassSemitone, rootSemitone) {
  const { frets, baseFret, barres, midi } = voicing;

  for (const stringIndex of [0, 1]) {
    if (frets[stringIndex] !== -1) continue;
    const absoluteFret = fretFor(stringIndex, bassSemitone, baseFret);
    if (absoluteFret === null) continue;
    const { frets: newFrets, fingers: newFingers, newMidi } = withFret(voicing, stringIndex, absoluteFret);
    return { ...voicing, frets: newFrets, fingers: newFingers, midi: [newMidi, ...midi] };
  }

  if (barres.length === 0) {
    const lowestIndex = frets.findIndex(f => f !== -1);
    if (lowestIndex !== -1) {
      const rootSurvivesElsewhere = frets.some((f, i) => {
        if (i === lowestIndex || f === -1) return false;
        const absolute = f === 0 ? 0 : baseFret + f - 1;
        return (OPEN_STRING_SEMITONE[i] + absolute) % 12 === rootSemitone;
      });
      if (rootSurvivesElsewhere) {
        const absoluteFret = fretFor(lowestIndex, bassSemitone, baseFret);
        if (absoluteFret !== null) {
          const { frets: newFrets, fingers: newFingers, newMidi } = withFret(voicing, lowestIndex, absoluteFret);
          const newMidiArray = [...midi];
          newMidiArray[0] = newMidi;
          return { ...voicing, frets: newFrets, fingers: newFingers, midi: newMidiArray };
        }
      }
    }
  }

  return voicing;
}
