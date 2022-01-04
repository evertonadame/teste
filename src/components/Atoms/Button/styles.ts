import styled, { css } from 'styled-components';

interface ContainerProps {
  outlined: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.125rem;
  height: 2.5rem;
  border: 1px solid var(--aqua);
  border-radius: 10px;
  background: var(--aqua);
  font-family: 'Raleway', sans-serif;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 1.75px;

  transition: filter 0.2s;

  @media(max-width: 320px) {
    width: 10rem;
  }
  &:hover{
    filter: brightness(0.8);
  }

  ${(props) => props.outlined && css`
    border: solid 2px var(--yellow);
    background: transparent;
    color: var(--yellow);
    &:hover{
      filter: brightness(0.6);
    }
  `}

  &:disabled{
    opacity: 0.6;
    pointer-events: none;
  }
`;
