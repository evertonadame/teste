import { useMemo, useState } from 'react';

import { useAuth } from 'hooks/auth';

import { NotificationBadge } from 'components/Atoms/NotificationBadge';

import { FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';
import { MainImg } from 'components/Mols/Header/styles';
import {
  ChatOptions,
  Container,
  ImageContainer,
  UserContainer,
} from './styles';

interface ChatHeaderProps {
  closeChat: any;
  sendDoubtForfeit: any;
  sendDoubtConclusion: any;
  sendDoubtCancelation: any;
  status: string;
  subject: string;
  student: string;
  teacher: string;
  imgUrl: string;
  badgeCount: number;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({
  closeChat,
  sendDoubtForfeit,
  sendDoubtConclusion,
  sendDoubtCancelation,
  status,
  subject,
  student,
  teacher,
  imgUrl,
  badgeCount,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { user } = useAuth();

  const defaultUserProfileImage = useMemo<string>(
    () => 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png',
    [],
  );

  return (
    <Container>
      <div className="left">
        <div className="badgedIcon">
          <FiArrowLeft
            size={24}
            color="#F4D35C"
            className="icon"
            onClick={() => closeChat()}
          />
          {user.profileId === 'Teacher' && badgeCount > 0 && (
            <NotificationBadge number={badgeCount} isAbsolute={false} />
          )}
        </div>
        <UserContainer bg={user.imageUrl}>
          <ImageContainer>
            <div className="main-profile-img">
              {(status === 'Waiting Teacher' && user.profileId === 'Student')
              || imgUrl === undefined
              || imgUrl === ''
              || imgUrl === ' ' ? (
                <MainImg src={defaultUserProfileImage} alt="user" />
                ) : (
                  <MainImg src={imgUrl} alt="user" />
                )}
            </div>
          </ImageContainer>
        </UserContainer>
        <div>
          <p>
            {user.profileId === 'Teacher' && <b>{student}</b>}
            {user.profileId === 'Student' && status === 'Waiting Teacher' && (
              <b>Sem professor</b>
            )}
            {user.profileId === 'Student' && status !== 'Waiting Teacher' && (
              <b>{teacher}</b>
            )}
          </p>
          <p>
            Plantão de&nbsp;
            {subject}
          </p>
        </div>
      </div>

      <div className="right">
        <p>{status}</p>
        {status === 'Teacher Accepted'
          && (!isOptionsOpen ? (
            <FiMenu
              size={24}
              color="#F4D35C"
              className="icon"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            />
          ) : (
            <FiX
              size={24}
              color="#F4D35C"
              className="icon"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            />
          ))}

        {isOptionsOpen && status === 'Teacher Accepted' && (
          <ChatOptions>
            {user.profileId === 'Teacher' ? (
              <>
                <button
                  type="button"
                  className="option"
                  onClick={() => sendDoubtForfeit()}
                >
                  Desistir do atendimento
                </button>
                <button
                  type="button"
                  className="option"
                  onClick={() => sendDoubtConclusion()}
                >
                  Concluir atendimento
                </button>
              </>
            ) : (
              <button
                type="button"
                className="option"
                onClick={() => sendDoubtCancelation()}
              >
                Cancelar Atendimento
              </button>
            )}
          </ChatOptions>
        )}
      </div>
    </Container>
  );
};

export default ChatHeader;
