import { ButtonHTMLAttributes } from 'react';

import { Loading } from 'components/Atoms/Loading';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
  outlined?: boolean;
};

export const Button = ({
  children,
  outlined = false,
  loading = false,
  ...rest
}: ButtonProps): JSX.Element => (
  <Container
    outlined={outlined}
    disabled={loading}
    {...rest}
  >
    {loading ? <Loading size={1.5} /> : children}
  </Container>
);
