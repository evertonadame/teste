import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

type BackButtonProps = {
  backToHome?: boolean;
  noText?: boolean;
}

export const BackButton = ({ backToHome = false, noText = false }:BackButtonProps): JSX.Element => {
  const { back, push } = useRouter();

  return (
    <Container onClick={() => (backToHome ? push('/') : back())}>
      <div className="icon">
        <FiArrowLeft size={16} />
      </div>
      {!noText && <p>voltar</p>}
    </Container>
  );
};
