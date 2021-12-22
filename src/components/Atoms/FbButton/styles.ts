import styled from 'styled-components';
import { rainbowBg } from 'styles/animations';

interface ContainerProps {
  isHovered: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background: ${(props) => (!props.isHovered ? 'var(--fb-blue)' : `linear-gradient(124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3);
    border: solid 1px transparent;
    ;`)};

  border: solid 1px var(--fb-blue);

  width: 2.5rem;
  height: 2.5rem;

  border-radius: 1.25rem;
  animation: ${rainbowBg} 4s linear infinite;
  background-size: 1800% 1800%;
  transition: filter 0.2s, background-color 0.2s, color 0.2s;
`;
