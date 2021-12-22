interface SwitchProps {
  values: Array<string>;
  switchValue: string;
  onChange(value: string): void;
}

export const Type1 = ({ values, switchValue, onChange }:SwitchProps): JSX.Element => (
  <>
    <button
      type="button"
      className={`agendamentos ${
        switchValue === values[0] ? 'selected' : 'disabled'
      }`}
      onClick={() => onChange(values[0])}
    >
      {values[0]}
    </button>
    <button
      type="button"
      className={`fastDoubts  ${
        switchValue === values[1] ? 'selected' : 'disabled'
      }`}
      onClick={() => onChange(values[1])}
    >
      {values[1]}
    </button>
  </>
);
