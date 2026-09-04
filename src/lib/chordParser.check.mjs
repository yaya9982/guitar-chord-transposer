import assert from 'node:assert/strict';
import { parseChordSymbol, parseProgression } from './chordParser.js';

assert.deepEqual(parseChordSymbol('G'), { root: 'G', quality: 'major', bass: null, symbol: 'G' });
assert.deepEqual(parseChordSymbol('Am7'), { root: 'A', quality: 'm7', bass: null, symbol: 'Am7' });
assert.deepEqual(parseChordSymbol('F#dim'), { root: 'F#', quality: 'dim', bass: null, symbol: 'F#dim' });
assert.deepEqual(parseChordSymbol('G/B'), { root: 'G', quality: 'major', bass: 'B', symbol: 'G/B' });
assert.deepEqual(parseChordSymbol('Cmaj7'), { root: 'C', quality: 'maj7', bass: null, symbol: 'Cmaj7' });
assert.equal(parseChordSymbol('Zx9'), null);

const parsed = parseProgression('G, D Em  C');
assert.equal(parsed.length, 4);
assert.equal(parsed[2].chord.root, 'E');
assert.equal(parsed[2].chord.quality, 'minor');

console.log('chordParser.js: all checks passed');
