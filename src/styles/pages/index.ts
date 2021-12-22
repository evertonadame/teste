import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  height: 95vh;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 13.5rem;
  margin-bottom: 2rem;
`;

export const ContainerSeparator = styled.div`
width: 40%;
margin: 4.5rem 0 5.8rem 0;
@media(min-width: 320px){
  width: 65%;

}
@media(min-width: 375px){
  width: 56%;
}
@media(min-width: 425px){
  width: 54%;
}
@media(min-width: 768px){
  width: 32%;
}
@media(min-width: 1024px){
  width: 19%;
}
@media(min-width: 1440px){
  width: 18%;
}
  .contain{
    width: 100%;
  }

`
export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem 0;
    width: 100%;
  
    
    .forgot-password{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.25rem;
      width: 100%;
      margin-top: -0.8rem;
     
      span{
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.32px;
        margin-bottom: 0.5rem;
        transition: filter 0.2s;

        &:hover{
          cursor: pointer;
          filter: brightness(0.8);
        }

        @media(max-width: 425px){
            width: 85%;
            text-align: right;
       
          }
          @media(min-width: 768px){
            width: 63%;
            text-align: right;
          }
          @media(min-width: 768px){
            width: 28%;
            text-align: right;
            
        }
      }
    }

    .separator {
    padding: 1rem;
    }

  }


`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 
  .sep{
    margin: 0 1rem 0 1rem !important;
  }
 
`;


