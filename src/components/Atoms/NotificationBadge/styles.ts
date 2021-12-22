import styled from 'styled-components';

interface BadgeProps {
  isAbsolute?: boolean;
}

export const Container = styled.div<BadgeProps>`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  top: 10%;
  right: 30%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.625rem;
  background: red;

  p{
    font-size: 0.825rem;
  }
`;
