/* eslint-disable @next/next/no-img-element */
import { FiCheck } from 'react-icons/fi';

import { Container, MessageFooter } from './styles';

interface ChatMessageProps {
  sender: string;
  message: string;
  isReceivedMessage?: boolean;
  date: string;
  alreadyviewed: string;
  url: string;
  filetype: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  isReceivedMessage = false,
  date,
  alreadyviewed,
  filetype,
  url,
}) => {
  const imgStyle = { cursor: 'pointer' } as React.CSSProperties;
  return (
    <Container isReceivedMessage={isReceivedMessage}>
      {isReceivedMessage ? (
        <>
          <p className="sender">{sender}</p>
          {filetype === 'message' ? (
            <p className="message">{message}</p>
          ) : (
            <img
              src={url}
              className="image"
              alt="Imagem recebida"
              onClick={() => {
                window.open(url);
              }}
              aria-hidden="true"
              style={imgStyle}
            />
          )}
          <MessageFooter>
            <p className="date">{date}</p>
          </MessageFooter>
        </>
      ) : (
        <>
          {filetype === 'message' ? (
            <p className="message">{message}</p>
          ) : (
            <img
              src={url}
              className="image"
              alt="Imagem enviada"
              onClick={() => {
                window.open(url);
              }}
              aria-hidden="true"
              style={imgStyle}
            />
          )}
          <MessageFooter>
            <p className="date">{date}</p>
            {alreadyviewed === 'true' ? (
              <>
                <FiCheck color="#389EDB" />
                <FiCheck color="#389EDB" className="receivedIcon" />
              </>
            ) : (
              <>
                <FiCheck />
                <FiCheck className="receivedIcon" />
              </>
            )}
          </MessageFooter>
        </>
      )}
    </Container>
  );
};

export default ChatMessage;
