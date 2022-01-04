import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-left: auto;
  z-index: 999;

  
  @media(max-width: 768px) {
    margin-top: 0;
    position: fixed;
    top: 0;
    z-index: 200;
    background: rgba(61,15,73,1);
    margin-top: 0;
  }
  
  border-radius: 0.625rem;
  border-bottom: solid 1px var(--purple-120);

  justify-content: space-between;

  .google-meets-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: 1rem;

    width: 2.7rem;
    height: 2.5rem;

    border-radius: 1.125rem;

   

    transition: filter .2s;

    &.disabled{
      pointer-events: none;
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:hover{
      cursor: pointer;
      filter: brightness(0.6);
    }
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;

  padding: 0.625rem;
`;

export const ImgChamadaVideo = styled.img`
  width: 36px;
  height: 36px;

`
export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.265rem;
  width: 100%;
  justify-content: space-between;


  p{
    font-size: 1.25rem;

    @media(max-width: 768px) {
      font-size: 1rem;
    }
  }

  span{
    margin-left: auto;
    font-size: 0.625rem;
    font-family: 'Roboto', sans-serif;

    color: var(--gray-150)
  }

  .user{
    display: flex;
    align-items: center;
    gap: 0.725rem;
  }

    p{
      max-width: 100%;
    
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
    }

    .subject{
      display: flex;
      align-items: center;
      margin-left: auto;
      
     
      .subject-icon{
        filter: invert(100%);
        @media(max-width: 768px) {
          display: none;
         }
        
        img{
       
        }
      }

      .subject-title{
        font-size: 1rem;
        margin-left: 0.5rem;
        
        @media(max-width: 768px) {
        font-size: .8rem;
        margin-left: 0;
        width: 100%;
    }
      }
    }

    .img-wrapper{
      position: relative;
      .img{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;

        border-radius: 1.5rem;
        border: solid 2px var(--gray-100);

        overflow: hidden;
      }
    }
  
`;

export const TimerContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  justify-content: space-between;
  align-items: center;
  width: 32%;
  padding: 0 0.8rem;

  @media(max-width: 768px) {
    display: none;
  }

  &.teacher{
    width: 20%;
  }

  .time-info{
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;

    .time-left-row{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 0.86rem;
      text-align: left;

      svg{
        margin-left: 0.5rem;
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

export const EndDoubtButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1rem;
  border: none;
  border-bottom: solid 4px var(--danger-darker);
  color: var(--white);
  background: var(--danger);

  height: 1.8rem;
  padding: 0 0.6rem;
  border-radius: 0.5rem;


  transition: filter .2s, border-bottom .2s;

  @media(max-width: 425px){
    height: 2.5rem;
    width: 40%;
    font-size: .9rem;
    text-align: center;
    margin-left: 1rem;
  }
  @media(min-width: 768px){
    height: 2.5rem;
    font-size: .9rem;
    text-align: center;
    margin-left: 1rem;
  }

  &:hover{
    cursor: pointer;
    filter: brightness(0.7);
    border-bottom: solid 2px var(--danger-darker);
  }
`;
