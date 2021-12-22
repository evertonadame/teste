import { useEffect, useState } from 'react';

import { DashboardDTO } from 'types/dtos/subjectDTOS';
import { useDoubt } from 'hooks/doubts';
import { useWs } from 'hooks/ws';

import { DoubtsList } from 'components/Mols/DoubtsList';

import { YellowBar } from 'styles/pages/dashboard';

import { Container } from './styles';

export const TeacherDashboard = (): JSX.Element => {
  const [teacherDashboard, setTeacherDashboard] = useState<DashboardDTO>();

  const { getDashboard, isLoading, buttonIsLoading } = useDoubt();
  const { recievedMessage, resetRecievedMessage } = useWs();

  const callDashboard = async (): Promise<void> => {
    const response = await getDashboard();
    response && setTeacherDashboard(response);
  };

  useEffect(() => {
    callDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recievedMessage.type === 'post_student_doubt') {
      if (teacherDashboard) {
        const updatedTeacherDashboard = { ...teacherDashboard };
        const newDoubt = { ...recievedMessage };
        delete newDoubt.type;
        if (updatedTeacherDashboard.profiles) {
          updatedTeacherDashboard.profiles[0].user_profile.notAnswered.push(newDoubt);
          setTeacherDashboard(updatedTeacherDashboard);
        }
      }
      resetRecievedMessage();
    }
    if (recievedMessage.type === 'post_student_accepted') {
      if (teacherDashboard) {
        const updatedTeacherDashboard = { ...teacherDashboard };
        const newDoubt = { ...recievedMessage.doubt };
        const beforeDoubtUpdateIndex = updatedTeacherDashboard.profiles[0]
          .user_profile.accepted
          .findIndex((item) => item.doubt_id === recievedMessage.doubt.doubt_id);

        if (beforeDoubtUpdateIndex > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.accepted.splice(beforeDoubtUpdateIndex, 1);
        }
        updatedTeacherDashboard.profiles[0].user_profile.active.push(newDoubt);
        setTeacherDashboard(updatedTeacherDashboard);
      }

      resetRecievedMessage();
    }
    if (recievedMessage.type === 'post_doubt_teacher') {
      if (teacherDashboard) {
        const updatedTeacherDashboard = { ...teacherDashboard };
        const newDoubt = { ...recievedMessage.doubt };
        const beforeDoubtUpdateIndex = updatedTeacherDashboard.profiles[0]
          .user_profile.notAnswered
          .findIndex((item) => item.doubt_id === recievedMessage.doubt.doubt_id);

        if (beforeDoubtUpdateIndex > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.notAnswered.splice(beforeDoubtUpdateIndex, 1);
        }
        updatedTeacherDashboard.profiles[0].user_profile.accepted.push(newDoubt);
        setTeacherDashboard(updatedTeacherDashboard);
      }

      resetRecievedMessage();
    }
    if (recievedMessage.type === 'backoff_doubt_teacher') {
      if (teacherDashboard) {
        const updatedTeacherDashboard = { ...teacherDashboard };
        const newDoubt = { ...recievedMessage.doubt };
        const beforeDoubtUpdateIndex = updatedTeacherDashboard.profiles[0]
          .user_profile.accepted
          .findIndex((item) => item.doubt_id === recievedMessage.doubt.doubt_id);

        if (beforeDoubtUpdateIndex > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.accepted.splice(beforeDoubtUpdateIndex, 1);

          updatedTeacherDashboard.profiles[0].user_profile.notAnswered.push(newDoubt);
        }
        setTeacherDashboard(updatedTeacherDashboard);
      }

      resetRecievedMessage();
    }
    if (recievedMessage.type === 'post_student_canceled'
      || (recievedMessage.type === 'changed_doubt_status' && recievedMessage.status === 'Completed')
      || recievedMessage.type === 'post_student_not_accepted'
    ) {
      if (teacherDashboard) {
        const updatedTeacherDashboard = { ...teacherDashboard };

        const beforeDoubtUpdateIndexNotAnswered = updatedTeacherDashboard.profiles[0]
          .user_profile.notAnswered
          .findIndex((item) => item.doubt_id === recievedMessage.doubt_id);
        const beforeDoubtUpdateIndexAccepted = updatedTeacherDashboard.profiles[0]
          .user_profile.accepted
          .findIndex((item) => item.doubt_id === recievedMessage.doubt_id);
        const beforeDoubtUpdateIndexActive = updatedTeacherDashboard.profiles[0]
          .user_profile.active
          .findIndex((item) => item.doubt_id === recievedMessage.doubt_id);

        if (beforeDoubtUpdateIndexNotAnswered > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.notAnswered.splice(beforeDoubtUpdateIndexNotAnswered, 1);
        }
        if (beforeDoubtUpdateIndexAccepted > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.accepted.splice(beforeDoubtUpdateIndexAccepted, 1);
        }
        if (beforeDoubtUpdateIndexActive > -1) {
          updatedTeacherDashboard.profiles[0]
            .user_profile.active.splice(beforeDoubtUpdateIndexActive, 1);
        }
        setTeacherDashboard(updatedTeacherDashboard);
      }

      resetRecievedMessage();
    }

    if (recievedMessage.type === 'availability_changed') {
      const updatedTeacherDashboard = { ...teacherDashboard };
      if (updatedTeacherDashboard && !!updatedTeacherDashboard.profiles
        && updatedTeacherDashboard.profiles[0]) {
        const acceptedDoubtToUpdate = updatedTeacherDashboard.profiles[0]
          .user_profile.accepted.find((item) => item.user_id === recievedMessage.user_id);
        const notAnsweredDoubtToUpdate = updatedTeacherDashboard.profiles[0]
          .user_profile.notAnswered.find((item) => item.user_id === recievedMessage.user_id);
        const activeDoubtToUpdate = updatedTeacherDashboard.profiles[0]
          .user_profile.active.find((item) => item.user_id === recievedMessage.user_id);

        if (acceptedDoubtToUpdate) {
          acceptedDoubtToUpdate.student_info.availability = recievedMessage.availability;
        }
        if (notAnsweredDoubtToUpdate) {
          notAnsweredDoubtToUpdate.student_info.availability = recievedMessage.availability;
        }
        if (activeDoubtToUpdate) {
          activeDoubtToUpdate.student_info.availability = recievedMessage.availability;
        }

        if ((acceptedDoubtToUpdate || notAnsweredDoubtToUpdate || activeDoubtToUpdate)) {
          setTeacherDashboard(updatedTeacherDashboard as DashboardDTO);
        }
      }
    }

    if (recievedMessage.type === 'chat_message') {
      if (teacherDashboard) {
        const updatedTeacherdashboard = { ...teacherDashboard };

        const updatedDoubtCard = updatedTeacherdashboard.profiles[0]
          .user_profile.active
          .find((msg) => msg.doubt_id === recievedMessage.doubt_message.doubt_id);

        const updatedDoubtCardIndex = updatedTeacherdashboard.profiles[0]
          .user_profile.active
          .findIndex((msg) => msg.doubt_id === recievedMessage.doubt_message.doubt_id);

        if (updatedDoubtCard && updatedDoubtCardIndex >= 0) {
          updatedTeacherdashboard.profiles[0].user_profile
            .active[updatedDoubtCardIndex].last_doubt_message = recievedMessage.doubt_message;
          const updateBadges = updatedTeacherdashboard.profiles[0].user_profile
            .active[updatedDoubtCardIndex];

          updateBadges.badge_not_already_viewed = updateBadges.badge_not_already_viewed
            ? updateBadges.badge_not_already_viewed + 1 : 1;

          setTeacherDashboard(updatedTeacherdashboard);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessage]);

  return (
    <Container>
      <YellowBar>
        <div className="content">
          <span>SELECIONE UMA DÚVIDA</span>
          <p>para aceitar ou começar o plantão</p>
        </div>
      </YellowBar>
      <DoubtsList
        acceptedDoubts={teacherDashboard?.profiles[0]?.user_profile.accepted ?? []}
        activeDoubts={teacherDashboard?.profiles[0]?.user_profile.active ?? []}
        notAnsweredDoubts={teacherDashboard?.profiles[0]?.user_profile.notAnswered ?? []}
        isLoading={isLoading}
        buttonIsLoading={buttonIsLoading}
      />
    </Container>
  );
};
