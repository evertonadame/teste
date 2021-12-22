import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip';

type ContainerProps = {
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
  enabled: boolean;
}

type PlaceHolderProps = {
  hasValue: boolean;
  hasFocus: boolean;
}

type InputWrapperProps = {
  hasValue: boolean;
  hasFocus: boolean;
  noMargin: boolean;
  placeholderColor?: string;
}

type ErrorProps = {
  absolute: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  background: var(--purple);
  border: 2px solid var(--purple);
  border-radius: 1.75rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;


  @media screen and (min-width: 320px) {
    width: 90%;

  }

    @media screen and (min-width: 728px) {
    width: 65%;
    padding: .5rem;

  }

    @media screen and (min-width: 1024px) {
    width: 30%;
    
  }

   @media screen and (min-width: 1440px) {
    width: 30%;
    
  }

  color: white;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  transition: border 0.4s, box-shadow 0.4s;

  ${(props) => props.hasError
    && css`
      border: 2px solid var(--red-tomato);
    `}

  ${(props) => props.isFocused
    && css`
      border: 2px solid var(--aqua);
      color: var(--aqua);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
      
      input::placeholder{
        opacity: 0;
      }
    `}

  ${(props) => props.hasValue
    && css`
      border: 2px solid var(--aqua);
      color: var(--aqua);
    `}

  ${(props) => !props.enabled
    && css`
      pointer-events: none;
      opacity: 0.5;
    `}


  svg {
    margin-right: 1rem;
  }


`;

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 45%;
  transition: .6s all ease;
 
  input {
    display: flex;
    background: transparent;
    flex: 1;
    height: 100%;
    border: 0;
    padding: .7rem 0;
    z-index: 1;
    
    color: var(--white);

    &:focus{
      outline: none;
    }
    &::placeholder {
      font-size: 0.75rem;
      line-height: 0.875rem;
      color: var(--purple-100);

      ${(props) => props.placeholderColor && css`
        color: ${props.placeholderColor};
      `}
    }

  
  }


`;

export const Error = styled(Tooltip)<ErrorProps>`
  ${(props) => props.absolute && css`
    position: absolute;
    right: 3rem;
  `}
  height: 1.25rem;

  svg {
    margin-right: 0px;
  }

  span {
    color: #fff;
    background-color: var(--red-tomato);

    &::before {
      border-color: var(--red-tomato) transparent;
    }
  }
`;

export const EyePassword = styled.div`
  height: 1.25rem;
  margin-right: 2%;

  @media(max-width: 425px){
    margin-right: -2%;
  }
  svg {
    margin-right: 0px;
    color: var(--gray-150);

    transition: color 0.4s;

    &:hover {
      cursor: pointer;
      color: var(--aqua);
    }

    @media screen and (min-width: 768px) {
      margin-right: -10px;
    }
  }
`;

export const PlaceHolder = styled.span<PlaceHolderProps>`
  position: absolute;
  font-size: 0.85rem;
  line-height: 0.875rem;
  color: var(--purple-100);
  top: 0.08rem;
  transition: top 0.2s;

  @media (min-width: 1024px){
    top: 0.01rem;
  }
  ${(props) => (props.hasValue || props.hasFocus) && css`
    top: -0.8rem;
    font-size: 0.65rem;
    @media (min-width: 1024px){
    top: -0.8rem;
  }
  `}
`;
