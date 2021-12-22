interface SwitchProps {
  values: Array<string>;
  switchValue: string;
  onChange(value: string): void;
}

export const Type2 = ({ values, switchValue, onChange }:SwitchProps): JSX.Element => (
  <>
    <button
      type="button"
      className={`on ${
        switchValue === 'off' ? 'selected-t2' : 'disabled-t2'
      }`}
      onClick={() => onChange('off')}
    >
      <div
        className={`div-on ${
          switchValue === 'on' ? 'selected-t2' : 'disabled-t2'
        }`}
      >
        {values[0]}
      </div>
    </button>
    <button
      type="button"
      className={`off  ${
        switchValue === 'on' ? 'selected-t2' : 'disabled-t2'
      }`}
      onClick={() => onChange('on')}
    >
      <div
        className={`div-off ${
          switchValue === 'off' ? 'selected-t2' : 'disabled-t2'
        }`}
      >
        {values[1]}
      </div>
    </button>
  </>
);
