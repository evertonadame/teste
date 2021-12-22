/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { FaCheck } from 'react-icons/fa';
import Image from 'next/image';

import { Container } from './styles';

type MessageProps = {
  mine: boolean;
  read: boolean;
  message: string;
  timeStamp: string;
  image?: string;
}

export const Message = ({
  mine,
  read,
  message,
  timeStamp,
  image,
}: MessageProps): JSX.Element => {
  const messageWithLineBreak = useMemo(() => {
    const splittedMessage = message.split('  ');
    const fullMessage = splittedMessage.map((item, index) => (
      <p key={`${index}-${index}`}>{item}</p>
    ));

    if (message.includes('https') || message.includes('www.')) {
      try {
        const url = new URL(message);
        return <a target="_blank" href={url.href} rel="noreferrer">{url.href}</a>;
      } catch (err) {
        return message;
      }
    }

    return fullMessage;
  }, [message]);

  return (
    <Container hasImg={image !== ' '} mine={mine}>
      <div className="msg-info-container">
        <p>{timeStamp}</p>
        <div className={read ? 'read-status read' : 'read-status recieved'}>
          {mine && (
          <>
            <FaCheck size={10} />
            <FaCheck size={10} />
          </>
          )}
        </div>
      </div>
      {image && image !== ' ' && (
        <div className="image">
          <Image
            src={image}
            layout="fill"
            objectFit="contain"
            className="chat-img"
            onClick={() => {
              window.open(
                image,
                '_blank',
              );
            }}
          />
        </div>
      )}
      <div className="msg-text">
        {messageWithLineBreak}
      </div>
    </Container>
  );
};
