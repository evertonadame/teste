import { useEffect, useState, useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import Image from 'next/image';
import { FaQuestionCircle } from 'react-icons/fa';
import { useChat } from 'hooks/chat';
import { useAuth } from 'hooks/auth';
import { useCountdown } from 'hooks/countdown';
import { convertSecondsToHourMinuteSecond } from 'utils/functions';
import { api } from 'services/apiClient';
import { ChatMsgDTO } from 'types/dtos/chatDTO';
import { convertTimeStampToTimeLog } from 'utils/functions';
import { DoubtInfoDTO } from 'types/dtos/subjectDTOS';
import { Tooltip } from 'components/Atoms/Tooltip';
import { Loading } from 'components/Atoms/Loading';
import Header from 'components/Mols/Header';
import { Message } from './Components/Atoms/Message';

import { Heading } from './Components/Mols/Heading';
import { ChatActions } from './Components/Mols/ChatActions';

import {
  Container, ChatContainer, MessagesBox, TimerContainer
} from './styles';

type Query = {
  doubtid: string;
}

type MyChatProps = {
  doubtInfo: DoubtInfoDTO;
  opacity?: boolean;
}

export const MyChat = ({ doubtInfo, opacity }: MyChatProps): JSX.Element => {
  const [messages, setMessages] = useState<ChatMsgDTO>();
  const [imgUrl, setImgUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const {
    formatedStopwatchTime,
    stopWatchTime,
    handleSetStopwatchValue,
    handleSetCountdownValue,
    toggleCountdown,
  } = useCountdown();

  const isChatDisabled = useMemo(() => doubtInfo.status === 'Completed', [doubtInfo]);

  const { query, push } = useRouter();
  const {
    getLastMessages,
    recievedMessage,
    sendMessage,
    isLoading,
    sendGenericChatWsMessage,
    resetRecievedMessage,
    lastChatPage,
    handleSetChatPage,
  } = useChat();
  const { user } = useAuth();


  const { doubtid } = query as Query;

  const scrollBottom = (value?: number): void => {
    if (!value) {
      const messageBox = document.getElementById('messageBox');

      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
      }
    } else {
      const messageBox = document.getElementById('messageBox');

      if (messageBox) {
        messageBox.scrollTop = value;
      }
    }
  };

  const handleOpenMeets = async (): Promise<void> => {
    setLocalLoading(true);
    const response = await api.get<string>(`/doubt/teacher/videoconf?user_id=${user.userId}&doubt_id=${doubtInfo.doubt_id}`);

    if (messages) {
      const updatedMessages = { ...messages };
      const formatedMessage = {
        already_viewed: 'false',
        date: String(new Date().getTime()),
        doubt_id: doubtInfo.doubt_id,
        file_type: '',
        file_url: '',
        message: response.data,
        thumb_url: '',
        timestamp: new Date().getTime(),
        uuid: v4(),
        sender_id: user.userId,
      };
      updatedMessages.messages.push(formatedMessage);
      setMessages(updatedMessages);
    }

    setLocalLoading(false);
  };

  const handleSubmit = async (chatMessage: string): Promise<void> => {
    const myMsg = await sendMessage(chatMessage, doubtid, imgUrl);

    if (messages) {
      const updatedMessages = { ...messages };
      const formatedMessage = {
        already_viewed: 'false',
        date: String(new Date().getTime()),
        doubt_id: myMsg.doubt_id,
        file_type: myMsg.file_type,
        file_url: myMsg.file_url,
        message: myMsg.message,
        sender_id: myMsg.user_id,
        thumb_url: myMsg.thumb_url,
        timestamp: new Date().getTime(),
        uuid: myMsg.uuid,
      };
      updatedMessages.messages.push(formatedMessage);
      setMessages(updatedMessages);
      setImgUrl('');
      scrollBottom();
    }
  };

  useEffect(() => {
    getLastMessages(doubtid).then((res) => {
      setTimeout(() => {
        sendGenericChatWsMessage(
          { type: 'already_viewed' },
          'already_viewed',
          doubtid,
        );
      }, (550));
      handleSetChatPage(res.timestamp);

      // console.log(res);
      setMessages(res);
      toggleCountdown(true);
      scrollBottom();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messageBox = document.getElementById('messageBox');

    // eslint-disable-next-line max-len
    const isBottom = messageBox && (messageBox?.scrollHeight - (messageBox?.scrollTop + messageBox?.offsetHeight) > 30);

    
    if (recievedMessage.type === 'chat_message') {
      setTimeout(() => {
        sendGenericChatWsMessage(
          { type: 'already_viewed' },
          'already_viewed',
          doubtid,
        );
      }, 400);

      if (messages) {
        const updatedMessages = { ...messages };
        const updatedDoubtMessage = recievedMessage.doubt_message;
        updatedDoubtMessage.already_viewed = 'true';
        updatedMessages.messages.push(updatedDoubtMessage);
        setMessages(updatedMessages);
        if (isBottom) {
          setTimeout(() => {
            scrollBottom();
          }, 75);
        }
      }
    }
    if (recievedMessage.type === 'is_typing') {
      setIsTyping(recievedMessage.is_typing === 'true');
    }
    if (recievedMessage.type === 'already_viewed') {
      if (messages) {
        const updatedMessages = { ...messages };
        updatedMessages.messages.forEach((msg) => {
          if (msg) {
            // eslint-disable-next-line no-param-reassign
            msg.already_viewed = 'true';
          }
        });
        setMessages(updatedMessages);
      }
    }

    if (recievedMessage.type === 'changed_doubt_status' && recievedMessage.status === 'Completed') {
      push(`/rating/${doubtid}`);
    }
    resetRecievedMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessage]);

  useEffect(() => {
    const sentinela = document.querySelector('#sentinela');
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (lastChatPage > 0 && messages && messages.messages.length > 9) {
          getLastMessages(doubtid, lastChatPage).then((res) => {
            res.messages.forEach((msg) => {
              // eslint-disable-next-line no-param-reassign
              msg.already_viewed = 'true';
            });
            handleSetChatPage(res.timestamp);
            const updatedMessages = { ...messages };
            updatedMessages.messages = [...res.messages, ...messages.messages];

            setMessages(updatedMessages);
            scrollBottom(30);
          });
        }
      }
    });
    if (sentinela) {
      intersectionObserver.observe(sentinela);
    }
    return () => intersectionObserver.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, lastChatPage, handleSetChatPage]);

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


  

  return (
    <Container>
      <Heading
        doubtInfo={doubtInfo}
        localLoading={localLoading}
        handleOpenMeets={handleOpenMeets}
      />
      <ChatContainer>
        <MessagesBox 
          className={`hasVerticalScroll ${isLoading ? 'loading' : ''}`}
          id="messageBox"
        >
          {isLoading && (
            <Loading className="loading" size={2} />
          )}
          <li id="sentinela" />
          {messages && messages.messages.map((item) => (
            <Message 
              mine={item.sender_id === user.userId}
              read={item.already_viewed === 'true' || item.already_viewed === true}
              message={item.message}
              image={item.file_url}
              timeStamp={convertTimeStampToTimeLog(item.timestamp)}
              key={item.timestamp}
            />
          ))}
        

          <TimerContainer opacity={opacity} className={`${user.profileId === 'Teacher' ? 'teacher' : ''}`} >
          <div id="sentinela-button" className={`isTyping ${isTyping ? 'typing' : 'not-typing'} ${recievedMessage.user_id === user.userId ? 'me' : ''}`}>
            <Loading type="ellipsis" size={1} />
          </div>
          <div className="space-container">
              <div className="time-info" >
                <div className="time-left-row time-oneOf">
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
             <Image
                src="/assets/svgs/relogio.svg"
                width={40}
                height={40}
                layout="fixed"
                objectFit="contain"
                className="test"
              />
          </div>
       </TimerContainer>
        </MessagesBox>
        {imgUrl && (
          <div className="image-preview-wrapper">
            <div className="img">
              <Image
                src={`data:image/png;base64,${imgUrl}`}
                layout="fill"
                objectFit="cover"
                className="profileUrl"
              />
              <FiX onClick={() => setImgUrl('')} size={40} />
            </div>
            <div className="actions">
              <ChatActions
                doubtId={doubtid}
                bgColor="#61137A"
                hideIcons
                onSubmitMessage={handleSubmit}
                handleSetImg={(url: string) => setImgUrl(url)}
                disabled={isChatDisabled}
              />
            </div>
          </div>
        )}
        {!imgUrl && (
          <ChatActions
            doubtId={doubtid}
            onSubmitMessage={handleSubmit}
            handleSetImg={(url: string) => setImgUrl(url)}
            disabled={isChatDisabled}
          />
        )}
      </ChatContainer>
      
    </Container>
  );
};
