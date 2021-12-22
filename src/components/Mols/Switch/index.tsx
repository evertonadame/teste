import { Type1 } from './type1';
// import { Type2 } from './type2';

import { Container } from './styles';

interface SwitchProps {
  values: Array<string>;
  switchValue: string;
  type?: string;
  onChange(value: string): void ;
}

export const Switch = ({
  values,
  switchValue,
  onChange,
  type = '1',
}:SwitchProps): JSX.Element => (
  <Container type={type}>
    {type === '1' && (
    <Type1 switchValue={switchValue} values={values} onChange={onChange} />
    )}
    {/* {type === '2' && (
    <Type2 switchValue={switchValue} values={values} onChange={onChange} />
    )} */}
  </Container>
);
