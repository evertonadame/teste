import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p{
    opacity: 0.6;
  }

  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.625rem;
    height: 2.625rem;

    border-radius: 0.25rem;

    background: var(--dark-purple);
  }

  transition: filter 0.2s;

  &:hover{
    cursor: pointer;
    filter: brightness(0.6);
  }
`;
