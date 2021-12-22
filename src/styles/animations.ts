import { keyframes } from 'styled-components';

export const rainbowBg = keyframes`
  0% { background-position: 0% 25% }
  25% { background-position: 50% 75% }
  50% { background-position: 100% 75% }
  75% { background-position: 50% 25% }
  100% { background-position: 25% 0% }
`;
