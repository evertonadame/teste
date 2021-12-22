import { DoubtListItem } from 'types/dtos/subjectDTOS';

// eslint-disable-next-line import/no-cycle
import { ChatStyleDoubtCard } from './ChatStyle';
// eslint-disable-next-line import/no-cycle
import { DefaultDoubtCard } from './Default';

export type DoubtCardProps = {
  actionText: string;
  buttonIsLoading?: boolean;
  chatStyle?: boolean;
  doubt: DoubtListItem;
  small?: boolean;
  action?(): void;
}

export const DoubtCard = ({
  actionText = 'accept',
  buttonIsLoading,
  chatStyle = false,
  doubt,
  small = false,
  action,
}: DoubtCardProps): JSX.Element => (
  <>
    {chatStyle ? (
      <ChatStyleDoubtCard
        doubt={doubt}
        small={small}
        action={action}
        actionText={actionText}
        buttonIsLoading={buttonIsLoading}
      />
    ) : (
      <DefaultDoubtCard
        doubt={doubt}
        small={small}
        action={action}
        actionText={actionText}
        buttonIsLoading={buttonIsLoading}
      />
    )}
  </>
);
