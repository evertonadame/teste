import {
  MutableRefObject,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  createContext,
} from 'react';

import { useAuth } from './auth';

interface WsContextData {
  recievedMessage: any;
  wsConnectionRef: MutableRefObject<WebSocket | undefined>;
  closeConnection(): void;
  openConnection(): void;
  resetRecievedMessage(): void;
}

const WsContext = createContext<WsContextData>({} as WsContextData);

export const WsProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [recievedMessage, setRecievedMessage] = useState('');

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
    console.log('Iniciou a conexao');
    setIsConnected(true);
  }, []);

  const closeConnection = useCallback(() => {
    console.log('feshow a conexao');
    sWs.current?.close();
    clearTimeout(timeOut.current);
    setIsConnected(false);
  }, []);

  const resetRecievedMessage = useCallback(() => {
    setTimeout(() => {
      setRecievedMessage('');
    }, 250);
  }, []);

  const handleRecievedMessage = useCallback((message: any) => {
    if (message !== 'pong') {
      try {
        const parsedMessage = JSON.parse(message);
        // console.log({
        //   ws: parsedMessage,
        // });

        switch (parsedMessage.type) {
          case 'post_student_doubt':
          case 'post_student_accepted':
          case 'post_doubt_teacher':
          case 'availability_changed':
          case 'backoff_doubt_teacher':
          case 'post_student_canceled':
          case 'changed_doubt_status':
          case 'post_student_not_accepted':
          case 'chat_message':
            setRecievedMessage(parsedMessage);
            break;
          default:
            // console.log(parsedMessage);
            break;
        }
      } catch (err) {
        // console.log(err);
      }
    }
  }, []);

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
            if (sWs.current.readyState === 1) {
              updateUserId();

              sWs.current.onmessage = (e) => {
                try {
                  handleRecievedMessage(e.data);
                } catch {
                  window.location.reload();
                  console.log('err');
                }
              };
            }
          }
        };
      }
    }
  }, [isConnected, ping, updateUserId, handleRecievedMessage]);

  return (
    <WsContext.Provider
      value={{
        wsConnectionRef: sWs,
        recievedMessage,
        closeConnection,
        openConnection,
        resetRecievedMessage,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export function useWs(): WsContextData {
  const context = useContext(WsContext);

  return context;
}
