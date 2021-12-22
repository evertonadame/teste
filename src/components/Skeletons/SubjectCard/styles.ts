import styled from 'styled-components';

import Skeleton from '../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 9.75rem;
  height: 8.5rem;
  gap: 1rem;

  font-family: 'Roboto', sans-serif;

  border: solid 1px var(--purple);
  border-radius: 0.625rem;

  

  .img{
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
  }

  .title{
    width: 60%;
    height: 1rem;
  }
`;

export const Label = styled(Skeleton)`
`;
