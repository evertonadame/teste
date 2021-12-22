import styled from 'styled-components';

interface UserContainerProps {
  bg: string;
}

export const HeaderCont = styled.header`
  background: linear-gradient(to bottom, #800080 10%, transparent);
  @media(max-width: 768px){
    height: 75px;
    width: 100%;
    background: linear-gradient(to bottom, #800080 49%, transparent);
  }

`
export const ImgContainer = styled.img`
      position: absolute;
      width: 4rem;
      height: 4rem;
      left: 4%;
      top: 1%;

    @media (min-width: 1024px) {
      top: 5%;
      left: 7%;
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