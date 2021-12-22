import styled, { css } from 'styled-components';

import { Input } from 'components/Atoms/Input';

interface ContainerProps {
  bgColor?: string;
  hideIcons?: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-top: auto;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  padding: 0.625rem;
  background: var(--dark-120-purple);
  min-height: 4rem;
  padding: 0 8%;
 

  @media(max-width: 768px) {
    position: fixed;
    bottom: 0;
    min-height: 5rem;
    width: 100vw;
    border-radius: 0;
    padding: 0;
  }


  form{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    

    @media(max-width: 768px) {
     padding: 0 0.7rem;

    }

    img,svg{
      transition: filter.2s;

      &:hover:not(.clip,.microphone){
        filter: brightness(0.6);
        cursor: pointer;
      }
    }

    .text-area-wrapper{
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 2rem;
      
      @media(max-width: 768px) {
        margin-right: 0;
      }
      textarea{

        color: var(--black);
        @media(max-width:768px) {
          width: 100%;
        }

        &::placeholder{
          color: #AFB2B1;
        }
      }
      max-height: 100px;
    }


    .send-button{
      margin-right: auto;
      margin-left: 1rem;
      color: var(--yellow);
    }

    .buttons-container{
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      align-items: center;
    }


    .clip,.microphone {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  ${(props) => props.bgColor && css`
    background-color: #cc4efa;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    
    form{
      .send-button{
        margin-left: 2rem;
      }
    }
  `}
`;

