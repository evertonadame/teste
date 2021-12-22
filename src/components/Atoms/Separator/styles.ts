import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'vertical' | 'horizontal';
  customHeight?: number;
  customWidth?: number;
  customColor?: string;

}

export const Container = styled.div<ContainerProps>`
  background: var(--purple-120);
 
  margin-left: 20px;

  ${(props) => props.type === 'vertical'
    && css`
      width: 2px;
      height: ${props.customHeight}%;
    `}

  ${(props) => props.type === 'horizontal'
    && css`
      height: 1px;
      width: ${props.customWidth}%;
      margin: 0;

      background: linear-gradient(
        90deg,
        var(--purple-120) 0%,
        var(--purple-120) 50%,
        var(--purple-120) 100%
      );
    `}

  ${(props) => props.customColor
    && css`
      background: ${props.customColor};
    `}

   
`;
