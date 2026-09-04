import { DB_KEYS, noteNameToSemitone } from '../lib/notes.js';

export default function TransposeControls({ semitoneShift, onShiftChange, firstChordRoot }) {
  const onTargetKeyChange = e => {
    const selectedKey = e.target.value;
    if (!firstChordRoot) return;
    const shift = ((noteNameToSemitone(selectedKey) - noteNameToSemitone(firstChordRoot)) % 12 + 12) % 12;
    onShiftChange(shift);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button type="button" onClick={() => onShiftChange(semitoneShift - 1)}>-</button>
      <span>{semitoneShift >= 0 ? `+${semitoneShift}` : semitoneShift} semitones</span>
      <button type="button" onClick={() => onShiftChange(semitoneShift + 1)}>+</button>
      <label>
        Target key:
        <select onChange={onTargetKeyChange} defaultValue="" disabled={!firstChordRoot}>
          <option value="" disabled>Choose a key</option>
          {DB_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </label>
    </div>
  );
}
