import styled from 'styled-components';

interface ContainerProps {
  opacity?: boolean; 
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;

`;

export const TimerContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content:space-between;
  position: fixed;
  height: 30px;
  width: 95%;
  bottom: 11%;
  right: 3%;
  transition: all ease 1s;
  opacity:${({opacity}) => (opacity ? '0' : '1')};

  .space-container {
    display: flex;
    align-items: center;
  }
  @media(min-width: 769px){
    display: none;
  }

  .time-info{
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 0.5rem;

    .time-left-row{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 0.86rem;

      p{
        text-align: center;
        display: flex;
        justify-content: center;
        width: 100%;
      }

      svg{
        margin-left: 0.5rem;
       @media(max-width: 768px){
         display: none;
       }
      }
    }

    @keyframes mymove {
      0% {color: var(--white);}
      50% {color: var(--danger);}
    }

    .danger{
      animation: mymove 0.8s infinite;
    }
  }
`;


export const ChatContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  border-radius: 0.625rem;
  background: var(--dark-125-purple);

  @media(max-width:768px){
    width: 100%;
    height: 100vh;
    padding: 0;
  }
  .image-preview-wrapper{
    position: absolute;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    border-top: 0.5rem;
    background: #cc4efa;
    border-radius: 6px;
    overflow: hidden;


    @media(max-width: 768px) {
      width: 95%;
      height: 70%;
      top: 20%;
      left: 2%;
      padding: 0;
      gap: 0;
    }

    .img{
      position: relative;
      display: flex;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      
    
    @media(max-width: 425px) {
      width: 80%;
      height: 80%;
      top:0;
    }

    @media(min-width: 768px) {
      width: 50%;
      height: 80%;
      top:0;
    }

    @media(min-width: 1024px) {
  
      top:5%;
    }

      svg{
        position: absolute;
        top: -2.5rem;
        right: -2.5rem;
        color: var(--white);
        transition: filter .2s;

        &:hover{
          cursor: pointer;
          filter: brightness(0.6);
        }
      }
    }

    .actions{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      background: var(--purple);
    }
  }

  @media(max-height: 650px){
    height: 60%;
  }

  @media(max-height: 810px){
    margin-top: 0;
  }



`;

export const MessagesBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding: 2rem 0.625rem;
  height: 100%;
  @media(max-width: 768px) {
    margin-bottom: 9rem;
  }

 
  #sentinela{
    opacity: 0;
    width: 100%;
    height: 10px;

    background: red;
  }
  #sentinela-bottom{
    /* background: red !important;
    visibility: visible !important;
    opacity: 1 !important; */
  }

  &.loading{
    justify-content: center;
    align-items: center;

    @media(min-width: 1024px){
      display: block;
    }
  }

  .isTyping{
    @media(min-width: 1024px){
      display: block;
    }
    margin-top: auto;
    transition: opacity .2s;
   
    &.not-typing{
      opacity: 0;
    }

    &.typing{
      opacity: 1;
      @media(min-width: 1024px){
      display: block;
    }
    }
  }

  .me{
    margin-left: auto;
    @media(min-width: 1024px){
      display: block;
    }
  }
`;
