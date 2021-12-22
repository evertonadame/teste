import { FaPaperPlane } from 'react-icons/fa';
import { parseCookies } from 'nookies';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { api } from 'services/apiClient';
import { DoubtInfoDTO } from 'types/dtos/subjectDTOS';
import { User } from 'types/AuthModels';
import { translateLevelId, translatePhaseId } from 'utils/functions';

import { withSSRAuth } from 'components/withSSRAuth';

import {
  Container, Heading, Content, OpenChatButton,
} from 'styles/pages/doubtDetails';
import { useDoubt } from 'hooks/doubts';
import { Loading } from 'components/Atoms/Loading';

type DetailsPageProps = {
  doubtId: string;
  doubtInfo: DoubtInfoDTO;
}

const Details = ({ doubtId, doubtInfo }: DetailsPageProps): JSX.Element => {
  const { push } = useRouter();
  const { changeDoubtStatus, buttonIsLoading } = useDoubt();

  const handleTakeAction = async (): Promise<void> => {
    if (doubtInfo.status === 'StudentAccepted') {
      push(`/chat?doubtid=${doubtInfo.doubt_id}`);
    } else if (doubtInfo.status === 'TeacherAccepted') {
      await changeDoubtStatus(
        doubtId,
        'TeacherBackOff',
        'teacher',
      );
      push('/dashboard');
    } else if (doubtInfo.status === 'Completed') {
      push('/doubt-rating');
    } else {
      await changeDoubtStatus(doubtInfo.doubt_id, 'TeacherAccepted', 'teacher');
      push('/dashboard');
    }
  };

  return (
    <Container>
      <Heading>
        <div className="student-info">
          <div className="img">
            <Image
              src={doubtInfo.student_info.image_url !== ' ' ? doubtInfo.student_info.image_url : 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png'}
              width={48}
              height={48}
              layout="intrinsic"
              objectFit="contain"
              className="icon"
            />
          </div>
          <div className="school-info">
            <h4>{doubtInfo.student_info.nick_name}</h4>
            <p>{translateLevelId(doubtInfo.student_info.level_id ?? '')}</p>
            <span>{translatePhaseId(doubtInfo.student_info.phase_id ?? '')}</span>
          </div>
          <OpenChatButton
            onClick={handleTakeAction}
            danger={doubtInfo.status === 'TeacherAccepted'}
            isLoading={buttonIsLoading}
            disabled={buttonIsLoading}
          >
            {buttonIsLoading ? (
              <Loading size={1.2} />
            ) : (
              <>
                <FaPaperPlane size={20} />
                {doubtInfo.status === 'StudentAccepted' && <p>Chat</p>}
                {doubtInfo.status === 'TeacherAccepted' && <p>Cancelar Atendimento</p>}
                {doubtInfo.status === 'WaitingTeacher' && <p>Aceitar questão</p>}
                {doubtInfo.status === 'Completed' && <p>Avaliação</p>}
              </>
            )}
          </OpenChatButton>
        </div>
      </Heading>
      <Content>
        <div className="text">
          {doubtInfo.text}
        </div>
        {(doubtInfo && doubtInfo.image_url !== ' ') && (
          <div className="img">
            <a href={doubtInfo.image_url} target="_blank" rel="noopener noreferrer">
              <Image
                src={doubtInfo.image_url}
                layout="fill"
                objectFit="contain"
                className="doubt-img"
              />
            </a>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Details;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { doubtid } = ctx.query;
  const { 'uberPlantao.user': user, 'uberPlantao.token': token } = parseCookies(ctx);

  const parsedUser = JSON.parse(user) as User;

  const doubtInfo = await api.get<DoubtInfoDTO>(`/doubt/info?user_id=${parsedUser.userId}&doubt_id=${doubtid}`, {
    headers: {
      authorization: token,
    },
  });

  return ({
    props: {
      doubtId: doubtid,
      doubtInfo: doubtInfo.data,
    },
  });
});
