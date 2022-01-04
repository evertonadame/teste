import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
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
  align-items: center;
  flex-direction: column;
  height: 1.5rem;
  width: 50%;
  padding: 0 1rem 0 0;
  margin-left: -6rem;
  z-index: -1;
  background: var(--yellow-150);
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-family: 'Roboto',sans-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: -2rem;
    
  }

  .content{
    height: 1.5rem;
    width: 100%;
    margin-left: auto;
    text-align: right;
    span{
      color: var(--black);
      font-weight: 400;
      font-size: 1.25rem;
      margin-left:4rem ;
      line-height: 1.5rem;
      letter-spacing: 0.32px;
      width: 100%;
      margin-top: 0.3rem;

      @media(max-width: 320px) {
        font-size:1rem;
      }
    }
    p{
      color: var(--yellow-150);
      margin: 0.5rem 0 0 2rem;
      text-align: right;
    }
  }

  &::before{
    content: " ";
    width: 10px;
    height: 2rem;
    position: absolute;

    background: var(--yellow-150);
    right: -1rem;
  }

  &::after{
    content: " ";
    width: 6px;
    height: 2rem;
    position: absolute;

    background: var(--yellow-150);
    right: -2rem;
  }


  @media(max-width:889px){
    height: 1.6rem;
  
  }
`;
