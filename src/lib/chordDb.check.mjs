import assert from 'node:assert/strict';
import { getVoicings, pickEasiestVoicing } from './chordDb.js';

const cMajor = getVoicings('C', 'major');
assert.ok(cMajor.length > 0);
const cEasiest = pickEasiestVoicing(cMajor);
assert.deepEqual(cEasiest.frets, [-1, 3, 2, 0, 1, 0]);
assert.deepEqual(cEasiest.barres, []);

const fMajor = getVoicings('F', 'major');
const fEasiest = pickEasiestVoicing(fMajor);
assert.ok(fEasiest.barres.length > 0, 'F major has no barre-free voicing in this dataset');

assert.deepEqual(getVoicings('C', 'not-a-real-quality'), []);
assert.deepEqual(getVoicings('NotAKey', 'major'), []);
assert.equal(pickEasiestVoicing([]), null);

console.log('chordDb.js: all checks passed');
