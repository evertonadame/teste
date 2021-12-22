/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';
import VMasker from 'vanilla-masker';

import {
  Container, InputWrapper, Error, EyePassword, PlaceHolder,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: Record<any, any>
  inputWrapperStyle?: Record<any, any>;
  focusPlaceholder?: string;
  enabled?: boolean;
  noMargin?: boolean;
  animatePlaceholder?: boolean;
  placeholderColor?: string;
  mask?: {
    values: string | string[];
    maxLenght: number;
  };
  callback?(inputRef: HTMLInputElement): void;
}

export const Input = ({
  name,
  containerStyle = {},
  inputWrapperStyle = {},
  icon: Icon,
  enabled = true,
  callback,
  placeholder,
  focusPlaceholder,
  noMargin = false,
  animatePlaceholder = true,
  placeholderColor,
  mask,
  ...rest
}: InputProps): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const inputReference = useRef<HTMLInputElement>(null);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const handleInputBlur = useCallback(() => {
    setFocus(false);
    setHasValue(!!inputReference.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleInputEnter = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (inputReference.current !== undefined) {
          (callback && inputReference.current) && callback(inputReference.current);
        }
      }
    },
    [callback],
  );

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);

    if (inputReference.current) {
      showPassword ? inputReference.current.type = 'text' : inputReference.current.type = 'password';
    }
  }, [showPassword]);

  const inputHandler = (
    masks: string | string[],
    max: number,
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const c = event.target;
    const v = c.value.replace(/\D/g, '');
    const m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
  };

  /**
   * O defaultValue é uma prop passada la no Form chamada initialValue
   * pode ser passada assim:
   * initialData={{ name: 'Thiago' }}
   */

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputReference.current,
      path: 'value',
    });

    inputReference.current?.addEventListener('keypress', handleInputEnter);
  }, [fieldName, handleInputEnter, registerField]);

  useEffect(() => {
    if (mask) {
      inputReference.current?.addEventListener<any>('input', (e) => inputHandler(mask.values, mask.maxLenght, e), false);
    }
  }, [mask]);

  return (
    <Container
      style={containerStyle}
      hasError={!!error}
      isFocused={focus}
      hasValue={hasValue}
      data-testid="input-container"
      enabled={enabled}
    >
      {Icon && <Icon size={20} />}
      <InputWrapper
        hasValue={hasValue}
        hasFocus={focus}
        noMargin={noMargin}
        placeholderColor={placeholderColor && placeholderColor}
        style={inputWrapperStyle}
      >
        <input
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          defaultValue={defaultValue}
          ref={inputReference}
         
          {...rest}
        />
        {animatePlaceholder && (
          <PlaceHolder hasFocus={focus} hasValue={hasValue}>
            {!focus && focusPlaceholder ? focusPlaceholder : placeholder}
          </PlaceHolder>
        )}
      </InputWrapper>

      {error && (
        <Error absolute={name.toLowerCase().includes('password')} title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {name.toLowerCase().includes('password') && (
        <EyePassword onClick={handleShowPassword}>
          {showPassword && <FiEye size={20} />}
          {!showPassword && <FiEyeOff size={20} />}
        </EyePassword>
      )}
    </Container>
  );
};
