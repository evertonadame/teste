import styled from 'styled-components';

interface UserContainerProps {
  bg: string;
}

export const HeaderCont = styled.header`
  background: linear-gradient(to bottom, #800080 10%, transparent);
  @media(max-width: 768px){
    height: 90px;
    width: 100%;
    background: linear-gradient(to bottom, #800080 49%, transparent);


    .saparator-header {
      @media(max-width: 768px) {
        display: none;
      }
    }
  }

`
export const ImgContainer1 = styled.img`
      margin: 0.5rem;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      @media(min-width: 769px) {
        display: none;
      }

 
`
export const ImgContainer2 = styled.img`
      margin-right: 2rem;
      margin-left: -0.5rem;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      margin-top: 0.5rem;
      @media(max-width: 768px) {
        display: none;
      }

`
export const UserSchoolInfo = styled.div`
  color: var(--gray-150);
  margin-left: 1rem;
  span{
    font-size: 16px;
  }
  p{
    font-size: 14px;
  }
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;