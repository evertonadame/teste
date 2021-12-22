import { Container } from './styles';

type UserStatusProps = {
  status: 'online' | 'busy' | 'offline' | 'away';
  onClick?(): void;
}

export const UserStatus = ({ status, onClick }: UserStatusProps): JSX.Element => (
  <Container status={status} onClick={onClick} />
);
