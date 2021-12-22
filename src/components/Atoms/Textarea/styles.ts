import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
  responsive: boolean;
  disabled?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 4px;
  display: flex;
  /* align-items: center; */
  padding: 16px;
  width: 400px;
  height: 200px;
  border: 2px solid #232129;
  color: #666360;

  @media(max-width:768px) {
    width: 75%;
    padding: .7rem;
    border-radius: 15px;
  }

  & + div {
    margin-top: 8px;
  }

  transition: border 0.3s;

  ${(props) => props.responsive && css`
    width: 100%;
    height: fit-content;
    padding: 0.25rem;
    max-height: 80px;
    overflow-y: auto;
    margin: 0.625rem 0;
  `}

  ${(props) => props.hasError
    && css`
      border: 2px solid #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      border: 2px solid #1266cb;
      color: #1266cb;
    `}

  ${(props) => props.hasValue
    && css`
      border: 2px solid #1266cb;
      color: #1266cb;
    `}

  ${(props) => props.disabled
    && css`
      opacity: 0.6;
    `}

  textarea {
    background: transparent;
    flex: 1;
    border: 0;
    resize: none;
    outline: none;

    color: #000;

    &::placeholder {
      color: #666360;
    }

    /* border: solid 1px #000; */
    margin-right: 40px;
  }

  svg {
    margin-right: 16px;
  }

  &::-webkit-scrollbar {
    display: unset;
  }
  &::-webkit-scrollbar {
    width: 0.25rem !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--gray-200);
    border-radius: 0.5rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-600);
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  /* margin-left: 16px; */
  /* border: solid 1px #000; */

  svg {
    margin-right: 0px;
  }

  span {
    color: #fff;
    background-color: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
