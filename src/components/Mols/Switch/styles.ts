import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;

  ${(props) => props.type === '2'
    && css`
      width: auto;
      align-items: center;
      justify-content: flex-start;
    `}

  .agendamentos,
  .fastDoubts {
    position: relative;
    border: none;
    width: 10.375rem;
    height: 3.625rem;
    background: #000;
    color: #fff;
    letter-spacing: 2px;
    font-size: 1rem;
    transition: 0.4s;
    overflow-y: hidden;
    font-family: 'Roboto', sans-serif !important;
    margin-bottom: 1rem;
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .on,
  .off {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    width: 9.375rem;
    height: 2.625rem;
    background: #3c4453;
    color: #717988;
  }

  .on {
    border-radius: 30px 0 0 30px;
  }
  .off {
    border-radius: 0 30px 30px 0;
  }

  .div-off,
  .div-on {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 80%;
    border-radius: 50%;
    transition: 0.4s;
    &:hover {
      cursor: pointer;
      color: #000;
      background: #ffd35c;
    }
  }

  .selected-t2 {
    .div-off,
    .div-on {
      color: #000;
      background: #ffd35c;
    }
  }

  .agendamentos {
    border-radius: 6px 0 0 6px;
  }
  .fastDoubts {
    border-radius: 0 6px 6px 0;
  }

  .disabled {
    background: rgba(0, 0, 0, 0.2);
  }

  .selected {
    box-shadow: 0 8px 6px -8px black;
    &::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;

      bottom: 0;
      margin-left: 22%;
      margin-bottom: -18px;

      animation: easeInOut 0.2s;

      border-top: 20px solid #000;
    }

    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0);
    }

    @keyframes easeInOut {
      0% {
        opacity: 0;
        margin-bottom: 0px;
      }
      100% {
        opacity: 1;
        margin-bottom: -18px;
      }
    }
  }
`;
