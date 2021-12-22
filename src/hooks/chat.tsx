import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  createContext,
} from 'react';
import { v4 } from 'uuid';

import { ChatMsgDTO, MessageSent } from 'types/dtos/chatDTO';
import { api } from 'services/apiClient';
import { useAuth } from './auth';

interface ChatContextData {
  isLoading: boolean;
  recievedMessage: any;
  lastChatPage: number;
  handleSetChatPage(timestamp: number): void;
  closeConnection(): void;
  openConnection(): void;
  resetRecievedMessage(): void;
  sendMessage(
    message: string,
    doubtId: string,
    imgUrl?: string,
  ): Promise<MessageSent>;
  getLastMessages(doubtId: string, lastChatPage?: number): Promise<ChatMsgDTO>;
  sendGenericChatWsMessage(
    message: Record<string, string>,
    type: string,
    doubtId: string,
  ): void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [recievedMessage, setRecievedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastChatPage, setLastChatPage] = useState(0);

  const { user } = useAuth();

  const sWs = useRef<WebSocket>();
  const timeOut = useRef<any>(null);

  const ping = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'ping',
        user_id: user.userId,
      }),
    );
  }, [user]);

  const updateUserId = useCallback(() => {
    const message = {
      action: 'onMessage',
      type: 'updateconnectionid',
      user_id: user.userId,
      os: 'WEB',
    };

    sWs.current?.send(JSON.stringify(message));
  }, [user]);

  const openConnection = useCallback(() => {
    console.log('Iniciou a conexao do chat');
    setIsConnected(true);
  }, []);

  const closeConnection = useCallback(() => {
    console.log('feshow a conexao do chat');
    sWs.current?.close();
    clearTimeout(timeOut.current);
    setIsConnected(false);
  }, []);

  const resetRecievedMessage = useCallback(() => {
    setTimeout(() => {
      setRecievedMessage('');
    }, 250);
  }, []);

  const sendMessage = async (
    message: string,
    doubtId: string,
    imgUrl?: string,
  ): Promise<MessageSent> => {
    const chatMsg = {
      action: 'onMessage',
      type: 'chat_message',
      user_id: user.userId,
      doubt_id: doubtId,
      uuid: v4(),
      file_type: ' ',
      file_url: ' ',
      thumb_url: ' ',
      message,
    };

    if (imgUrl) {
      setIsLoading(true);
      const imgUpload = await api.post('/doubt/uploadimage', {
        user_id: user.userId,
        image_base64: imgUrl,
        doubt_id: doubtId,
        uuid: v4(),
        text: chatMsg.message,
      });
      setIsLoading(false);

      Object.assign(chatMsg, { file_url: imgUpload.data });

      console.log(chatMsg);
    } else {
      sWs.current?.send(JSON.stringify(chatMsg));
    }
    return chatMsg;
  };

  const sendGenericChatWsMessage = (
    message: Record<string, string>,
    type: string,
    doubtId: string,
  ): void => {
    const wsChatMessage = {
      action: 'onMessage',
      type,
      user_id: user.userId,
      doubt_id: doubtId,
      ...message,
    };

    sWs.current?.send(JSON.stringify(wsChatMessage));
  };

  const handleRecievedMessage = useCallback((message: any) => {
    if (message !== 'pong') {
      try {
        const parsedMessage = JSON.parse(message);
        console.log({
          chat: parsedMessage,
        });
        switch (parsedMessage.type) {
          case 'chat_message':
          case 'is_typing':
          case 'already_viewed':
          case 'changed_doubt_status':
            setRecievedMessage(parsedMessage);
            break;
          default:
            break;
        }
      } catch (err) {
        // console.log(err);
      }
    }
  }, []);

  const getLastMessages = async (doubtId: string, timestamp = 0): Promise<ChatMsgDTO> => {
    if (timestamp === 0) {
      setIsLoading(true);
    }
    const response = await api.get<ChatMsgDTO>(`/doubt?user_id=${user.userId}&doubt_id=${doubtId}&timestamp=${timestamp}`);
    if (timestamp === 0) {
      setIsLoading(false);
    }
    return response.data;
  };

  const handleSetChatPage = (timestamp: number):void => {
    setLastChatPage(timestamp);
  };

  useEffect(() => {
    if (isConnected) {
      if (sWs.current?.readyState !== 1) {
        sWs.current = new WebSocket(
          'wss://mcvcvp8ef9.execute-api.sa-east-1.amazonaws.com/prod',
        );
      }

      if (sWs.current) {
        sWs.current.onopen = (event) => {
          timeOut.current = setInterval(() => {
            ping();
          }, 1000 * 35); // 35seg
          if (sWs.current !== undefined) {
            if (sWs !== undefined) {
              sWs.current.onerror = (err) => {
                // sWs.current?.close();
                // reOpenConnection();
                console.log('deu merda');
                window.location.reload();
              };
            }
            if (sWs.current?.readyState === 1) {
              updateUserId();
            }
            sWs.current.onmessage = (e) => {
              try {
                handleRecievedMessage(e.data);
              } catch {
                window.location.reload();
                console.log('err');
              }
            };
          }
        };
      }
    }
  }, [isConnected, ping, updateUserId, handleRecievedMessage]);

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        recievedMessage,
        lastChatPage,
        handleSetChatPage,
        closeConnection,
        openConnection,
        resetRecievedMessage,
        sendMessage,
        getLastMessages,
        sendGenericChatWsMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}
