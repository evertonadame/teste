import { useEffect, useState } from 'react';

import { useDoubt } from 'hooks/doubts';
import { DoubtInfoDTO } from 'types/dtos/subjectDTOS';

import { Seo } from 'components/Atoms/Seo';

import { MyChat } from 'components/Orgs/MyChat';

import { withSSRAuth } from 'components/withSSRAuth';

import { Container, ChatContainerr } from 'styles/pages/chat';
import { useChat } from 'hooks/chat';
import { useWs } from 'hooks/ws';
import { useCountdown } from 'hooks/countdown';
import { useAuth } from 'hooks/auth';

type ChatProps = {
  doubtid: string;
}

const Chat = ({ doubtid }: ChatProps): JSX.Element => {
  const [doubtInfo, setDoubtInfo] = useState<DoubtInfoDTO>();

  const { getDoubtInfoByDoubtUuid } = useDoubt();
  const { openConnection, closeConnection } = useChat();
  const { closeConnection: wsCloseConnection } = useWs();
  const { handleSetCountdownValue, handleSetStopwatchValue, toggleCountdown } = useCountdown();
  const { user } = useAuth();

  useEffect(() => {
    wsCloseConnection();
    openConnection();
    getDoubtInfoByDoubtUuid(doubtid).then((res) => {
      setDoubtInfo(res);
      let estimatedAttendenceTime;

      if (user.profileId !== 'Teacher') {
        estimatedAttendenceTime = Math.floor(
          user.wallet.balance / Number(res?.teacher_subject.price ?? 1),
        );
      } else {
        estimatedAttendenceTime = Math.floor(res?.student_estimated_timer ?? 1);
      }

      if (res?.start_timestamp) {
        const startDate = new Date(res.start_timestamp);
        const endDate = new Date();
        const seconds = (endDate.getTime() - startDate.getTime()) / 1000;

        if (Math.floor(seconds) < (estimatedAttendenceTime * 60)) {
          handleSetCountdownValue(estimatedAttendenceTime * 60);
          handleSetStopwatchValue(Math.floor(seconds));
        } else {
          handleSetStopwatchValue(estimatedAttendenceTime * 60);
          handleSetCountdownValue(estimatedAttendenceTime * 60);
        }
      }
    });
    return () => {
      closeConnection();
      toggleCountdown(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubtid]);

  return (
    <Container>
      <Seo title="Chat | Uber de plantões" metaDesc="Created by thl dev" />
      <ChatContainerr>
        {doubtInfo && (
          <MyChat doubtInfo={doubtInfo} />
        )}
      </ChatContainerr>
    </Container>
  );
};

export default Chat;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { doubtid } = ctx.query;

  return ({
    props: {
      doubtid,
    },
  });
});
