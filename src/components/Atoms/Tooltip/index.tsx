import { HTMLAttributes } from 'react';
import { Container } from './styles';

interface TooltipProps extends HTMLAttributes<HTMLDivElement>{
  title?: string;
  className?: string;
  customStyle?: string;
  beforeColor?: string;
  color?: string;
  children: React.ReactNode;
}

export const Tooltip = ({
  children,
  className = '',
  beforeColor,
  title,
  ...rest
}: TooltipProps): JSX.Element => (
  <Container className={className} beforeColor={beforeColor}>
    {children}
    <span {...rest}>{title}</span>
  </Container>
);
