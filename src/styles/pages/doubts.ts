import styled from 'styled-components';
import { Button } from 'components/Atoms/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1.8rem 15rem;
  
  @media screen and (max-width:768px) {
    padding: 1rem;
  }
`;

export const Heading = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
flex-direction: row;
    align-items: center;
  @media screen and (max-width: 768px) {
   
    

  }


  .title{
    display: flex;
    align-items: flex-end;
    margin-left: 1rem;
    gap: 0.5rem;  
    p{
      font-size: 1.25rem;

    }

    .icon{
      filter: invert(100%);
    }
  }

  span{
    margin-top: 1rem;
    font-family: 'Roboto', sans-serif;
    font-size: 0.825rem;
    line-height: 1rem;
    letter-spacing: 0.28px;
  }

`;

export const QuestionContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-top: 4rem;

  @media(max-width: 768px) {
    width: 100%;
    margin-top: 3rem;
  }
  p{
    font-family: 'Roboto', sans-serif;
    font-size: 0.825rem;
    margin-bottom: 1rem;
  }
`;

export const ButtonsWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;

 
`
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
 

  @media (max-width: 768px) {
    justify-content: center;
      margin-top: 1rem;
     
  }
`;

export const StyledButton = styled(Button)`
  height: 3rem;
  font-family: 'Roboto', sans-serif;

  @media(max-width: 768px) {
    width: 80%;
    padding: 0.7rem;
    margin-left: 3rem;
  }


  &.photo{
    width: 32%;
    background: var(--dark-purple);
    border: solid 2px var(--dark-purple);
    border-radius: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    
  }
`;
