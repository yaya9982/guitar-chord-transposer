import { DB_KEYS, noteNameToSemitone } from '../lib/notes.js';

export default function TransposeControls({ semitoneShift, onShiftChange, firstChordRoot }) {
  const onTargetKeyChange = e => {
    const selectedKey = e.target.value;
    if (!firstChordRoot) return;
    const shift = ((noteNameToSemitone(selectedKey) - noteNameToSemitone(firstChordRoot)) % 12 + 12) % 12;
    onShiftChange(shift);
  };

  // Bipolar mapping: 0 semitones points the notch straight up (neutral),
  // rotating 30 degrees per semitone clockwise for + and counterclockwise
  // for -. The only seam is at the tritone (+/-6), the one point a cyclic
  // quantity has to wrap on a static dial -- placed opposite "up" instead
  // of right next to it.
  const raw = ((semitoneShift % 12) + 12) % 12;
  const signed = raw > 6 ? raw - 12 : raw;
  const knobAngle = signed * 30;

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
