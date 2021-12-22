import styled, { css } from 'styled-components';

interface ImageContainerProps {
  colors: string[];
}

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8.5rem;

  font-family: 'Roboto', sans-serif;

  border: solid 1px var(--purple);
  border-radius: 0.625rem;

   @media screen and (min-width: 320px) {
    width: 47%; 
  }

  @media screen and (min-width: 375px) {
    width: 47%; 
  }

   @media screen and (min-width: 768px) {
    width: 31%; 
  }

  @media screen and (min-width: 1024px) {
    width: 9.75rem;
  }

  span{
    margin-top: 0.5rem;
  }

  transition: filter 0.2s, transform 0.2s;
  &:hover{
    cursor: pointer;
    transform: scale(1.06);
    filter: drop-shadow(0 0 0.75rem var(--purple));
    /* filter: blur(100%) */
  }
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;

  background: var(--white);

  border-radius: 50%;
  ${(props) => props.colors && css`
    border: solid 4px ${props.colors[0]};

    border-bottom-color: ${props.colors[1]};
    border-left-color: ${props.colors[1]};
  `}

  transform: rotate(-45deg);

  >div{
    transform: rotate(45deg);
  }
`;
