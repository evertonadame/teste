import styled, { css } from 'styled-components';
import { Button } from 'components/Atoms/Button';

interface ButtonsWrapper {
  isDragging?: boolean;
  hasImage: boolean;
  customChild?: boolean;

}

export const SimpleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
`;

export const MultipleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

export const ButtonsWrapper = styled.div<ButtonsWrapper>`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .imgButton{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 6rem;
    height: 6rem;

    border-radius: 1.875rem;
    border: solid 0.25rem var(--gray-200);
    margin-bottom: 0.5rem;
    background: transparent;

    ${(props) => props.customChild && css`
      border: none;
      margin: 0;
      width: auto;
      height: auto;

      border-radius: unset;
    `}

    .image-item{
      display: flex;
      justify-content: center;
      align-items: center;

      .profileUrl{
        border-radius: 1.675rem;
      }
    }

    svg{
      position: absolute;

      bottom: 0;
      right: 0.8251rem;
    }
  }

  ${(props) => !props.hasImage && css`
    justify-content: center;
    align-items: center;
  `}
`;

export const StyledButton = styled(Button)`
  font-size: 0.625rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  overflow: hidden;
  height: 3rem;
  position: relative;
  margin-top: 1rem;
  
  .delete-button {
    display: block;
    position: absolute;
    top: 2%;
    right: 2%;
    height: 2rem;
    width: 2rem;
    z-index: 999;
    
  }
  .delete-button-false {
    display: none;
  }
  
  .tem-foto {
    object-fit: contain;
  }
 .mini-img{
    border-radius: 0.25rem;
  }

  &.photo{
    height: 165px;
    width: 230px;
    background: var(--dark-purple);
    border: solid 2px var(--dark-purple);
    border-radius: 0.25rem;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    gap: 1rem;
    
    @media(max-width: 768px) {
     height: 130px;
    width: 180px;
    padding: .5rem;
     opacity: 1;
  }

}
`;


export const StyledButtonSemFoto = styled(Button)`
  font-size: 0.625rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  overflow: hidden;
  padding: 0.4rem;

  

`
