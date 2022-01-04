import styled from 'styled-components';

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 25;
  display: none;
  
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

 
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? 'orange' : 'orange'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  .container-wrapper {
    @media (min-width: 769px) {
      display: flex;
      align-items:center;
    }
  }

  .wrapper-two {
     @media (min-width: 769px) {
      display: flex;
      align-items:center;
    }
  }
  
  li {
    text-align: right;
    
    padding-top: 1rem;
  }
 
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: linear-gradient(to top, #800080 93%, #35004b);
    position: fixed;
    align-items: normal;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    justify-content: right;
    z-index: 10;
    height: 100vh;
    width: 250px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      min-height: 5rem;
      color: white;
      border-bottom: 1px solid white;
      padding-right: .5rem;
      padding: 1rem;
      text-align: -webkit-right;
    }
  }
  @media (min-width: 769px) {
   
    padding: 0.5rem 5rem;
    
  }
  
  
 
`;

export const StyledButton = styled.button`
 color: var(--yellow-150);
  border: none;
  align-items: center;
  display: flex;
  border-radius: 5px;
  background: transparent;
  
  img{
    margin-left: 1rem;
  } 
`
export const ImgContainerStatus = styled.div`

  position: relative;
 
`
export const ImgUser = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;


`
export const StatusContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 1rem;


  .status-separator {
    display: flex;
  }
`
export const DrescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 0.3rem;
`;
export const CarteiraContainer = styled.div`
  padding: 0.5rem;
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,219,52,1) 0%);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  width: 50%;
  @media(min-width: 769px) {
    margin-right: 2rem;
    width: 90%
  }
`;