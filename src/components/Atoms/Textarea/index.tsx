/* eslint-disable no-param-reassign */
import {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: Record<string, unknown>;
  responsive?: boolean;
}

export const Textarea = ({
  name,
  containerStyle = {},
  icon: Icon,
  responsive = false,
  ...rest
}:InputProps): JSX.Element => {
  const textAreaReference = useRef<HTMLTextAreaElement>(null);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);
  const [focus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleInputBlur = useCallback(() => {
    setFocus(false);
    setHasValue(!!textAreaReference.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const autoGrow = ():void => {
    if (textAreaReference.current) {
      textAreaReference.current.style.height = '5px';
      textAreaReference.current.style.height = `${textAreaReference.current.scrollHeight}px`;
    }
  };

  /**
   *  O defaultValue é uma prop passada la no Form chamada initialValue
   * pode ser passada assim:
   * initialData={{ name: 'Thiago' }}
   */

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaReference.current,
      path: 'value',
    });

    if (textAreaReference.current) {
      textAreaReference.current.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
        }
        if (e.key === 'Enter' && e.shiftKey) {
          if (textAreaReference.current) {
            textAreaReference.current.value += '  ';
          }
        }
      });
    }
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      hasError={!!error}
      isFocused={focus}
      hasValue={hasValue}
      data-testid="input-container"
      responsive={responsive}
      disabled={rest.disabled}
    >
      {Icon && <Icon size={20} />}
      <textarea
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        ref={textAreaReference}
        onInput={autoGrow}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
