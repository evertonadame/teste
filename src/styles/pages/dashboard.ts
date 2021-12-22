import styled from 'styled-components';

export const Container = styled.div`
  height: calc(70vh - 122px);
  padding: 1.8rem 1rem;
  transition: padding .2s;
 

 @media screen and (max-width: 768px) {
   padding: 0 1rem 1rem 1rem;
   height: 100%;
 }
`;

export const YellowBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  width: 35%;
  padding: 0 1rem 0 0;
  margin-left: -15rem;
  margin-bottom: 0.5rem;
  z-index: -1;

  background: var(--yellow-150);

  display: flex;
  flex-direction: column;

  font-family: 'Roboto',sans-serif;

  .content{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;

    margin-left: auto;

    span{
      color: var(--black);
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.5rem;
      letter-spacing: 0.32px;
      width: 100%;
    }

    p{
      color: var(--yellow-150);
      margin-bottom: -1.25rem;
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

  @media(max-width: 1300px){
    height: 3rem;
    margin-left: -6rem;

    .content{
      height: 3rem;
    }

    p{
      margin:0;
    }

    &::before,&::after{
      height: 3rem;
    }
  }

  @media screen and (max-width:768px){
    height: 1.5rem;
   
    margin-bottom: 2rem;
    margin-left: -4rem;
    width: 100%;
  
  }

   @media screen and (max-width:320px){
    margin-left: -2rem;
  }
`;
