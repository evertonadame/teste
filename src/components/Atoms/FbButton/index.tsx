import { ButtonHTMLAttributes, useState } from 'react';
import { FiFacebook } from 'react-icons/fi';

import { Container } from './styles';

type FbButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const FbButton = ({ ...rest }: FbButtonProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      isHovered={isHovered}
      {...rest}
    >
      <FiFacebook size={20} />
    </Container>
  );
};
