import Image from 'next/image';
import { useRouter } from 'next/router';

import { Doubt } from 'types/SubjectModels';

import { NotificationBadge } from 'components/Atoms/NotificationBadge';

import { Container, ImageContainer } from './styles';

type SubjectCardProps = {
  subjectInfo: {
    name: string;
    path: string;
    colors: string[];
  }
  hasDoubts: boolean;
  doubt?: Doubt;
  link: string;
}

export const SubjectCard = ({
  subjectInfo,
  link,
  hasDoubts,
  doubt,
}: SubjectCardProps): JSX.Element => {
  const { push } = useRouter();

  const getImageSize = (subjectName:string): number => {
    switch (subjectName) {
      case 'Biologia':
        return 50;
      default:
        return 40;
    }
  };

  const sendToSubject = (): void => {
    if (hasDoubts) {
      if (doubt?.status !== 'StudentAccepted') {
        push(`/${link}/teacher-list?doubtid=${doubt?.doubt_id}`);
      } else {
        push(`/chat?doubtid=${doubt?.doubt_id}`);
      }
    } else {
      push(`/${link}/doubts`);
    }
  };

  return (
    <Container onClick={sendToSubject}>
      <ImageContainer colors={subjectInfo.colors}>
        <Image
          src={subjectInfo.path}
          width={getImageSize(subjectInfo.name)}
          height={getImageSize(subjectInfo.name)}
          layout="fixed"
          objectFit="contain"
          className="icon"
        />
      </ImageContainer>
      <span>{subjectInfo.name}</span>
      {hasDoubts && (
        <NotificationBadge number={1} />
      )}
    </Container>
  );
};
