import {
  useEffect, useState, useMemo, memo,
} from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DoubtInfoDTO } from 'types/dtos/subjectDTOS';
import { useAuth } from 'hooks/auth';
import { useChat } from 'hooks/chat';
import { useCountdown } from 'hooks/countdown';
import { useDoubt } from 'hooks/doubts';
import { convertSecondsToHourMinuteSecond } from 'utils/functions';
import { BackButton } from 'components/Atoms/BackButton';
import { Tooltip } from 'components/Atoms/Tooltip';
import { UserStatus } from 'components/Atoms/UserStatus';
import { Loading } from 'components/Atoms/Loading';
import { DropdownMenu } from '../../Atoms/DropdownMenu';
import {
  Container, ChatHeader, UserInfoContainer, TimerContainer, EndDoubtButton, ImgChamadaVideo
} from './styles';

type HeadingProps = {
  doubtInfo: DoubtInfoDTO;
  localLoading?: boolean;
  handleOpenMeets(): Promise<void>;
}

export const Heading = memo(
  ({ doubtInfo, localLoading = false, handleOpenMeets }: HeadingProps): JSX.Element => {
    const [participantAvailability, setParticipantAvailability] = useState('online' as 'online' | 'busy' | 'offline' | 'away');

    const isChatDisabled = useMemo(() => doubtInfo.status === 'Completed', [doubtInfo]);

    const { push } = useRouter();

    const { user } = useAuth();
    const { recievedMessage, resetRecievedMessage } = useChat();
    const { endDoubt, buttonIsLoading } = useDoubt();
    const {
      formatedStopwatchTime,
      stopWatchTime,
      handleSetStopwatchValue,
      handleSetCountdownValue,
      toggleCountdown,
    } = useCountdown();

    const getParticipantImage = (): string => {
      if (user.profileId === 'Teacher') {
        if (doubtInfo && doubtInfo.student_info && doubtInfo.student_info.image_url && doubtInfo.student_info.image_url !== ' ') {
          return doubtInfo.student_info.image_url;
        }
      } else if (doubtInfo && doubtInfo.teacher_info && doubtInfo.teacher_info.image_url && doubtInfo.teacher_info.image_url !== ' ') {
        return doubtInfo.teacher_info.image_url;
      }

      return 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png';
    };

    const handleFinishChat = async (): Promise<void> => {
      await endDoubt(
        doubtInfo.doubt_id,
        'Completed',
      );
      toggleCountdown(false);
      handleSetStopwatchValue(0);
      handleSetCountdownValue(0);
      push(`/rating/${doubtInfo.doubt_id}`);
    };

    const buyMoreCredits = ():void => {
      console.log('buy more credits function');
    };

    const getTimeLeft = useMemo(() => {
      const estimatedAttendenceTime = Math.floor(
        user.wallet.balance / doubtInfo.teacher_subject.price,
      );
      const timeToEnd = ((estimatedAttendenceTime * 60) - (stopWatchTime ?? 0)) < 0 ? 0
        : (estimatedAttendenceTime * 60) - (stopWatchTime ?? 0);

      const timeLabel = convertSecondsToHourMinuteSecond(timeToEnd, { onlyHoursNMinutes: true });

      return (
        <p className={`${timeToEnd <= 120 ? 'danger' : ''}`}>
          {timeLabel !== 'xx' ? 'Voce ainda tem' : 'Seu tempo acabou'}
          {' '}
          {timeLabel !== 'xx' ? timeLabel : ''}
        </p>
      );
    }, [stopWatchTime, doubtInfo.teacher_subject.price, user.wallet.balance]);

    useEffect(() => {
      if (recievedMessage.type === 'availability_changed') {
        setParticipantAvailability(recievedMessage.availability);
        resetRecievedMessage();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recievedMessage]);

    return (
      <Container>
        <ChatHeader>
          <BackButton backToHome noText />
          <UserInfoContainer>
            <div className="user">
              <div className="img-wrapper">
                <div className="img">
                  <Image
                    src={getParticipantImage()}
                    width={46}
                    height={46}
                    layout="intrinsic"
                    objectFit="cover"
                  />
                </div>
                <UserStatus status={participantAvailability} />
              </div>
              <div className="user-info-wrapper">
                <p>{user.profileId !== 'Teacher' ? doubtInfo.teacher_info.nick_name : doubtInfo.student_info.nick_name}</p>
                <div className="subject">
                  <div className="subject-icon">
                    <Image
                      src={`/assets/svgs/${String(doubtInfo?.subject_id).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.svg`}
                      width={18}
                      height={18}
                      layout="fixed"
                      objectFit="contain"
                    />
                  </div>
                  <p className="subject-title">{doubtInfo?.subject_id}</p>
                </div>
              </div>
            </div>
            {!isChatDisabled && (
              <EndDoubtButton onClick={handleFinishChat}>
                <Tooltip style={{ color: '#000' }} title="ATENÇÃO, você irá finalizar o atendimento.">
                  {buttonIsLoading ? 'Finalizando...' : 'Finalizar Chamado'}
                </Tooltip>
              </EndDoubtButton>
            )}
          </UserInfoContainer>
        </ChatHeader>
        {!isChatDisabled && (
          <>
            {user.profileId !== 'Student' && (
            <div className={`google-meets-icon ${localLoading ? 'disabled' : ''}`}>
              {localLoading ? (
                <Loading size={1} />
              ) : (
                <ImgChamadaVideo 
                  src="/assets/svgs/videocam.svg"
                
                  onClick={handleOpenMeets}
                />
              )}
            </div>
            )}
            <TimerContainer className={`${user.profileId === 'Teacher' ? 'teacher' : ''}`}>
              <Image
                src="/assets/svgs/relogio.svg"
                width={40}
                height={40}
                layout="fixed"
                objectFit="contain"
                className="test"
              />
              <div className="time-info">
                <div className="time-left-row">
                  <p>{formatedStopwatchTime}</p>
                  <Tooltip title="Tempo corrido desde o inicio do atendimento.">
                    <FaQuestionCircle size={16} />
                  </Tooltip>
                </div>
                <div className="time-left-row">
                  {user.profileId !== 'Teacher' && (
                  <>
                    {getTimeLeft}
                    <Tooltip title="Com base na sua quantidade de créditos, esse é o tempo restante que você tem de atendimento.">
                      <FaQuestionCircle size={16} />
                    </Tooltip>
                  </>
                  )}

                </div>
              </div>
            </TimerContainer>
            <DropdownMenu
              buyMoreCredits={buyMoreCredits}
              isLoading={buttonIsLoading}
            />
          </>
        )}
      </Container>
    );
  },
);
