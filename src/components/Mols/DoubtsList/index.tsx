import Image from 'next/image';
import { useRouter } from 'next/router';

import { DoubtCard } from 'components/Atoms/DoubtCard';
import { SKDoubtCard } from 'components/Skeletons/DoubtCard';

import { DoubtList } from 'types/dtos/subjectDTOS';

import { useDoubt } from 'hooks/doubts';
import { Container, List, WaitingTeacher } from './styles';

type DoubtsListProps = {
  acceptedDoubts: DoubtList;
  activeDoubts: DoubtList;
  notAnsweredDoubts: DoubtList;
  isLoading: boolean;
  buttonIsLoading: boolean;
}

export const DoubtsList = ({
  acceptedDoubts,
  activeDoubts,
  notAnsweredDoubts,
  isLoading,
  buttonIsLoading,
}: DoubtsListProps): JSX.Element => {
  const { changeDoubtStatus } = useDoubt();
  const { push } = useRouter();

  const handleAcceptDoubt = async (doubtId: string): Promise<void> => {
    await changeDoubtStatus(
      doubtId,
      'TeacherAccepted',
      'teacher',
    );
  };

  const handleTeacherBackOff = async (doubtId: string): Promise<void> => {
    await changeDoubtStatus(
      doubtId,
      'TeacherBackOff',
      'teacher',
    );
  };

  return (
    <Container>
      <List>
        <span>Perguntas Abertas</span>
        <div className="content hasVerticalScroll">
          {(notAnsweredDoubts.length > 0 && !isLoading)
            && notAnsweredDoubts.map((doubt) => (
              <DoubtCard
                key={doubt.doubt_id}
                doubt={doubt}
                actionText="accept"
                action={() => handleAcceptDoubt(doubt.doubt_id)}
                buttonIsLoading={buttonIsLoading}
              />
            ))}
          {isLoading && (
            <>
              <SKDoubtCard />
              <SKDoubtCard />
              <SKDoubtCard />
              <SKDoubtCard />
            </>
          )}
          <WaitingTeacher>
            <p>Aguardando dúvidas...</p>
            <div className="image-wrapper">
              <Image
                src="/assets/gifs/logoLoading.gif"
                width={24}
                height={24}
                layout="fixed"
                objectFit="contain"
                className="icon"
              />
            </div>
          </WaitingTeacher>
        </div>
      </List>
      <List>
        <div className="auto sub-list">
          <span>Perguntas Ativas</span>
          <div className="sub-content auto hasVerticalScroll">
            {(activeDoubts.length > 0 && !isLoading)
              && activeDoubts.map((doubt) => (
                <DoubtCard
                  key={doubt.doubt_id}
                  doubt={doubt}
                  actionText="Acessar chat"
                  action={() => push(`/chat?doubtid=${doubt.doubt_id}`)}
                  chatStyle
                  buttonIsLoading={buttonIsLoading}
                />
              ))}
            {isLoading && (
              <>
                <SKDoubtCard />
              </>
            )}
          </div>
        </div>
      </List>
      <List>
      <div className={`sub-list ${activeDoubts.length < 1 ? 'flex-1' : ''}`}>
          <span>Perguntas Aceitas</span>
          <div className="sub-content hasVerticalScroll">
            {(acceptedDoubts.length > 0 && !isLoading)
              && acceptedDoubts.map((doubt) => (
                <DoubtCard
                  key={doubt.doubt_id}
                  doubt={doubt}
                  actionText="Desitir do atendimento"
                  action={() => handleTeacherBackOff(doubt.doubt_id)}
                  buttonIsLoading={buttonIsLoading}
                />
              ))}
            {isLoading && (
              <>
                <SKDoubtCard />
                <SKDoubtCard />
                <SKDoubtCard />
              </>
            )}
          </div>
        </div>
      </List>
    </Container>
  );
};
