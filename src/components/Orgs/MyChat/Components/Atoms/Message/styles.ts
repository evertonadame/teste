import styled, { css } from 'styled-components';

interface MessageProps {
  mine: boolean;
  hasImg: boolean;
}

export const Container = styled.div<MessageProps>`
  position: relative;
  display: flex;
  padding: 1rem;
  max-width: 60%;
  min-width: 35%;

  width: fit-content;
  flex-wrap: wrap;
  background: var(--white);
  color: var(--black);
   @media(max-width: 768px){
      min-width: 45%;
    }
  &::before{
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
   
  }

  ${(props) => props.hasImg && css`
    max-width: 50%;
    min-width: 25%;
    flex-direction: column;
    @media(max-width: 768px){
      min-width: 70%;
    }
    
  `}

  ${(props) => (!props.mine ? css`
    border-radius: 0.5rem 0.5rem 0.5rem 0;

    &::before{
      border-left: 10px solid var(--white);
      border-right: 10px solid transparent;
      border-top: 10px solid var(--white);
      border-bottom: 10px solid transparent;
      left: 0;
      bottom: -19px;
      margin-right: auto;
    }
  ` : css`
      border-radius: 0.5rem 0.5rem 0 0.5rem;
      margin-left: auto;
      

      &::before{
        border-left: 10px solid transparent;
        border-right: 10px solid var(--white);
        border-top: 10px solid var(--white);
        border-bottom: 10px solid transparent;
        right: 0;
        bottom: -19px;
      }
  `)}

  p,a{
    font-size: 0.875rem;
    font-weight: 400;
    margin-bottom: 0.125rem;
    max-width: 100%;
    word-break: break-all;
  }

  h2{
    color: var(--black);
    font-size: 0.875rem;

    margin-bottom: 0.625rem;
  }

  /* .msg-text{

  } */

  .msg-info-container{
    position: absolute;
    bottom: 0.0rem;
    right: 0.25rem;

    display: flex;

    p{
      color: var(--gray-800);
      font-size: 0.675rem;
    }

    .read-status{
      margin-left: 4px;

      &.recieved{
        svg{
          color: var(--gray-800);
        }
      }

      &.read{
        svg{
          color: var(--aqua);
        }
      }

      >svg +svg{
        margin-left: -4px;
      }
    }
  }

  .image{
    display: flex;
    width: 100%;
    height: 240px;
    position: relative;
    padding: 1rem;
    margin-bottom: 0.5rem;

    .chat-img{
      transition: opacity .2s;
      &:hover{
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
`;
