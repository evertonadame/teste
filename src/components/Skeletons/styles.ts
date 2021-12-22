import styled from 'styled-components';

interface SkeletonProps {
  animationDelay?: number;
}

export default styled.div<SkeletonProps>`
  transition: background-color 0.4s;

  animation: shimmer2 3s ease-in-out infinite;

  animation-delay: ${(props) => (props.animationDelay ? props.animationDelay : 0)}s;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
  @keyframes shimmer2 {
    0% {
      background: rgba(61, 61, 61, 0);
    }
    50% {
      background: rgba(133, 133, 133, 0.4);
    }
    100% {
      background: rgba(61, 61, 61, 0);
    }
  }
`;
