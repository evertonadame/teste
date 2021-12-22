import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-top: 1rem;
  
  .centralizar{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
  }
  .svgSair{
      position: absolute;
      top: 3,5%;
      left: 10%;
      transition: filter 0.2s;

      &:hover{
        filter: brightness(0.5);
        cursor: pointer;
      }
  }
  .headerActions{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    }
  
`;

export const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  

  max-width: 1120px;

  form{
    position: relative;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    align-items: center;

    width: 50%;
    height: 100%;

    @media (max-width: 768px){
        width: 50%;
      }
       
      @media (max-width: 425px){
        width: 100%;
      }

    padding: 0.625rem;

    .dropdownWrapper{
      display: flex;
      gap: 1rem;
      flex-direction: column;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;

      @media (max-height: 700px){
        justify-content: flex-start;
      }

      
    }

      input{
        height: 1rem;
        &::placeholder{
          opacity: 0;
        }
    }
  }
`;
