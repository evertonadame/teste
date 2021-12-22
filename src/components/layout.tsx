import { useEffect } from 'react';
import { Header } from 'components/Mols/Header';
import { useWs } from 'hooks/ws';

type LayoutProps = {
  children: React.ReactNode;
}

export const Layout = ({ children }:LayoutProps): JSX.Element => {
  const { closeConnection } = useWs();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => closeConnection(), []);
  return (
    <div className="layout">
      <Header tabs={[{ key: 'teste', value: 'Teste' }]} />
      {children}
    </div>
  );
};
