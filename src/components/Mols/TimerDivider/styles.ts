import styled, { css } from 'styled-components';
import { Button } from 'components/Atoms/Button';

interface ContainerProps {
 hasTimer: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  min-width: 300px;
  
  @media(max-width: 768px){
    display: none;
  }
  &::before{
    display: flex;
    margin-top: 1rem;
    margin-left: -15rem;

    width: 80%;
    height: 2px;
    content: '';

    background: var(--purple-110);
    border-radius: 0.5rem;
  }

  .img-container{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 10%;
    height: 4.5rem;
    margin-top: -1rem;
    padding-left: 0.5rem;

    border-radius: 0.375rem 0 0 0.375rem;
    border-left: solid 2px var(--purple-110);
    border-top: solid 2px var(--purple-110);
    border-bottom: solid 2px var(--purple-110);

    @media screen and (max-width: 768px) {
      width: 20%
    }
    .test{
      margin-left: 0.25rem;
    }
  }

  ${(props) => !props.hasTimer && css`
    .img-container{
      opacity: 0;
    }
    &::before{
      width: 32%;
    }
  `}

  @media (max-width: 1140px){
    margin-top: 2rem;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 20%;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: -1rem;
  min-width: 85px;

  @media(max-width: 768px){
    display: none;
  }
  font-family: "Roboto", sans-serif;

  p{
    font-size: 1rem;
    line-height: 1.15rem;
    font-weight: 300;
  }

  span{
    font-size: 1.25rem;
    line-height: 1.45rem;
    font-weight: 500;
    margin: 0;
    margin-top: 3px;

  }
`;

export const StyledButton = styled(Button)`
  width: 13.75rem;
  height: 3rem;
  font-size: 0.75rem;
  border-radius: 0.625rem;
`;
