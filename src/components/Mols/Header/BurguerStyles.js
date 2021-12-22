import styled from 'styled-components';

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 20;
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
  justify-content: right;
  flex-flow: row nowrap;
  align-items: center;

  
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
    z-index: 2;
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
      
    }
  }
  @media (min-width: 1024px) {
    padding-left: 14%;
    justify-content: left;
    padding-top: 1%;
    padding-bottom: 2%;
    
  }
  @media (min-width: 1024px) {
    li {
      margin-right: 3rem;

    }
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
`
export const DrescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  
  @media (min-width: 1024px) {
    position: absolute;
    right: 3%;
    top: 7%;
  }
`;
export const CarteiraContainer = styled.div`
 
`;