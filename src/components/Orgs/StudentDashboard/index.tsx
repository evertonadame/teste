import { useEffect, useState } from 'react';

import { DashboardDTO } from 'types/dtos/subjectDTOS';
import { useDoubt } from 'hooks/doubts';

import { SubjectsList } from 'components/Mols/SubjectsList';

import { YellowBar } from 'styles/pages/dashboard';
import { Container } from './styles';

export const StudentDashboard = (): JSX.Element => {
  const [dashboard, setDashboard] = useState<DashboardDTO>();

  const { getDashboard, isLoading } = useDoubt();

  const callDashboard = async (): Promise<void> => {
    const response = await getDashboard();
    response && setDashboard(response);
  };

  useEffect(() => {
    callDashboard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <YellowBar>
        <div className="content">
          <span>SELECIONE UMA DISCIPLINA</span>
          <p>para começar o plantão</p>
        </div>
      </YellowBar>
      <SubjectsList dashboard={dashboard} isLoading={isLoading} />
    </Container>
  );
};
