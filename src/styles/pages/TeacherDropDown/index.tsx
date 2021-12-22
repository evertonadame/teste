import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
// Completed

import { Container, StyledButton } from './styles';

type DropdownMenuProps = {
  isLoading?: boolean;
}

export const DropdownMenu = ({
  isLoading = false,
}: DropdownMenuProps): JSX.Element => {

const [open, setOpen] = useState(false);

  return (
    <Container>
      <FaEllipsisV onClick={() => setOpen((state) => !state)} size={22} />
      <ul className={`options ${open ? 'menu-visible' : ''}`}>
        <StyledButton type="button" className="student-doubt" disabled={isLoading}>
          <li>{isLoading ? 'Carregando...' : ''}</li>
        </StyledButton>
      </ul>
    </Container>
  );

};
