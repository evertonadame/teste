import { useState, useEffect } from 'react';
import { Ul, StyledButton, StatusContainer, DrescriptionContainer, ButtonsContainer, CarteiraContainer, ImgContainerStatus, ImgUser } from './BurguerStyles';
import { UserStatus } from 'components/Atoms/UserStatus';
import { convertNumberToBRL, translateLevelId, translatePhaseId } from 'utils/functions';
import { useAuth } from 'hooks/auth';
import { useWs } from 'hooks/ws';
import { useChat } from 'hooks/chat';
import { UserSchoolInfo, ImgContainer2 } from './styles';
import { Separator } from 'components/Atoms/Separator';
import { useRouter } from 'next/router';

const RightNav = ({ open }) => {

  const [participantAvailability, setParticipantAvailability] = useState('online', 'busy', 'offline', 'away');
  const { handleSignOut, user } = useAuth();
  const { closeConnection } = useWs();
  const { recievedMessage, resetRecievedMessage } = useChat();
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (recievedMessage.type === 'availability_changed') {
      setParticipantAvailability(recievedMessage.availability);
      resetRecievedMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessage]);


  return (

    <>
    
    <Ul open={open}>
      
      <div className="container-wrapper">
      <li>
        <StatusContainer>
           <ImgContainer2
            onClick={() => push('/')}
            src="/assets/images/nextLevel.png"
            alt="nllogo"
          />
          <Separator customHeight={50} type="vertical" />
          <ImgContainerStatus>
            <ImgUser
              src={user.imageUrl !== ' ' ? user.imageUrl : 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png'}
              alt="User Profile image"
            />
            <UserStatus status={participantAvailability} />
          </ImgContainerStatus>
          <DrescriptionContainer>
            <UserSchoolInfo>
              <h3>{user.name}</h3>
              {user.profileId === 'Student' ? (
                <>
                  <span>{translatePhaseId(user.phaseId ?? '')}</span>
                  <p>{translateLevelId(user.levelId ?? '')}</p>
                </>
              ) : (
                <p>Professor</p>
              )}
              {user.profileId === 'Teacher' && (
                <>
                  <span>{user.offeredSubjects}</span>
                </>
              )}
            </UserSchoolInfo>
          </DrescriptionContainer>
        </StatusContainer>
      </li>
    </div>
    <div className="wrapper-two">
       <li>
        <CarteiraContainer>
          <div className="right">
            {/* {user.profileId !== 'Teacher' && ( */}
              <div className="wallet">
                <p>Minha Carteira</p>
                <p className="value">{convertNumberToBRL(user?.wallet?.balance ?? 0)}</p>
              </div>
            {/* )} */}
          </div>
        </CarteiraContainer>
      </li> 
      <li>
        <ButtonsContainer>
          <StyledButton
            type="button"
            onClick={() => {
              closeConnection();
              handleSignOut();
            }}
          >Sair
            <img
              src="/assets/svgs/signoutIcon.svg"
            />
          </StyledButton>
        </ButtonsContainer>
      </li>
      </div>
    </Ul>
    </>
  )
}

export default RightNav;