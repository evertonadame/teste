import Image from 'next/image';

import { Container } from './styles';

type HealthBarProps = {
  percentage: number;
  info: string;
}

export const HealthBar = ({ percentage, info }:HealthBarProps): JSX.Element => (
  <Container progress={percentage}>
    <div className="heart">
      <Image
        src="/assets/images/pixel-heart.png"
        width={36}
        height={36}
      />
    </div>
    <div className="inner">
      <p className="info">{info}</p>
    </div>
  </Container>
);
