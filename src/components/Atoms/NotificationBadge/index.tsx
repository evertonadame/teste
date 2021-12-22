import { Container } from './styles';

type NotificationBadgeProps = {
  number: number;
  isAbsolute?: boolean;
}

export const NotificationBadge = ({ number, isAbsolute }:NotificationBadgeProps): JSX.Element => (
  <Container isAbsolute={isAbsolute}>
    <p>{number}</p>
  </Container>
);
