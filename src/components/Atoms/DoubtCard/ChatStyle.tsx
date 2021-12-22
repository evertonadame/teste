import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { convertTimeStampToTimeLog } from 'utils/functions';

import { UserStatus } from 'components/Atoms/UserStatus';

import { ChatStyleContaier } from './styles';

// eslint-disable-next-line import/no-cycle
import { DoubtCardProps } from './index';

export const ChatStyleDoubtCard = ({
  doubt,
}: DoubtCardProps): JSX.Element => {
  const { push } = useRouter();

  const getImage = (): string => {
    if ((doubt && doubt.student_info && doubt.student_info.image_url) && doubt.student_info.image_url !== ' ') {
      return doubt.student_info.image_url;
    }
    return 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png';
  };

  return (
    <ChatStyleContaier>
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
          <span>{doubt.last_doubt_message?.message}</span>
        </div>
        <div className="open-doubt">
          <FaArrowRight className="link" size={14} onClick={() => push(`/chat?doubtid=${doubt.doubt_id}`)} />
        </div>
        <div className="last-msg-info">
          {doubt.last_doubt_message && (
            <>
              <span className={doubt.badge_not_already_viewed && doubt.badge_not_already_viewed > 0 ? '' : 'hide-badge'}>
                {doubt.badge_not_already_viewed && doubt.badge_not_already_viewed <= 9 ? doubt.badge_not_already_viewed : '9+'}
              </span>
              <p>{convertTimeStampToTimeLog(doubt.last_doubt_message.timestamp)}</p>
            </>
          )}
        </div>
      </div>
    </ChatStyleContaier>
  );
};
