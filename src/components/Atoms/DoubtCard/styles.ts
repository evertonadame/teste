import styled, { css } from 'styled-components';

interface ContainerProps {
  isCollapsed: boolean;
  small: boolean;
  isLoading: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 1rem;

  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--wine);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);

  margin-bottom: 1rem;

  h4{
    font-size: 1rem;
    margin-bottom: 0.625rem;
  }

  h3{
    font-size: 0.925rem;
  }

  svg{
    transition: filter .2s, transform .2s, color .2s;
    color: var(--white);
    &:hover{
      cursor: pointer;
      filter: brightness(0.8);
      transform: scale(1.08);
    }
  }

  .heading{
    display: flex;
    gap: 1rem;
    align-items: center;

    h4{
      margin: 0;
    }

    .info{
      position: relative;
      display: inline;
      .status-badge{
        position: absolute;
        top: 2.225rem;
        left: -1.25rem;
      }
    }

    .button-container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-left: auto;

      font-size: 0.625rem;

      .answer-question-button{
        display: flex;
        font-size: 0.625rem;
        width: 100px;
        >div>span{
          margin: 0;
        }
      }

      .danger{
        background: var(--red-tomato);
        border: solid 1px var(--red-tomato);

        font-size: 0.625rem;
      }

      svg{
        transform: rotate(360deg);
      }
    }
  }

  .outer-img-container{
      position: relative;
      .img{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;

        border-radius: 24px;
        overflow: hidden;
      }

      .status-badge{
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

  .question-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition:  .2s;
    height: 9rem;

    .text{
      max-width: 70%;
      max-height: 9rem;
      overflow-y: auto;
      font-size: 0.725rem;
      text-align: justify;
    }
  }

  .open-doubt{
    position: absolute;
    top: 0.425rem;
    right: 0.425rem;

    &:hover{
      cursor: pointer;
      svg{
        color: var(--info);
      }
    }
  }

  ${(props) => !props.isCollapsed && css`
    .question-content{
      min-height: 4rem;
    }

    svg:not(.link){
      transform: rotate(180deg);
      &:hover{
        transform: rotate(180deg);
      }
    }
  `}

  ${(props) => props.isCollapsed && css`
    .question-content{
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
      opacity: 0;
    }
  `}

  ${(props) => props.isLoading && css`
    pointer-events: none;
    opacity: 0.6;
  `}
`;

export const CollapseButton = styled.span`
  position: absolute;

  bottom: -0.5rem;
  left: 1.25rem;

  width: 1.55rem;
  height: 1.5rem;

  margin: 0 !important;
  padding: 0 !important;

  border-radius: 0.75rem;

  background: var(--purple);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color .2s;
  &:hover{
    cursor: pointer;
    background: rgba(0,0,0,0.5);
  }
`;

export const ChatStyleContaier = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--wine);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);

  margin-bottom: 1rem;

  .heading{
    display: flex;
    align-items: center;
    gap: 1rem;

    .outer-img-container{
      position: relative;
      .img{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;

        border-radius: 24px;
        overflow: hidden;
      }

      .status-badge{
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    .info{
      position: relative;
      display: flex;
      gap: 0 1rem;
      flex-direction: column;

      span{
        font-size: 0.875rem;
        opacity: 0.8;
        margin: 0;

        max-width: 160px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .open-doubt{
      svg{
        transition: color .2s;
      }

      &:hover{
        svg{
          cursor: pointer;
          color: var(--info);
        }
      }
    }

    .last-msg-info{
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: auto;

      .hide-badge{
        display: none;
      }

      p{
        font-size: 0.8rem;
        font-family: 'Roboto', sans-serif;
        color: var(--gray-200);
      }

      span{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;

        border-radius: 0.785rem;
        font-size: 0.875rem;
        background-color: var(--red-tomato);

        margin: 0;
      }
    }
  }
`;
