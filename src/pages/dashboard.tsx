import { useEffect } from 'react';

import { useAuth } from 'hooks/auth';
import { useWs } from 'hooks/ws';

import { Seo } from 'components/Atoms/Seo';
import { withSSRAuth } from 'components/withSSRAuth';

import { StudentDashboard } from 'components/Orgs/StudentDashboard';
import { TeacherDashboard } from 'components/Orgs/TeacherDashboard';
import {
  Container,
} from '../styles/pages/dashboard';

const Dashboard = (): JSX.Element => {
  const { user } = useAuth();
  const { openConnection } = useWs();

  useEffect(() => {
    openConnection();

    // return () => closeConnection();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Seo title="Dashboard | Uber de plantões" metaDesc="Created by thl dev" />
      {user.profileId === 'Student' && (
        <StudentDashboard />
      )}
      {user.profileId === 'Teacher' && (
        <TeacherDashboard />
      )}
    </Container>
  );
};

export default Dashboard;
/**
 *Exemplo de req pelo servidor com o ctx indo pro setupApiClient pra configurar o TOKEN
 *
 *  export const getServerSideProps = withSSRAuth(async (ctx) => {
 *    const apiClient = setupAPIClient(ctx);
 *    const response = await apiClient.get('/');
 *
 *    return ({
 *      props: {},
 *    })
 *  });
 *
 */

export const getServerSideProps = withSSRAuth(async () => ({
  props: {},
}));
