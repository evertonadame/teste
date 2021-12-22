import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { FiCheck } from 'react-icons/fi';

import { Container } from './styles';

interface CheckboxProps {
  id?: string;
  name?: string;
  isSelected?: boolean;
  clickId?: string;
  round?: boolean;
  customColor?: string;
  disabled: boolean;
  onClick?(): void;
}

export const Checkbox = ({
  id = '',
  name = '',
  clickId,
  isSelected = false,
  round = false,
  customColor = '',
  disabled = false,
  onClick,
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(isSelected);

  const foreignState = useMemo(() => {
    if (isSelected && isChecked) return 'checked';

    if (isChecked) return 'checked';

    return 'not-checked';
  }, [isSelected, isChecked]);

  const toggleCheck = useCallback(() => {
    setIsChecked(!isChecked);
    onClick && onClick();
  }, [isChecked, onClick]);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <Container
      onClick={toggleCheck}
      id={clickId}
      round={round}
      customColor={customColor}
      disabled={disabled}
    >
      <div className="check-wrapper">
        <input type="checkbox" name={name} id={id} />
        <div className={`check-icon ${foreignState}`}>
          <FiCheck className="check" size={16} />
        </div>
      </div>
    </Container>
  );
};
