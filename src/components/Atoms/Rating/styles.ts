import styled, { css } from 'styled-components';

interface ContainerProps {
  isLoading: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 1rem 0;

  svg{
    color: var(--yellow-120);

    transition: filter .2s;
    &:hover{
      filter: opacity(0.6);
      cursor: pointer;
    }
  }

  transition: filter .2s;
  ${(props) => props.isLoading && css`
    filter: opacity(1);
    pointer-events: none;
  `}
`;
