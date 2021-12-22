import styled, { css } from 'styled-components';

interface ContainerProps {
  isReceivedMessage: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: auto;
  padding: 16px;
  position: relative;
  color: black;
  font-family: roboto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 24px;
  max-width: 65%;

  ${(props) => (!props.isReceivedMessage
    ? css`
          align-self: flex-end;
          border-radius: 10px 10px 0px 10px;
          background: #cdcdcd;

          &:before {
            content: '';
            width: 0px;
            height: 0px;
            position: absolute;
            border-left: 8px solid transparent;
            border-right: 8px solid #cdcdcd;
            border-top: 8px solid #cdcdcd;
            border-bottom: 8px solid transparent;
            right: 0px;
            bottom: -15px;
          }
        `
    : css`
          align-self: flex-start;
          border-radius: 10px 10px 10px 0px;
          background: #fff;

          &:before {
            content: '';
            width: 0px;
            height: 0px;
            position: absolute;
            border-left: 8px solid #fff;
            border-right: 8px solid transparent;
            border-top: 8px solid #fff;
            border-bottom: 8px solid transparent;
            left: 0px;
            bottom: -15px;
          }
        `)}

  .sender {
    font-weight: bolder;
    margin-bottom: 8px;
  }

  .message {
    font-weight: normal;
    word-break: break-all;
  }

  .date {
    font-size: 10px;
    align-self: flex-end;
    margin-top: 5px;
  }

  .image {
    max-height: 325px;
    max-width: 380px;
  }
`;

export const MessageFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  height: 15px;
  align-items: center;
  margin-bottom: -10px;
  margin-left: 10px;

  .receivedIcon {
    position: absolute;
    right: 2px;
  }
`;
