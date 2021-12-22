import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';

import { api } from 'services/apiClient';
import useSound from 'use-sound';
import { useAuth } from 'hooks/auth';
import { toast } from 'react-toastify';
// import { FastDoubtItem, FastDoubtMessage } from 'models/PlantaoModels';
// import notificationSound from '/assets/sounds/notification.mp3';

// import Separator from 'components/Atoms/Separator';
import ChatMessage from './Atoms/ChatMessage';
import TeacherConfirmation from './Mols/TeacherConfirmation';
import DisabledChatActions from './Mols/DisabledChatActions';
import ChatActions from './Mols/ChatActions';
import ChatHeader from './Mols/ChatHeader';

import { ChatContainer, ContentContainer, EmptyChatMessage } from './styles';

interface ChatProps {
  subject: string;
  isTeacherAccepted: boolean;
  messages: Array<any>;
  fastDoubtId: string;
  setIsChatOpen(): void;
  status: string;
  student: string;
  teacher: string;
  profileImg: string;
}

export const Chat = ({
  subject,
  isTeacherAccepted,
  messages,
  fastDoubtId,
  setIsChatOpen,
  status,
  student,
  teacher,
  profileImg,
}: ChatProps): JSX.Element => {
  const [isTyping, setIsTyping] = useState(false);
  const [messageToSend, setMessage] = useState('');
  const [refreshedId, setFastDoubtId] = useState(fastDoubtId);
  const [chatStatus, setChatStatus] = useState(status);
  const [notificationsNumber, setNotificationsNumber] = useState(0);
  const [isTeacherAnswering, setIsTeacherAnswering] = useState(
    isTeacherAccepted,
  );
  const [messageList, setMessageList] = useState<any[]>([]);

  const { user } = useAuth();
  // const { addToast } = useToast();
  const [play] = useSound('/assets/sounds/notification.mp3');

  const webSocket = useRef<WebSocket>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const alreadyViewedMessage = useMemo(() => ({
    action: 'onMessage',
    type: 'alreadyviewed',
    fastdoubtid: fastDoubtId,
    userid: user.userId,
  }), [fastDoubtId, user.userId]);

  const emptyArray: Array<any> = [];
  const url = 'https://hdinsfdwwa.execute-api.sa-east-1.amazonaws.com/prod/fastdoubt/upload/image';
  const fastDoubtStatusMessage = {
    action: 'onMessage',
    type: 'fastdoubt_status',
    userid: user.userId,
    fastdoubt_status: '',
    fastdoubtid: fastDoubtId,
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView();
  };

  const sendIsTyping = (typing: boolean): void => {
    if (!webSocket.current) return;

    const message = {
      action: 'onMessage',
      type: 'istyping',
      fastdoubtid: fastDoubtId,
      userid: user.userId,
      istyping: typing ? 'true' : 'false',
    };

    webSocket.current.send(JSON.stringify(message));
    webSocket.current.send(JSON.stringify(alreadyViewedMessage));
    setTimeout(() => {
      if (!webSocket.current) return;
      message.istyping = 'false';
      webSocket.current.send(JSON.stringify(message));
    }, 10000);
  };

  const waitForSocketConnection = useCallback(
    (socket: WebSocket, callback: { (): void; (): void } | null) => {
      setTimeout(() => {
        if (socket.readyState === 1) {
          if (callback != null) {
            callback();
          }
        } else {
          waitForSocketConnection(socket, callback);
        }
      }, 10);
    },
    [],
  );

  const handleCloseChat = useCallback(() => {
    if (!webSocket.current) return;

    webSocket.current.close();
    setMessageList(emptyArray);
    setIsChatOpen();
  }, [emptyArray, setIsChatOpen]);

  const sendMessage = async (
    msgType: string,
    imgUrl: string,
  ): Promise<void> => {
    let message;
    let formatedImgUrl = ' ';
    const messageType = msgType === '' ? 'text' : 'image';

    if (imgUrl !== '') {
      [, formatedImgUrl] = imgUrl.split('base64,');
    }

    if (messageType === 'text') {
      if (messageList.length === 0) {
        message = {
          action: 'onMessage',
          type: 'create_fastdoubt',
          filetype: 'message',
          fileurl: ' ',
          message: messageToSend,
          userid: user.userId,
          student_subjectid: subject,
          uuid: v4(),
        };
      } else {
        message = {
          action: 'onMessage',
          type: 'chat_message',
          filetype: 'message',
          fileurl: ' ',
          message: messageToSend,
          userid: user.userId,
          fastdoubtid: refreshedId || fastDoubtId,
          uuid: v4(),
        };
      }
    } else if (messageType === 'image') {
      if (messageList.length === 0) {
        const requestBody = {
          userid: user.userId,
          student_subjectid: subject,
          fastdoubtid: ' ',
          thumbbase64: formatedImgUrl,
          imagebase64: formatedImgUrl,
          uuid: v4(),
        };

        const response = await api.post(url, requestBody);
        formatedImgUrl = response.data;
      } else {
        const requestBody = {
          userid: user.userId,
          student_subjectid: subject,
          fastdoubtid: refreshedId || fastDoubtId,
          thumbbase64: formatedImgUrl,
          imagebase64: formatedImgUrl,
          uuid: v4(),
        };

        const response = await api.post(url, requestBody);
        formatedImgUrl = response.data;
      }
    }

    if (message?.message !== '') {
      if (!webSocket.current) return;

      webSocket.current.send(JSON.stringify(message));
      sendIsTyping(false);
    } else {
      toast.error({
        type: 'error',
        title: 'Não é permitido enviar mensagens vazias!',
        description: 'Por favor, escreva uma mensagem antes de enviar.',
      });
    }
  };

  const sendTeacherConfirmation = (): void => {
    if (!webSocket.current) return;
    const message = {
      action: 'onMessage',
      type: 'teacher_accept',
      userid: user.userId,
      fastdoubtid: fastDoubtId,
    };

    webSocket.current.send(JSON.stringify(message));

    setIsTeacherAnswering(true);
  };

  const sendDoubtCancelation = (): void => {
    if (!webSocket.current) return;

    fastDoubtStatusMessage.fastdoubt_status = 'Canceled';

    webSocket.current.send(JSON.stringify(fastDoubtStatusMessage));

    toast.error({
      type: 'error',
      title: 'Atendimento cancelado com sucesso!',
      description:
        'O Atendimento foi cancelado e removido da sua lista de atendimentos em andamento.',
    });

    handleCloseChat();
  };

  const sendDoubtConclusion = (): void => {
    if (!webSocket.current) return;

    fastDoubtStatusMessage.fastdoubt_status = 'Completed';

    webSocket.current.send(JSON.stringify(fastDoubtStatusMessage));

    toast.success({
      type: 'success',
      title: 'Atendimento concluído com sucesso!',
      description:
        'O Atendimento foi concluido e removido da sua lista de atendimentos em andamento.',
    });

    handleCloseChat();
  };

  const sendDoubtForfeit = (): void => {
    if (!webSocket.current) return;

    fastDoubtStatusMessage.fastdoubt_status = 'Waiting Teacher';

    webSocket.current.send(JSON.stringify(fastDoubtStatusMessage));

    toast.success({
      type: 'success',
      title: 'Desistência concluída com sucesso!',
      description:
        'Você desistiu do atendimento e ele está à espera de um novo professor!',
    });

    handleCloseChat();
  };

  const parseDate = (rawDate: string): string => {
    const splitedDate = rawDate !== undefined ? rawDate.split('-') : [''];

    const data = new Date(
      Number(splitedDate[0]),
      Number(splitedDate[1]) - 1,
      Number(splitedDate[2]),
      Number(splitedDate[3]),
      Number(splitedDate[4]),
      Number(splitedDate[5]),
      Number(splitedDate[6]),
    );

    const zonedDate: Date = new Date(data.setHours(data.getHours() - 3));

    return !Number.isNaN(zonedDate.getTime())
      ? String(zonedDate.getHours())
        .concat(':')
        .concat(String(zonedDate.getMinutes()))
      : '00:00';
  };

  useEffect(() => {
    webSocket.current = new WebSocket(
      'wss://mcvcvp8ef9.execute-api.sa-east-1.amazonaws.com/prod',
    );

    return () => webSocket.current?.close();
  }, []);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
    const updateConnectionMessage = {
      action: 'onMessage',
      type: 'updateconnectionid',
      userid: user.userId,
      os: 'WEB',
    };
    if (!webSocket.current) return;

    waitForSocketConnection(webSocket.current, () => {
      if (!webSocket.current) return;

      webSocket.current.send(JSON.stringify(updateConnectionMessage));
    });

    webSocket.current.onmessage = async (wsMessage) => {
      if (wsMessage.data === 'refresh_fastdoubt') {
        let FastUrl = '';

        if (user.profileId === 'Student') {
          FastUrl = `/fastdoubt/calendly?userid=${user.userId}`;
        }
        const response = await api.get(FastUrl);

        const { fastDoubtList } = response.data;
        const refreshedFastDoubtStatus = fastDoubtList.filter(
          (fastDoubt: any) => fastDoubt.subjectid_userid_date === fastDoubtId,
        )[0]?.status;

        setChatStatus(refreshedFastDoubtStatus);

        if (refreshedFastDoubtStatus !== undefined) {
          if (refreshedFastDoubtStatus === 'Waiting Teacher') {
            toast.error({
              type: 'error',
              title: 'O Professor desistiu de sua dúvida!',
              description: 'Sua dúvida está à espera de um novo professor.',
            });
          } else if (
            refreshedFastDoubtStatus === 'Teacher Accepted'
            && user.profileId !== 'Teacher'
          ) {
            toast.success({
              type: 'success',
              title: 'Sua dúvida foi atribuída a um professor!',
              description:
                'O professor irá responder sua dúvida! Continue o contato.',
            });
          } else if (refreshedFastDoubtStatus === 'Canceled') {
            toast.success({
              type: 'error',
              title: 'Sua dúvida foi cancelada!',
              description:
                'O professor cancelou sua dúvida! Não será possível enviar novas mensagens.',
            });
          } else if (user.profileId === 'Teacher') {
            toast.error({
              type: 'error',
              title: 'Sua dúvida foi cancelada!',
              description:
                'O aluno cancelou sua dúvida! Não será possível enviar novas mensagens.',
            });
          } else if (refreshedFastDoubtStatus === 'Completed') {
            toast.success({
              type: 'success',
              title: 'Sua dúvida foi concluída!',
              description:
                'O professor concluiu sua dúvida! Não é possível enviar novas mensagens.',
            });
          }
        }
      } else if (wsMessage.data === 'refresh') {
        // console.log('Refresh');
      } else {
        const message = JSON.parse(wsMessage.data);
        if (message.fastdoubtid === fastDoubtId || chatStatus === 'Available') {
          if (message.type !== 'istyping' && message.type !== 'alreadyviewed') {
            const messageReceived: any = {
              alreadyviewed: message.alreadyviewed,
              date: message.date,
              fastdoubtid: message.subjectid_userid_date || message.fastdoubtid,
              message: message.message,
              senderid: message.senderid || message.userid,
              timestamp: message.timestamp,
              filetype: message.filetype,
              fileurl: message.fileurl,
              thumburl: ' ',
              uuid: message.uuid,
            };

            const newMessages = messageList.concat(messageReceived);
            setMessageList([...newMessages]);
            setFastDoubtId(messageReceived.fastdoubtid);
          } else if (message.type === 'alreadyviewed') {
            const visualizedMessages = messageList.map((item) => {
              const obj = { ...item };
              obj.alreadyviewed = 'true';
              return obj;
            });
            setMessageList([...visualizedMessages]);
          } else {
            setIsTyping(message.istyping === 'true');
          }
        } else if (
          message.type !== 'istyping'
          && message.type !== 'alreadyviewed'
        ) {
          play();
          setNotificationsNumber(notificationsNumber + 1);
        }
      }
    };
  }, [
    messageList,
    messages,
    waitForSocketConnection,
    setMessageList,
    user.userId,
    fastDoubtId,
    user.profileId,
    refreshedId,
    alreadyViewedMessage,
    handleCloseChat,
    subject,
    notificationsNumber,
    chatStatus,
    play,
  ]);

  return (
    <ChatContainer>
      <ChatHeader
        closeChat={handleCloseChat}
        status={chatStatus}
        subject={subject}
        student={student}
        teacher={teacher}
        sendDoubtCancelation={sendDoubtCancelation}
        sendDoubtConclusion={sendDoubtConclusion}
        sendDoubtForfeit={sendDoubtForfeit}
        imgUrl={profileImg}
        badgeCount={notificationsNumber}
      />
      <ContentContainer>
        {messageList.length > 0 ? (
          messageList.map((message) => (
            <ChatMessage
              sender={message.senderid}
              message={message.message}
              isReceivedMessage={user.userId !== message.senderid}
              date={parseDate(message.date)}
              alreadyviewed={message.alreadyviewed}
              filetype={message.filetype}
              url={message.fileurl}
              key={message.uuid}
            />
          ))
        ) : (
          <EmptyChatMessage>
            <p className="upperMessage">
              Faça sua pergunta que um de nossos professores irá responder
            </p>
            {/* <Separator type="horizontal" /> */}
            <p>Você pode fazer sua pergunta com texto ou com uma foto</p>
          </EmptyChatMessage>
        )}
        {isTyping && (
          <ChatMessage
            sender=" "
            message="Digitando..."
            isReceivedMessage
            date={' '}
            alreadyviewed="true"
            filetype="message"
            url={' '}
          />
        )}
        <div ref={messagesEndRef} />
      </ContentContainer>
      {user.profileId === 'Teacher'
        && chatStatus === 'Waiting Teacher'
        && !isTeacherAnswering && (
          <TeacherConfirmation
            sendTeacherConfirmation={sendTeacherConfirmation}
          />
      )}
      {(user.profileId === 'Student' || isTeacherAnswering)
        && chatStatus !== 'Completed'
        && chatStatus !== 'Canceled' && (
          <ChatActions
            setMessage={setMessage}
            sendMessage={sendMessage}
            sendIsTyping={sendIsTyping}
          />
      )}
      {(chatStatus === 'Completed' || chatStatus === 'Canceled') && (
        <DisabledChatActions />
      )}
    </ChatContainer>
  );
};
