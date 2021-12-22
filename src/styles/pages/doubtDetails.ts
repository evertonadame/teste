import styled, { css } from 'styled-components';

interface OpenChatButtonProps {
  danger: boolean;
  isLoading: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.8rem 5rem;

  width: 100%;
  height: 80%;
`;

export const Heading = styled.header`
  display: flex;
  
  background: var(--dark-125-purple);

  padding: 0.675rem;
  border-radius: 0.35rem 0.35rem 0 0;
  box-shadow: inset 0 0 14px rgba(0,0,0,0.4);

  .student-info{
    display: flex;
    gap: 1rem;
    align-items: center;
    flex: 1;
    padding: 0 1rem;

    .img{
      width: 3rem;
      height: 3rem;

      border-radius: 1.5rem;

      overflow: hidden;
    }

    .school-info{
      display: flex;
      flex-direction: column;
      gap: 0.125rem;

      p,span{
        color: var(--gray-150);
      }
    }
  }
`;

export const Content = styled.section`
  display: flex;
  gap: 1rem;
  border-radius: 0 0 0.35rem 0.35rem;

  padding: 1rem;
  background: var(--dark-100-purple);
  word-wrap: break-word;

  width: 100%;
  height: 100%;

  .text,.img{
    padding: 2rem;
  }

  .text{
    width: 65%;
    flex-wrap: wrap;
    box-shadow: inset 0 0 14px rgba(0,0,0,0.4);
    border-radius: 0.35rem;
  }
  .img{
    position: relative;
    width: 35%;

    .doubt-img{
      transition: transform .2s;
      border: solid 1px red;
      &:hover{
        cursor: pointer;
        transform: scale(1.08);
      }
    }
  }
`;

export const OpenChatButton = styled.button<OpenChatButtonProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 12rem;
  border: none;

  margin-left: auto;
  transition: filter .2s;
  background: var(--aqua);
  padding: 0.625rem;
  border-radius: 0.25rem;

  ${(props) => props.danger && css`
    background: var(--danger);
  `}

  ${(props) => props.isLoading && css`
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  `}

  &:hover{
    cursor: pointer;
    filter: brightness(0.6);
  }
`;
