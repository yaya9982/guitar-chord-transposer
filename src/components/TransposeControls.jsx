import { DB_KEYS, noteNameToSemitone } from '../lib/notes.js';

export default function TransposeControls({ semitoneShift, onShiftChange, firstChordRoot }) {
  const onTargetKeyChange = e => {
    const selectedKey = e.target.value;
    if (!firstChordRoot) return;
    const shift = ((noteNameToSemitone(selectedKey) - noteNameToSemitone(firstChordRoot)) % 12 + 12) % 12;
    onShiftChange(shift);
  };

  // Map the current shift onto a 300-degree sweep (12 detents, one per
  // semitone) so the knob's notch always shows a real rotary position.
  const normalized = ((semitoneShift % 12) + 12) % 12;
  const knobAngle = -150 + (normalized / 11) * 300;

  return (
    <div className="control-module">
      <span className="control-module__label">Transpose</span>
      <div className="stepper">
        <button type="button" className="footswitch footswitch--stepper" onClick={() => onShiftChange(semitoneShift - 1)}>-</button>
        <span className="knob" aria-hidden="true">
          <span className="knob__notch" style={{ '--knob-angle': `${knobAngle}deg` }} />
        </span>
        <span className="readout mono">{semitoneShift >= 0 ? `+${semitoneShift}` : semitoneShift} st</span>
        <button type="button" className="footswitch footswitch--stepper" onClick={() => onShiftChange(semitoneShift + 1)}>+</button>
      </div>
      <div className={`field-row${firstChordRoot ? '' : ' field-row--dim'}`}>
        <label className="field-row__label" htmlFor="target-key">Key</label>
        <select id="target-key" className="gear-select" onChange={onTargetKeyChange} defaultValue="" disabled={!firstChordRoot}>
          <option value="" disabled>Choose</option>
          {DB_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>
    </div>
  );
}
