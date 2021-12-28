import { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { DropdownMenu } from 'styles/pages/TeacherDropDown';
import { useDoubt } from 'hooks/doubts';
import { useWs } from 'hooks/ws';
import { withSSRAuth } from 'components/withSSRAuth';

import { BackButton } from 'components/Atoms/BackButton';
import { Seo } from 'components/Atoms/Seo';
import { TeacherCard } from 'components/Atoms/TeacherCard';
import { Tooltip } from 'components/Atoms/Tooltip';

import { TimerDivider } from 'components/Mols/TimerDivider';

import {
  Container, Heading, Content, YellowBar, WaitingTeacher,
} from 'styles/pages/teacherList';
import { DoubtTeacherItemDTO } from 'types/dtos/subjectDTOS';

type TeacherListProps = {
  subject: {
    name: string;
    img: string;
  };
  doubtId: string;
}

const TeacherList = ({ subject, doubtId }: TeacherListProps): JSX.Element => {
  const [teacherList, setTeacherList] = useState<DoubtTeacherItemDTO[]>([]);

  const { push } = useRouter();

  const { listSubjectsByDoubtId, changeDoubtStatus, isLoading } = useDoubt();
  const {
    recievedMessage, resetRecievedMessage,
  } = useWs();

  const handleCancelDoubt = async ():Promise<void> => {
    await changeDoubtStatus(
      doubtId,
      'Canceled',
      'student',
    );
    push('/');
  };

  useEffect(() => {
    listSubjectsByDoubtId(doubtId).then((response) => response && setTeacherList(response));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recievedMessage.type === 'backoff_doubt_teacher' && recievedMessage?.doubt_id === doubtId) {
      if (teacherList) {
        const updatedTeacherList = [...teacherList];
        const removedTeacher = { ...recievedMessage };
        delete removedTeacher.type;

        const removedTeacherIndex = updatedTeacherList.findIndex((t) => (
          removedTeacher.teacher_id === t.teacher_id
        ));

        if (removedTeacherIndex > -1) {
          updatedTeacherList.splice(removedTeacherIndex, 1);

          setTeacherList(updatedTeacherList);
        }
      }

      resetRecievedMessage();
    }

    if (recievedMessage.type === 'post_doubt_teacher' && recievedMessage?.doubt_id === doubtId) {
      const updatedTeacherList = [...teacherList];
      const newTeacher = { ...recievedMessage };
      delete newTeacher.type;

      updatedTeacherList.push(newTeacher);
      setTeacherList(updatedTeacherList);

      resetRecievedMessage();
    }

    if (recievedMessage.type === 'availability_changed') {
      const updatedTeacherList = [...teacherList];
      const updatedTeacher = updatedTeacherList.find((
        teacher,
      ) => teacher.teacher_id === recievedMessage.user_id);

      if (updatedTeacher) {
        updatedTeacher.teacher_info.availability = recievedMessage.availability;

        setTeacherList(updatedTeacherList);
      }
      resetRecievedMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessage]);

  return (
    <Container>
      <Seo title="Lista de professores | Uber de plantões" metaDesc="Created by thl dev" />
      <div className="doubt-actions">
        <div className="doubt-wrapper">
        <BackButton backToHome noText />
        <div className="title">
          <Image
            src={`/assets/svgs/${subject.img}.svg`}
            width={30}
            height={30}
            layout="fixed"
            objectFit="contain"
            className="icon"
          />
          <p>{subject.name}</p>
        </div>
        </div>
        <div className="duvida-wrapper">
        <Tooltip
          title="ATENÇÃO! Você irá cancelar a dúvida"
          beforeColor="#c53030"
          style={{
            backgroundColor: '#c53030',
            color: '#fff',
            fontWeight: 'bold',
           
          }}
        >
          <button
            type="button"
            onClick={handleCancelDoubt}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : (
              <>
                <FaTimesCircle size={20} />
                Cancelar dúvida
              </>
            )}
          </button>
        </Tooltip>
        <DropdownMenu/>
        </div>


      </div>
    
      <Heading>
     
        <TimerDivider />
        <YellowBar>
          <div className="content">
            <span>SELECIONE O PROFESSOR</span>
          </div>
        </YellowBar>
      </Heading>
      <Content>
        {teacherList.map((item) => (
          <TeacherCard
            key={item.teacher_id}
            teacher={item.teacher_info}
            additionalInfo={item.teacher_subject}
            doubtId={item.doubt_id}
          />
        ))}
        <WaitingTeacher>
          <p>
            {teacherList.length < 1 ? 'Aguardando professores...' : 'Aguardando mais professores...'}
          </p>
          <div className="image-wrapper">
            <Image
              src="/assets/gifs/logoLoading.gif"
              width={24}
              height={24}
              layout="fixed"
              objectFit="contain"
              className="icon"
            />
          </div>
        </WaitingTeacher>
      </Content>
    </Container>
  );
};

export default TeacherList;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { query } = ctx;

  const doubtId = query.doubtid as string;
  const formatedSubjectName = String(query.subject).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (!doubtId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return ({
    props: {
      subject: {
        name: query.subject,
        img: formatedSubjectName,
      },
      doubtId,
    },
  });
});
