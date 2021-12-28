import styled, { css } from 'styled-components';

interface ContainerProps {
  beforeColor?: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
 
  span {
    width: 100%;
    background: var(--white);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.7s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100%);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    @media (min-width: 1024px) {
      width: 300px;
    }

    @media(max-width: 768px) {
      bottom: calc(+130%);
    }
    &::before {
      content: '';
      border-style: solid;
      border-color: var(--white) transparent;

      border-width: 6px 6px 0 6px;
      top: 100%;

      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    ${(props) => props.beforeColor && css`
      &::before{
        border-color: ${props.beforeColor} transparent;
      }
    `}
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
