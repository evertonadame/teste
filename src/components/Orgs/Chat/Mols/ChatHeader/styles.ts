import styled from 'styled-components';

interface UserContainerProps {
  bg: string;
}

export const Container = styled.div`
  width: 100%;
  color: white;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(0, 0, 0);
  border-radius: 12px 12px 0px 0px;

  .icon {
    cursor: pointer;
    margin-left: 5px;
  }

  .left {
    display: flex;
    align-items: center;
    width: 33%;
  }

  .right {
    display: flex;
    align-items: center;
    width: 33%;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .headerOptions {
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .badgedIcon {
    display: flex;
    align-items: center;
  }
`;

export const ChatOptions = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 10px;
  font-family: Roboto;
  position: absolute;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 999;

  .option {
    margin-top: 3px;
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
  }
`;

export const UserContainer = styled.div<UserContainerProps>`
  margin-left: 1.2%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

 
  .user-data-container {
    color: #e9eaed;
    height: 90%;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;

  flex-shrink: 0;
  margin-right: 10px;

  .main-profile-img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    transition: 0.4s;
    border: solid 2px #dbdbdb;
  }
`;
