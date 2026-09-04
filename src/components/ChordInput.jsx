const COMMON_CHORDS = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];

export default function ChordInput({ value, onChange }) {
  const append = token => {
    const next = value.trim().length > 0 ? `${value.trim()} ${token}` : token;
    onChange(next);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g. G D Em C"
        style={{ width: '100%', fontSize: '1rem', padding: '0.5rem' }}
      />
      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
        {COMMON_CHORDS.map(c => (
          <button key={c} type="button" onClick={() => append(c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}
