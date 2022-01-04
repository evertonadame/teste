import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;

  height: calc(100% - 124px);

  @media(min-width: 1180px){
   width: 91vw;
   padding-left: 7rem;
   
  }
`;

export const ChatContainerr = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1024px) {
    width: 85%;

  }
 
`;
