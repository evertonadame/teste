import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiChevronDown, FiHeart } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { TeacherInfo, TeacherSubject } from 'types/dtos/subjectDTOS';
import { convertNumberToBRL } from 'utils/functions';
import { useDoubt } from 'hooks/doubts';
import { useAuth } from 'hooks/auth';

import { Button } from 'components/Atoms/Button';
import { Loading } from 'components/Atoms/Loading';
import { Rating } from 'components/Atoms/Rating';
import { UserStatus } from 'components/Atoms/UserStatus';

import { Container, Stars, Heart } from './styles';

type TeacherCardProps = {
  teacher: TeacherInfo;
  additionalInfo: TeacherSubject;
  doubtId: string;
}

export const TeacherCard = ({ additionalInfo, teacher, doubtId }:TeacherCardProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState((additionalInfo?.is_favorite === 'true' || additionalInfo?.is_favorite === true) ?? false);
  const [collapsed, setIsCollapsed] = useState(false);

  const {
    isLoading, changeDoubtStatus, toggleFavTeacher, buttonIsLoading,
  } = useDoubt();
  const { user } = useAuth();

  const { push } = useRouter();

  const handleAcceptTeacher = async (): Promise<void> => {
    await changeDoubtStatus(
      doubtId,
      'StudentAccepted',
      'student',
      teacher.user_id,
    );

    push(`/chat?doubtid=${doubtId}`);
  };

  const getImage = ():string => {
    if (teacher.image_url && teacher.image_url !== ' ') {
      return teacher.image_url;
    }
    return 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png';
  };

  const handleToggleFavTeacher = async () : Promise<void> => {
    const isFav = !isLiked;
    setIsLiked(isFav);
    await toggleFavTeacher(teacher.user_id, isFav);
  };

  return (
    <Container
      collapsed={collapsed}
      isLoading={isLoading}
    >
      {!isLoading ? (
        <div className="wrapper">
          <div className="user-status-container">
            <div className="img-container">
              <Image
                src={getImage()}
                width={50}
                height={50}
                layout="fixed"
                objectFit="contain"
                className="icon"
              />
            </div>
            <UserStatus status={teacher.availability} />
          </div>
          <div className="content">
            <Stars>
              <Rating
                isLoading
                ratingNote={Number(additionalInfo?.stars) ?? 0}
                starsSize={18}
                onChange={(e) => console.log(e)}
              />
            </Stars>
            <span>{teacher.nick_name}</span>
            <p>{convertNumberToBRL(Number(additionalInfo.price))}</p>
          </div>
          <Heart onClick={handleToggleFavTeacher}>
            {!buttonIsLoading ? (
              <>
                {isLiked ? (
                  <FaHeart className="popped" size={20} />
                ) : (
                  <FiHeart size={20} />
                )}
              </>
            ) : (
              <Loading size={1} />
            )}
          </Heart>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      {collapsed && (
        <>
          <p className="estimated-time">
            Tempo estimado de atendimento
            {' '}
            <strong>
              {Math.floor(Number(user.wallet.balance) / Number(additionalInfo.price))}
              {' '}
              minutos
            </strong>
          </p>
          <Button disabled={isLoading} style={{ width: '100%' }} type="button" onClick={handleAcceptTeacher}>
            {isLoading ? 'Iniciando chat...' : 'Iniciar'}
          </Button>
        </>
      )}
      <div className="collapse-button">
        <FiChevronDown
          size={20}
          onClick={() => setIsCollapsed((state) => !state)}
        />
      </div>
    </Container>
  );
};
