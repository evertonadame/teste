import styled, { css } from 'styled-components';

interface ContainerProps {
  round: boolean;
  customColor: string;
  disabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: 20px;
  width: 20px;

  input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  svg {
    color: #2ae1ff;
    font-weight: bold;
  }

  .check-wrapper {
    position: absolute;
    width: 16px;
    height: 16px;

    transition: 0.1s;

    .check-icon {
      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.1s;
    }

    .checked {
      svg {
        opacity: 1;
      }
    }

    .not-checked {
      svg {
        opacity: 0;
      }
    }

    svg {
      transition: 0.1s;
      position: absolute;
      left: -1px;
      top: -1px;
    }

    &:hover {
      box-shadow: 0 0 8px #319cad;
      height: 18px;
      width: 18px;
      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    border: solid 1px #2ae1ff;

    ${(props) => props.customColor && css`
      border: solid 1px ${props.customColor};

      svg{
        color: ${props.customColor};
      }
    `}

    ${(props) => props.round
      && css`
        width: 20px;
        height: 20px;
        border-radius: 12px;
        padding: 4px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-width: 2px;

        svg {
          position: unset;
        }

        &:hover {
          box-shadow: 0 0 8px #000;
          height: 22px;
          width: 22px;
          cursor: pointer;

          svg {
            width: 18px;
            height: 18px;
          }
        }
      `}
  }

  ${(props) => props.disabled && css`
    pointer-events: none;
    opacity: 0.6;
  `}
`;
