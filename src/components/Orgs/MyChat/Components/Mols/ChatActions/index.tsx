import { ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useChat } from 'hooks/chat';
import { cooldownFunction } from 'utils/functions';

import ImageUpload from 'components/Atoms/ImageUpload';
import { Textarea } from 'components/Atoms/Textarea';
import { Loading } from 'components/Atoms/Loading';

import { Container } from './styles';

type ChatActionsProps = {
  disabled: boolean;
  doubtId: string;
  bgColor?: string;
  hideIcons?: boolean;
  handleSetImg(url: string): void;
  onSubmitMessage(message: string): void;
}

export const ChatActions = ({
  disabled = false,
  doubtId,
  bgColor,
  hideIcons,
  onSubmitMessage,
  handleSetImg,
}: ChatActionsProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const { sendGenericChatWsMessage, isLoading } = useChat();

  const handleSubmit = async (data: { message: string }): Promise<void> => {
    if ((data.message || hideIcons) && !disabled) {
      onSubmitMessage(data.message);
      formRef.current?.reset();

      const chatTextArea: HTMLTextAreaElement| null = document.querySelector('#input-message-textarea');

      if (chatTextArea) {
        chatTextArea.value = '';
        chatTextArea.setAttribute('style', '');
      }
    }
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    cooldownFunction(() => {
      sendGenericChatWsMessage(
        { is_typing: 'true' },
        'is_typing',
        doubtId,
      );
    }, 350, () => {
      sendGenericChatWsMessage(
        { is_typing: 'false' },
        'is_typing',
        doubtId,
      );
    });
  };

  return (
    <Container
      bgColor={bgColor}
      hideIcons={hideIcons}
    >
      <Form onSubmit={handleSubmit} ref={formRef}>
        <div className="text-area-wrapper">
          <Textarea
            name="message"
            id="input-message-textarea"
            cols={70}
            rows={1}
            onChange={handleChangeInputValue}
            responsive
            placeholder="Mensagem"
            disabled={isLoading || disabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                formRef.current?.submitForm();
              }
            }}
          />
            {isLoading ? (
          <Loading size={1} />
        ) : (
          <FiSend
            className={`send-button ${disabled ? 'microphone' : ''}`}
            size={22}
            onClick={() => {
              if (formRef.current && !disabled) {
                handleSubmit(formRef.current.getData() as { message: string });
              }
            }}
          />
        )}
        </div>
        {!hideIcons && (
          <div className="buttons-container">
            <Image
              src="/assets/svgs/clip.svg"
              width={22}
              height={22}
              layout="fixed"
              objectFit="contain"
              className="clip"
            />
            <ImageUpload
              type="simple"
              setImg={(state) => (!disabled ? handleSetImg(state) : console.log('Disabled'))}
              customChild
            >
              <Image
                src="/assets/svgs/minifoto.svg"
                width={22}
                height={22}
                layout="fixed"
                objectFit="contain"
                className={`test ${disabled ? 'microphone' : ''}`}
              />
            </ImageUpload>
            <Image
              src="/assets/svgs/microphone.svg"
              width={22}
              height={22}
              layout="fixed"
              objectFit="contain"
              className="microphone"
            />
          </div>
        )}
      </Form>
    </Container>
  );
};
