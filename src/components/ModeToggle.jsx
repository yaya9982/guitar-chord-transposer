export default function ModeToggle({ mode, onModeChange, capoFret, onCapoOverrideChange }) {
  return (
    <div className="control-module">
      <span className="control-module__label">Mode</span>
      <div className="mode-toggle">
        <button
          type="button"
          className={`footswitch${mode === 'free' ? ' footswitch--on' : ''}`}
          onClick={() => onModeChange('free')}
        >
          <span className={`led${mode === 'free' ? ' led--green' : ''}`} /> Free
        </button>
        <button
          type="button"
          className={`footswitch${mode === 'capo' ? ' footswitch--on' : ''}`}
          onClick={() => onModeChange('capo')}
        >
          <span className={`led${mode === 'capo' ? ' led--amber' : ''}`} /> Capo
        </button>
      </div>
      <div className={`field-row${mode === 'capo' ? '' : ' field-row--dim'}`}>
        <label className="field-row__label" htmlFor="capo-fret">Fret</label>
        <select
          id="capo-fret"
          className="gear-select"
          value={capoFret}
          disabled={mode !== 'capo'}
          onChange={e => onCapoOverrideChange(Number(e.target.value))}
        >
          {Array.from({ length: 8 }, (_, f) => f).map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
