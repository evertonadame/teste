import { Container, Label } from './styles';

export const SKDoubtCard = (): JSX.Element => (
  <Container>
    <div className="info">
      <Label className="title" />
      <Label className="text" />
    </div>

    <div className="img-container">
      <Label className="img" />
    </div>
  </Container>
);
