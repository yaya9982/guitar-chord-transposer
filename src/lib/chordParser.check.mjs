import assert from 'node:assert/strict';
import { parseChordSymbol, parseProgression } from './chordParser.js';

assert.deepEqual(parseChordSymbol('G'), { root: 'G', quality: 'major', bass: null, symbol: 'G' });
assert.deepEqual(parseChordSymbol('Am7'), { root: 'A', quality: 'm7', bass: null, symbol: 'Am7' });
assert.deepEqual(parseChordSymbol('F#dim'), { root: 'F#', quality: 'dim', bass: null, symbol: 'F#dim' });
assert.deepEqual(parseChordSymbol('G/B'), { root: 'G', quality: 'major', bass: 'B', symbol: 'G/B' });
assert.deepEqual(parseChordSymbol('Cmaj7'), { root: 'C', quality: 'maj7', bass: null, symbol: 'Cmaj7' });
assert.equal(parseChordSymbol('Zx9'), null);

// Altered/extended qualities (including "#" in the quality, which the
// regex must not choke on) resolve instead of dead-ending.
assert.deepEqual(parseChordSymbol('C7#9'), { root: 'C', quality: '7#9', bass: null, symbol: 'C7#9' });
assert.deepEqual(parseChordSymbol('G7b5'), { root: 'G', quality: '7b5', bass: null, symbol: 'G7b5' });
assert.deepEqual(parseChordSymbol('Dmaj7#5'), { root: 'D', quality: 'maj7#5', bass: null, symbol: 'Dmaj7#5' });

const parsed = parseProgression('G, D Em  C');
assert.equal(parsed.length, 4);
assert.equal(parsed[2].chord.root, 'E');
assert.equal(parsed[2].chord.quality, 'minor');

console.log('chordParser.js: all checks passed');
