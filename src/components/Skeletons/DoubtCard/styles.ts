import styled from 'styled-components';

import Skeleton from '../styles';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 5rem;

  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--wine);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);

  margin-bottom: 1rem;

  .info{
    flex: 1;

    .title{
      width: 100%;
      height: 1.15rem;
    }

    .text{
      width: 80%;
      height: 1rem;
      margin-top: 1rem;
    }
  }

  .img-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.4;

    .img{
      width: 3rem;
      height: 3rem;

      border-radius: 1.5rem;
    }
  }
`;

export const Label = styled(Skeleton)`
`;
