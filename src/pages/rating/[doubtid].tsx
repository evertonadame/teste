import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { DoubtInfoDTO } from 'types/dtos/subjectDTOS';
import { useDoubt } from 'hooks/doubts';
import { useAuth } from 'hooks/auth';
import {
  getSubjectsColors,
  convertTimeStampToTimeLog,
  convertNumberToBRL,
} from 'utils/functions';

import { BackButton } from 'components/Atoms/BackButton';
import { Button } from 'components/Atoms/Button';
import { Checkbox } from 'components/Atoms/Checkbox';
import { Loading } from 'components/Atoms/Loading';
import { Rating } from 'components/Atoms/Rating';
import { Seo } from 'components/Atoms/Seo';
import { withSSRAuth } from 'components/withSSRAuth';

import {
  Container,
  Content,
  Heading,
  UserInfo,
  ChatInfo,
  ImageContainer,
  Heart,
  UserActions,
} from 'styles/pages/rating';

type RatingProps = {
  doubtid: string;
};

export const RatingPage = ({ doubtid }: RatingProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);
  const [ratingNote, setRatingNote] = useState(0);
  const [isDoubtAnswered, setIsDoubtAnswered] = useState<boolean | undefined>();

  const [doubtInfo, setDoubtInfo] = useState<DoubtInfoDTO>();

  const {
    getDoubtInfoByDoubtUuid,
    rateDoubt,
    buttonIsLoading,
    toggleFavTeacher,
    getDashboard,
  } = useDoubt();
  const { user } = useAuth();

  const notesTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const { push } = useRouter();

  const getImageSize = (subjectName: string): number => {
    switch (subjectName) {
      case 'Biologia':
        return 22;
      default:
        return 20;
    }
  };

  const getDoubtImageName = (): string => {
    const formatedSubjectName = String(doubtInfo?.subject_id)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return formatedSubjectName;
  };

  const getParticipantImage = (): string => {
    if (user.profileId !== 'Teacher') {
      if (
        doubtInfo?.teacher_info.image_url &&
        doubtInfo?.teacher_info.image_url !== ' '
      ) {
        return doubtInfo?.teacher_info.image_url;
      }
    } else if (
      doubtInfo?.student_info.image_url &&
      doubtInfo?.student_info.image_url !== ' '
    ) {
      return doubtInfo?.student_info.image_url;
    }
    return 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png';
  };

  const handleSubmitDoubtRating = async (): Promise<void> => {
    if (ratingNote > 0 && !!isDoubtAnswered) {
      try {
        await rateDoubt(
          doubtid,
          notesTextAreaRef.current?.value ?? '',
          ratingNote,
          !!isDoubtAnswered,
        );
        push('/');
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warn('Para avaliar o atendimento você precisa preencher os campos');
    }
  };

  const handleFavTeacher = async (): Promise<void> => {
    const isTeacherFav = !isLiked;
    if (doubtInfo) {
      await toggleFavTeacher(doubtInfo.teacher_id, isTeacherFav);
      setIsLiked((state) => !state);
    }
  };

  useEffect(() => {
    getDoubtInfoByDoubtUuid(doubtid).then((res) => {
      setDoubtInfo(res);
      setIsLiked(
        res?.teacher_subject?.is_favorite === 'true' ||
          res?.teacher_subject?.is_favorite === true,
      );
    });
    getDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubtid]);

  return (
    <Container>
      <Seo
        title={
          user.profileId === 'Teacher'
            ? 'Avaliação de Atendimento | Uber de plantões'
            : 'Avaliação de professor | Uber de plantões'
        }
        metaDesc="Created by thl dev"
      />
      <Heading>
        <div className="title">
          <UserInfo>
            <BackButton noText backToHome />
            <div className="img">
              <Image
                src={getParticipantImage()}
                width={66}
                height={66}
                layout="intrinsic"
                objectFit="cover"
              />
            </div>
            <div className="actions">
              <div className="user-info">
                <p>
                  {user.profileId === 'Teacher'
                    ? doubtInfo?.student_info.nick_name
                    : doubtInfo?.teacher_info.nick_name}
                </p>
                {user.profileId !== 'Teacher' && (
                  <Heart onClick={handleFavTeacher}>
                    {!buttonIsLoading ? (
                      <>
                        {isLiked ? (
                          <FaHeart className="popped" size={20} />
                        ) : (
                          <FiHeart size={20} />
                        )}
                      </>
                    ) : (
                      <Loading className="loading" size={1} />
                    )}
                  </Heart>
                )}
              </div>
              <div className="subject-info">
                <ImageContainer colors={getSubjectsColors('Português')}>
                  <Image
                    src={`/assets/svgs/${getDoubtImageName()}.svg`}
                    width={getImageSize(doubtInfo?.subject_id || 'Português')}
                    height={getImageSize(doubtInfo?.subject_id || 'Português')}
                    layout="fixed"
                    objectFit="contain"
                    className="icon"
                  />
                </ImageContainer>
                <p>{doubtInfo?.subject_id}</p>
              </div>
            </div>
          </UserInfo>
          <ChatInfo>
            <div className="attendence-details">
              <span>Detalhes do atendimento: </span>
              <p>
                Início:{' '}
                <strong>
                  {convertTimeStampToTimeLog(doubtInfo?.start_timestamp ?? 0, {
                    hours: true,
                    minutes: true,
                    seconds: true,
                  })}
                </strong>
              </p>
              <p>
                Fim:{' '}
                <strong>
                  {convertTimeStampToTimeLog(doubtInfo?.end_timestamp ?? 0, {
                    hours: true,
                    minutes: true,
                    seconds: true,
                  })}
                </strong>
              </p>
            </div>
            <div className="billing-details">
              <span>Detalhes da cobrança: </span>
              <p>
                Preço:{' '}
                <strong>
                  {convertNumberToBRL(doubtInfo?.teacher_price ?? 0)}
                  /min
                </strong>
              </p>
              <p>
                Total:{' '}
                <strong>
                  {convertNumberToBRL(doubtInfo?.call_final_price ?? 0)}
                </strong>
              </p>
            </div>
            <div className="chat-history">
              <Button
                type="button"
                onClick={() => push(`/chat?doubtid=${doubtInfo?.doubt_id}`)}
              >
                Ver Conversa
              </Button>
            </div>
          </ChatInfo>
        </div>
      </Heading>
      <Content>
        <UserActions>
          <div className="column-1">
            <p>
              {user.profileId === 'Teacher'
                ? 'Voce acredita que respondeu a duvida do aluno?'
                : 'Sua dúvida foi respondida?'}
            </p>
            <div className="checkbox-container">
              <div className="option">
                <Checkbox
                  round
                  disabled={buttonIsLoading}
                  isSelected={isDoubtAnswered && isDoubtAnswered}
                  onClick={() =>
                    setIsDoubtAnswered(isDoubtAnswered ? undefined : true)
                  }
                />
                <span>Sim</span>
              </div>
              <div className="option">
                <Checkbox
                  round
                  disabled={buttonIsLoading}
                  isSelected={isDoubtAnswered === false}
                  onClick={() =>
                    setIsDoubtAnswered(
                      isDoubtAnswered === false ? undefined : false,
                    )
                  }
                />
                <span>Não</span>
              </div>
            </div>
            <div className="rating-wrapper">
              <h5>
                {user.profileId !== 'Teacher'
                  ? 'Avalie o professor'
                  : 'Avalie o atendimento'}
              </h5>
              <p>
                {user.profileId !== 'Teacher'
                  ? 'Selecione quantas estrelas o professor merece pela consulta'
                  : 'Selecione quantas estrelas voce daria para a qualidade do atendimento '}
              </p>
              <Rating
                ratingNote={ratingNote}
                onChange={(value) => setRatingNote(value)}
                isLoading={buttonIsLoading}
              />
            </div>
          </div>
          <div className="column-2">
            <h5>
              {user.profileId === 'Teacher'
                ? 'Deixe um comentario sobre o atendimento'
                : 'Deixe algum comentário sobre o professor:'}
            </h5>
            <textarea
              name="comments"
              placeholder="Observações..."
              id=""
              cols={30}
              rows={12}
              ref={notesTextAreaRef}
              disabled={buttonIsLoading}
            />
          </div>
         
        </UserActions>

      </Content>
       <div className="button--centralizar-mobile">
            <Button
              type="button"
              onClick={handleSubmitDoubtRating}
              disabled={buttonIsLoading}
            >
              {buttonIsLoading ? 'Finalizando...' : 'Finalizar'}
            </Button>
          </div>
    </Container>
  );
};

export default RatingPage;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { doubtid } = ctx.query;

  return {
    props: {
      doubtid,
    },
  };
});
