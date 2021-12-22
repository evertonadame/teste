import { useMemo } from 'react';

import { DashboardDTO } from 'types/dtos/subjectDTOS';
import { getSubjectsColors } from 'utils/functions';

import { SubjectCard } from 'components/Atoms/SubjectCard';
import { SKSubjectCard } from 'components/Skeletons/SubjectCard';

import { Doubt } from 'types/SubjectModels';
import { Container, Content } from './styles';

type SubjectsListProps = {
  isLoading: boolean;
  dashboard: DashboardDTO | undefined;
}

export const SubjectsList = ({ dashboard, isLoading }: SubjectsListProps): JSX.Element => {
  const profile = dashboard?.profiles && dashboard?.profiles[0]?.user_profile;

  const subjectHasDoubts = useMemo(() => {
    const filter = profile?.doubts.reduce((reduceObject, item) => {
      if (!reduceObject.some((i) => i.subject_id === item.subject_id)) {
        reduceObject.push(item);
      }

      return reduceObject;
    }, [] as Doubt[]);

    return filter;
  }, [profile?.doubts]);

  return (
    <Container>
      <Content isLoading={isLoading}>
        {(isLoading) ? (
          <>
            <SKSubjectCard />
            <SKSubjectCard />
            <SKSubjectCard />
            <SKSubjectCard />
          </>
        ) : (
          dashboard?.profiles && dashboard?.profiles[0]?.user_profile?.subjects?.map((item) => (
            <SubjectCard
              subjectInfo={{
                name: item.name,
                path: item.image_url,
                colors: getSubjectsColors(item.name),
              }}
              link={item.subject_id}
              key={item.subject_id}
              doubt={subjectHasDoubts?.find((i) => (i.subject_id === item.subject_id))}
              hasDoubts={subjectHasDoubts?.some((i) => i.subject_id === item.subject_id) ?? false}
            />
          ))
        )}
      </Content>
    </Container>
  );
};
