import styled, { css } from 'styled-components';

interface ContainerProps {
  progress: number;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;

  border: solid 2px black;
  border-radius: 0.5rem;

  width: 14rem;
  height: 1.8rem;

  margin: 0 2rem;


  .inner{
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    border-radius: 0.5rem;
    background: #e22424;

    border-bottom: solid 4px #821414;
    p{
      font-size: 0.85rem;
    }

    transition: width .2s;
    ${(props) => (
    css`
        width: ${props.progress}%;
      `
  )}
  }

  .info{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .heart{
    position: absolute;
    left: -0.875rem;
    top: -0.4rem;
  }
`;
