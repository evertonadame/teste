import styled, { css } from 'styled-components';

interface ContainerProps {
  status: 'online' | 'busy' | 'offline' | 'away';
}

export const Container = styled.div<ContainerProps>`
  position: absolute;

  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;

  bottom: 0;
  right: 0;
  z-index: 1111;

  ${(props) => props.status === 'busy' && css`
    background: var(--danger);
  `}
  ${(props) => props.status === 'away' && css`
    background: var(--warning);
  `}
  ${(props) => props.status === 'offline' && css`
    background: var(--gray-200);
  `}
  ${(props) => props.status === 'online' && css`
    background: var(--success);
  `}


  &:hover{
    cursor: pointer;
  }
`;
