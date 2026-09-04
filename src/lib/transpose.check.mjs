import assert from 'node:assert/strict';
import { resolveFreeChord, resolveCapoAtFret, resolveCapoSuggestion } from './transpose.js';

// Free mode: G up 2 semitones -> A major, no capo.
const free = resolveFreeChord({ root: 'G', quality: 'major' }, 2);
assert.equal(free.displayRoot, 'A');
assert.equal(free.soundingRoot, 'A');
assert.equal(free.capoFret, 0);

// Capo mode forced to fret 2: targeting A major (G shifted +2) resolves
// to a G-major shape (barre-free), sounding as A.
const [atCapo2] = resolveCapoAtFret([{ root: 'G', quality: 'major' }], 2, 2);
assert.equal(atCapo2.displayRoot, 'G');
assert.equal(atCapo2.soundingRoot, 'A');
assert.equal(atCapo2.voicing.barres.length, 0);

// A progression that's already all open shapes at shift 0 should suggest capo 0.
const suggestion = resolveCapoSuggestion(
  [{ root: 'G', quality: 'major' }, { root: 'C', quality: 'major' }, { root: 'D', quality: 'major' }],
  0
);
assert.equal(suggestion.capoFret, 0);
assert.equal(suggestion.resolved.length, 3);

// Unsupported quality resolves to null, not a guess.
const unsupported = resolveFreeChord({ root: 'C', quality: 'not-a-real-quality' }, 0);
assert.equal(unsupported, null);

// Slash chord: C/G resolves with the bass note applied to the voicing.
const cOverG = resolveFreeChord({ root: 'C', quality: 'major', bass: 'G' }, 0);
assert.equal(cOverG.bass, 'G');
assert.deepEqual(cOverG.voicing.frets, [3, 3, 2, 0, 1, 0]);

// Slash bass transposes along with the chord: C/G up 2 semitones -> D/A.
const dOverA = resolveFreeChord({ root: 'C', quality: 'major', bass: 'G' }, 2);
assert.equal(dOverA.displayRoot, 'D');
assert.equal(dOverA.bass, 'A');

// A chord with no bass keeps bass === null (no accidental slash label).
assert.equal(free.bass, null);

// C/B: B isn't reachable by adding a note to the muted low E string, but
// retargeting the A string (root C, doubled elsewhere) down to fret 2
// gives the standard x-2-2-0-1-0 fingering.
const cOverB = resolveFreeChord({ root: 'C', quality: 'major', bass: 'B' }, 0);
assert.equal(cOverB.bass, 'B');
assert.deepEqual(cOverB.voicing.frets, [-1, 2, 2, 0, 1, 0]);

// A chord whose root would vanish entirely if its lowest string were
// retargeted, and which has no muted string to add to instead, falls
// back honestly rather than dropping the root: bass stays null.
const noEscape = resolveFreeChord({ root: 'F', quality: 'major', bass: 'D' }, 0);
assert.equal(noEscape.bass, null);

console.log('transpose.js: all checks passed');
