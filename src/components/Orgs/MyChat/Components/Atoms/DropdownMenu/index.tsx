import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

// Completed

import { Container } from './styles';

type DropdownMenuProps = {
  buyMoreCredits(): void;
  isLoading?: boolean;
}

export const DropdownMenu = ({
  isLoading = false,
  buyMoreCredits,
}:DropdownMenuProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <FaEllipsisV onClick={() => setOpen((state) => !state)} size={22} />
      <ul className={`options ${open ? 'menu-visible' : ''}`}>
        <button type="button" onClick={buyMoreCredits} disabled={isLoading}>
          <li>
            {isLoading ? 'Carregando...' : 'Comprar mais créditos'}
          </li>
        </button>
      </ul>
    </Container>
  );
};
