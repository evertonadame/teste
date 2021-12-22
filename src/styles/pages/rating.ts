import styled, { css } from 'styled-components';

interface ImageContainerProps {
  colors: string[];
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  width: 100%;
  height: 80%;

    .button--centralizar-mobile {
    padding: 1rem;
      display: flex;
      justify-content: center;
    @media(max-width: 768px) {
      display: flex;
      justify-content: center;
    }
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 11.8rem;

  @media (max-width: 768px) {
    padding: 0;
  }

  .title{
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 0.425rem;
    margin-left: 1rem;
    border-bottom: solid 1px var(--purple-110);
    gap: 0.5rem;

    @media(max-width: 768px) {
      flex-direction: column;

    }
    p{
      font-size: 1.25rem;
    }
  }

  span{
    font-family: 'Roboto', sans-serif;
    font-size: 0.825rem;
    line-height: 1rem;
    letter-spacing: 0.28px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 5rem;

  }

  .img{
    margin-left: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    border-radius: 24px;
    border: solid 2px var(--gray-100);
    overflow: hidden;

    @media (max-width: 768px) {
      margin-left: 1rem;
    }
  }

  .actions{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   

    width: 100%;

    p{
      font-size: 1.5rem;
    }

    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
    }

    .subject-info{
      display: flex;
      align-items: center;
      width: 100%;


      p{
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
  }
`;

export const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-left: auto;

 @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 2rem;
    width: 100%;
   
  }

  .attendence-details {
     @media(max-width: 768px) {
        margin-bottom: 2rem; 
      }
  }

  .chat-history {
    @media(max-width: 768px) {
      margin-top: 2rem;
      text-align: center !important;
      justify-content: center;
      display: flex;
    }
  }

  .attendence-details, .billing-details, .chat-history{
    
      @media(max-width: 768px) {
         width: 100%;
        text-align: left;  
      }
    span  {
      font-size: 1rem;
      font-weight: 300;

       @media(max-width: 768px) {
       font-size: 1.3rem;
      }

    }
    p{
      font-size: 0.9rem;
      font-weight: bold;
       margin-top: .2rem;
      @media(max-width: 768px) {
       font-size: 1.1rem;
      }

  
      strong{
        font-weight: normal;
        font-style: italic;
        font-family: "Helvetica";
        margin-left: .2rem;
        
      }
    }
  }
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
       filter: invert(100%);
`;


export const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 0.5rem 15rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Heart = styled.div`
  position: relative;
  margin-left: 1rem;

  @keyframes pop {
    0% {transform: scale(1);}
    50% {transform: scale(1.2);}
    100% {transform: scale(1);}
  }

  .popped{
    animation: pop .4s;
  }

  svg{
    color: var(--pink);

    transition: opacity .2s;
    &:hover{
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

export const UserActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  @media(max-width: 768px) {
    flex-direction: column;
  }
  .column-1{
    display: flex;
    flex-direction: column;
    width: 44%;

    @media (max-width: 768px) {
      width: 100%;
    }

    >p{
      font-weight: 300;
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-family: 'Roboto', sans-serif;
      @media(max-width: 768px) {
        font-size: 1.55rem;
        margin-bottom: 0.5rem;
      }

    }

    .checkbox-container{
      display: flex;
      margin-top: 0.5rem;
      @media(max-width: 768px) {
        justify-content: center;
      }

      .option{
        display: flex;
        align-items: center;
        margin-right: 40%;
        margin-bottom: 2rem;
        @media(max-width: 768px) {
          font-size: 1.8rem;
          margin: 0 1rem 1rem 1rem;
          text-align: center;
        }
        span{
          color: var(--aqua);
          margin-left: 0.875rem;
        }
      }
    }

    .rating-wrapper{

      @media(max-width: 768px){
        text-align: center;
      }
      h5{
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        font-size: 1.25rem;
        line-height: 1.5rem;
        margin-bottom: 1.5rem;
        @media(max-width: 768px) {
          font-size: 1.55rem;
          text-align: left;
        }
      }

      p{
        font-size: 0.875rem;
        font-weight: 300;
        @media(max-width: 768px) {
          font-size: 1.1rem;
        }
      }

      button{
        margin-top: 1.5rem;
        text-transform: uppercase;

        width: 200px;
      }
    }
  }

  .column-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 44%;
    
    @media (max-width: 768px) {
      width: 100%;
    }

    h5{
      font-size: 1.5rem;
      font-weight: 300;
    }

    textarea{
      resize: none;
      color: var(--black);

      padding: 0.25rem;
      border-radius: 0.25rem;

      @media(max-width: 768px) {
        margin: 1rem 0; 
      }
    }
  }

`;
