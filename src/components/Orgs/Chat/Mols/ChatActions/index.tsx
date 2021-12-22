import {
  Dispatch, useRef, SetStateAction, useCallback,
} from 'react';
import { FiCamera, FiSend } from 'react-icons/fi';
import useSound from 'use-sound';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// import sentMessageSound from '/assets/sounds/sent.wav';

import { Input } from 'components/Atoms/Input';
// import ImageUpload from '../../Atoms/ImageUpload';

import { Container } from './styles';

interface ChatActionsProps {
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: any;
  sendIsTyping: any;
}
const ChatActions: React.FC<ChatActionsProps> = ({
  setMessage,
  sendMessage,
  sendIsTyping,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [play] = useSound('/assets/sounds/sent.wav');
  const iconStyle = { position: 'absolute' } as React.CSSProperties;

  const handleSend = useCallback(
    (msgType: string) => {
      sendMessage(msgType, '');
      setMessage('');
      play();
      formRef.current?.clearField('text');
    },
    [play, sendMessage, setMessage],
  );

  const inputStyle = {
    width: 500,
    height: 15,
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={() => handleSend('')} className="form">
        <Input
          name="text"
          style={inputStyle}
          onChange={(event) => {
            setMessage(event.target.value);
            if (event.target.value.length === 1) sendIsTyping(true);
          }}
        />
        <div className="imageUploader">
          {/* <ImageUpload sendMessage={sendMessage} /> */}
          <FiCamera size={24} color="#FED44A" style={iconStyle} />
        </div>
        <FiSend
          size={24}
          type="submit"
          color="#FED44A"
          cursor="pointer"
          onClick={() => handleSend('')}
        />
      </Form>
    </Container>
  );
};

export default ChatActions;
