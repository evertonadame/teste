import styled, { css } from 'styled-components';

interface SubjectsContainerProps {
  isLoading: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Content = styled.section<SubjectsContainerProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  row-gap: 0.5rem;
  margin-top: 4rem;
  padding: 1rem 3rem;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 1rem;
  }

  ${(props) => props.isLoading && css`
    justify-content: center;
    align-items: center;
  `}
`;
