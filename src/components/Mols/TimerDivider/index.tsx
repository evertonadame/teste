import Image from 'next/image';

import { Container, TimerContainer, StyledButton } from './styles';

type TimerDividerProps = {
  hasTimer?: boolean;
}

export const TimerDivider = ({ hasTimer = true }:TimerDividerProps): JSX.Element => (
  <Container hasTimer={hasTimer}>
    <div className="img-container">
      <Image
        src="/assets/svgs/relogio.svg"
        width={40}
        height={40}
        layout="fixed"
        objectFit="contain"
        className="test"
      />
    </div>
    {hasTimer && (
      <>
        <TimerContainer>
          <p>Você ainda tem <span>2h 30min</span> </p>
          
        </TimerContainer>
        <StyledButton
          onClick={() => console.log('oi')}
          outlined
          type="button"
        >
          QUERO MAIS TEMPO
        </StyledButton>
      </>
    )}
  </Container>
);
