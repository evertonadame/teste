import styled from 'styled-components';

export const ChatContainer = styled.div`
  width: 90%;
  height: 95%;
  background-color: #5b6276;
  border-radius: 12px;
  box-shadow: 1px 1px 3px 0px;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
    @media (min-width: 1024px) {
    margin-top: 4rem;
  }
`;

export const ChatOptions = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 10px;
  font-family: Roboto;
  position: relative;

  .option {
    margin-top: 3px;
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 84%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-y: auto;
`;

export const EmptyChatMessage = styled.div`
  color: white;
  width: 30%;
  align-self: center;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 5px 0px 5px 0px;
  }

  .upperMessage {
    font-weight: bolder;
  }
`;
