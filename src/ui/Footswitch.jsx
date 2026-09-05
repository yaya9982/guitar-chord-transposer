// Shared button used across chord picker, mode toggle, transpose stepper,
// and play controls -- one place to change hover/disabled/active behavior
// instead of five call sites each re-deriving the className string.
export default function Footswitch({ active = false, stepper = false, disabled = false, onClick, children, ...rest }) {
  const className = [
    'footswitch',
    active && 'footswitch--on',
    stepper && 'footswitch--stepper',
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={className} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
