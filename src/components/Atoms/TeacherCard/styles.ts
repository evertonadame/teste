import styled, { css } from 'styled-components';

interface ContainerProps {
  isLoading: boolean;
  collapsed: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;

  width: 21rem;
  height: 5.625rem;

  padding: 2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  border-radius: 0.625rem;
  border: solid 1px var(--purple-110);
  transition: height .2s;

  background: var(--dark-100-purple-opacity-60);

  @media(max-width: 768px) {
    width: 100%;
  }
  .wrapper{
    position: relative;

    display: flex;
    align-items: center;
    width: 100%;
  }

  .user-status-container{
    position: relative;
  }

  .img-container{
    width: 50px;
    height: 50px;

    border-radius: 25px;
    overflow: hidden;
  }

  .content{
    margin-left: 0.825rem;

    p{
      font-size: 0.75rem;
      color: var(--gray-200);
      margin-top: 0.425rem;
    }
  }

  .collapse-button{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;

    background: var(--gray-50);

    border: solid 1px var(--gray-50);
    border-radius: 0.625rem;

    bottom: -0.625rem;
    left: 50%;
    transition: filter .2s, transform .2s;

    svg{
      color: var(--black);
    }

    &:hover{
      cursor: pointer;
      filter: opacity(0.6);
    }
  }

  ${(props) => props.collapsed && css`
    height: 12rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;

    padding: 0.825rem 2rem 1.5rem 2rem;

    .collapse-button{
      transform: rotate(180deg);
    }
  `}

  ${(props) => props.isLoading && css`
    cursor: not-allowed;
    &:hover{
      cursor: not-allowed;
    }
  `}

  .estimated-time{
    font-size: 0.8rem;
    margin-left: 0.4rem;

    strong{
      text-decoration: underline;
    }
  }
`;

export const Stars = styled.div`
  >div{
    padding: 0 !important;
  }

  svg:not(.unmarked){
    color: var(--yellow-120);
  }
`;

export const Heart = styled.div`
  margin-left: auto;
  margin-top: -0.5rem;

  @keyframes pop {
    0% {transform: scale(1);}
    50% {transform: scale(1.2);}
    100% {transform: scale(1);}
  }

  .popped{
    animation: pop .4s;
  }

  svg{
    color: var(--pink);

    transition: opacity .2s;
    &:hover{
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
