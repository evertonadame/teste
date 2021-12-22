import { useCallback } from 'react';

import { Container } from './styles';

interface ChatActionsProps {
  sendTeacherConfirmation: any;
}
const TeacherConfirmation: React.FC<ChatActionsProps> = ({
  sendTeacherConfirmation,
}) => {
  const handleAnswer = useCallback(() => {
    sendTeacherConfirmation();
  }, [sendTeacherConfirmation]);

  return (
    <Container>
      <button className="answer" type="button" onClick={handleAnswer}>
        RESPONDER
      </button>
    </Container>
  );
};

export default TeacherConfirmation;
