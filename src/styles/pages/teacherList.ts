import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 122px);
  padding: 1.8rem 15rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;

  }
  
  .doubt-actions{
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    vertical-align: middle;
    
 
    .doubt-wrapper{
      display: flex;
    }


    .title{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1rem;

    p{
      font-size: 1.25rem;
    }

    .icon{
      filter: invert(100%);
    }
  }
    button{
      display: flex;
      align-items: center;
      color: var(--white);
      padding: 0.35rem;
      border-radius: 0.25rem;
      overflow: hidden;
      width: 10rem;
      height: 2.5rem;
      margin-left: 2.5rem;
      margin-right: 3rem;
      background-color: var(--danger);;
      border: none;

      @media (max-width:425px) {
        width: 70%;
      }

      svg{
        margin-right: 0.5rem;
      }

     

      transition: filter .2s;
      &:hover:not(:disabled){
        filter: opacity(0.6);
      }
      &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

export const Heading = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 4rem;

 

  span{
    margin-top: 1rem;
    font-family: 'Roboto', sans-serif;
    font-size: 0.825rem;
    line-height: 1rem;
    letter-spacing: 0.28px;
  }
`;

export const Content = styled.section`
  margin-top: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0 1rem 1.5rem;

  @media(max-width: 768px) {
    padding: 0;
  }
`;

export const YellowBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  width: 52%;
  padding: 0 1rem 0 0;
  margin-left: -15rem;
  z-index: -1;

  background: var(--yellow-150);

  display: flex;
  flex-direction: column;

  font-family: 'Roboto',sans-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: -2rem;
    margin-top: 2rem;
    justify-content:center;
  }

  .content{
    height: 1.5rem;
    width: 100%;
    margin-left: auto;
    text-align: center;
    span{
      color: var(--black);
      font-weight: 400;
      font-size: 1.25rem;
      margin-left:4rem ;
      line-height: 1.5rem;
      letter-spacing: 0.32px;
      width: 100%;
    }
  }

  &::before{
    content: " ";
    width: 10px;
    height: 1.5rem;
    position: absolute;

    background: var(--yellow-150);
    right: -1rem;
  }

  &::after{
    content: " ";
    width: 6px;
    height: 1.5rem;
    position: absolute;

    background: var(--yellow-150);
    right: -2rem;
  }

  @media(max-width:1232px){
    height: 3rem;

    &::before,&::after{
      height: 2.5rem;
    }
  }

  @media(max-width:889px){
    height: 2.5rem;
    
    &::before,&::after{
     
    }
  }
`;

export const WaitingTeacher = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  justify-content:center;
  .image-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
    padding: 0.5rem;
  }
`;
