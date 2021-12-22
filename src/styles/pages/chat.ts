import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: calc(100% - 124px);

  @media(max-width: 1300px){
    padding: 0;

    height: calc(100% - 74px);
  }
`;

export const ChatContainerr = styled.div`
  display: flex;
  width: 72%;

  height: calc(100% - 16px);

  @media(max-width: 1200px){
    width: 99%;
  }

  @media(max-height: 650px){
    height: 92%;
  }
`;
