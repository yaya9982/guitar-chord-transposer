export default function ModeToggle({ mode, onModeChange, capoFret, onCapoOverrideChange }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label>
        <input type="radio" name="mode" checked={mode === 'free'} onChange={() => onModeChange('free')} />
        Free
      </label>
      <label>
        <input type="radio" name="mode" checked={mode === 'capo'} onChange={() => onModeChange('capo')} />
        Capo
      </label>
      {mode === 'capo' && (
        <label>
          Capo fret:
          <select value={capoFret} onChange={e => onCapoOverrideChange(Number(e.target.value))}>
            {Array.from({ length: 8 }, (_, f) => f).map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
