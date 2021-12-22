import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from 'components/Atoms/Button';
import { Loading } from 'components/Atoms/Loading';
import { UserStatus } from 'components/Atoms/UserStatus';

// eslint-disable-next-line import/no-cycle
import { DoubtCardProps } from './index';

import { Container, CollapseButton } from './styles';

export const DefaultDoubtCard = ({
  doubt, small, buttonIsLoading = false, action, actionText,
}: DoubtCardProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { push } = useRouter();

  const getImage = (): string => {
    if ((doubt && doubt.student_info && doubt.student_info.image_url) && doubt.student_info.image_url !== ' ') {
      return doubt.student_info.image_url;
    }
    return 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png';
  };

  return (
    <Container isLoading={buttonIsLoading} isCollapsed={isCollapsed} small={small ?? false}>
      <div className="heading">
        <div className="outer-img-container">
          <div className="img">
            <Image
              src={getImage()}
              width={48}
              height={48}
              layout="intrinsic"
              objectFit="contain"
              className="icon"
            />
          </div>
          <div className="status-badge">
            <UserStatus status={doubt?.student_info?.availability ?? 'offline'} />
          </div>
        </div>
        <div className="info">
          <h4>{`${doubt?.student_info?.nick_name ?? 'Sem nome'} - ${doubt?.student_info?.level_id ?? 'sem level'}`}</h4>

        </div>
        <div className="button-container">
          <Button
            onClick={action || (() => console.log(actionText))}
            type="button"
            className={`answer-question-button ${actionText !== 'accept' ? 'danger' : ''}`}
          >
            {!buttonIsLoading && actionText === 'accept' && (
              <p>Aceitar pergunta</p>
            )}
            {!buttonIsLoading && actionText !== 'accept' && (
              actionText
            )}
            {buttonIsLoading && (
              <Loading size={1.5} />
            )}
          </Button>
        </div>
        <div className="open-doubt">
          <FaQuestionCircle className="link" size={14} onClick={() => push(`/chat/details/${doubt.doubt_id}`)} />
        </div>
      </div>

      <div className="question-content">
        <div className="text hasVerticalScroll">
          <p>
            {doubt?.text}
          </p>
        </div>
        {(doubt && doubt.image_url !== ' ') && (
        <Image
          src={doubt.image_url}
          width={120}
          height={120}
          layout="intrinsic"
          objectFit="contain"
          className="icon"
        />
        )}
      </div>
      <CollapseButton>
        <FiChevronDown onClick={() => setIsCollapsed((state) => !state)} size={20} />
      </CollapseButton>
    </Container>
  );
};
