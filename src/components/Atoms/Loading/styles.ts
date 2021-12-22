import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  size?: number;
  customColors?: Array<string>;
}

export const RoundSpanContainer = styled.div<ContainerProps>`
  position: relative;

  ${(props) => props.size === 0
    && css`
      width: 2rem;
      height: 2rem;
    `}
  ${(props) => props.size !== 0
    && css`
      width: ${props.size}rem;
      height: ${props.size}rem;
    `}

  span {
    display: block;

    ${(props) => props.size !== 0
      && css`
        width: ${props.size}rem;
        height: ${props.size}rem;
      `}

    ${(props) => props.size === 0
      && css`
        width: 2rem;
        height: 2rem;
      `}

    border: 0.2rem solid var(--white);
    border-top: 0.2rem solid var(--purple-150);
    border-right: 0.2rem solid var(--purple-150);
    border-bottom: 0.2rem solid var(--white);
    border-left: 0.2rem solid var(--white);

    border-radius: 50%;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);

    box-sizing: border-box;
    top: 0;
    left: 0;

    position: absolute;
  }
`;

export const DotWaveContainer = styled(motion.div)`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const DotWave = styled(motion.span)`
  display: block;
  margin-bottom: 0.625rem;
  width: 0.5rem;
  height: 0.5rem;
  background: var(--gray-150);
  border-radius: 50%;
`;
