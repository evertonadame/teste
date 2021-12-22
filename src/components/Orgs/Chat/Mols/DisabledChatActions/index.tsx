import { Form } from '@unform/web';
import { Input } from 'components/Atoms/Input';
import { FiCamera, FiSend } from 'react-icons/fi';
import { Container } from './styles';

const DisabledChatActions: React.FC = () => {
  const iconStyle = { marginTop: '-5px' } as React.CSSProperties;
  const inputStyle = {
    width: 500,
    height: 15,
  };

  return (
    <Container>
      <Form onSubmit={() => console.log()} className="form">
        <Input name="text" style={inputStyle} enabled={false} />
        <div className="imageUploader">
          <FiCamera size={24} color="#5b6276" style={iconStyle} />
        </div>
        <FiSend size={24} type="submit" color="#5b6276" cursor="block" />
      </Form>
    </Container>
  );
};

export default DisabledChatActions;
