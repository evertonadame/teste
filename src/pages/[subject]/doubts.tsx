import { useRef, useCallback, useState } from 'react';

import Image from 'next/image';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { v4 } from 'uuid';

import getValidationErrors from 'utils/getValidationErrors';
import { withSSRAuth } from 'components/withSSRAuth';

import { BackButton } from 'components/Atoms/BackButton';
import { Textarea } from 'components/Atoms/Textarea';
import { Seo } from 'components/Atoms/Seo';
import ImageUpload, { ImageUploadHanldes } from 'components/Atoms/ImageUpload';

import {
  Container, Content, Heading, QuestionContainer, ButtonsContainer, StyledButton, ButtonsWrapperContainer
} from 'styles/pages/doubts';
import { useDoubt } from 'hooks/doubts';
import { useAuth } from 'hooks/auth';
import { useRouter } from 'next/router';

type DoubtsProps = {
  subject: {
    name: string;
    img: string;
  };
}

type DataFormInfo = {
  question: string;
}

const Doubts = ({ subject }: DoubtsProps): JSX.Element => {
  const [imagesArray, setImagesArray] = useState<string[]>(['']);

  const { submitDoubt, isLoading } = useDoubt();
  const { user } = useAuth();
  const { push } = useRouter();

  const formRef = useRef<FormHandles>(null);
  const multipleImageUploadRef = useRef<ImageUploadHanldes>(null);

  const handleChangeImg = (imgs: string[]): void => {
    setImagesArray(imgs);
  };

  const handleSubmit = useCallback(async (data:DataFormInfo) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        question: Yup.string().required('Escreva uma dúvida'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const uuid = v4();

      const newDoubt = {
        doubt_uuid: uuid,
        doubt_text: data.question,
        user_id: user.userId,
        subject_id: subject.name,
        doubt_image: imagesArray[0] ? imagesArray[0] : ' ',
      };

      
      await submitDoubt(newDoubt);

      formRef.current?.reset();
      multipleImageUploadRef.current?.reset();

      push(`/${subject.name}/teacher-list?doubtid=${uuid}`);
    } catch (err) {
      toast.error('Ops... parece que algo deu errado, confira as informações!', { draggable: true });
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }

  }, [submitDoubt, subject.name, user.userId, imagesArray, push]);

  return (
    <Container>
      <Seo title="Lista de dúvidas | Uber de plantões" metaDesc="Created by thl dev" />
      <Content>
   
        <Heading>
            <BackButton noText />
          <div className="title">
            <Image
              src={`/assets/svgs/${subject.img}.svg`}
              width={40}
              height={40}
              layout="fixed"
              objectFit="contain"
              className="icon"
            />
            <p>{subject.name}</p>
          </div>
         
        </Heading>
         <span>Para continuar, coloque abaixo a sua dúvida, de forma clara!</span>
        <QuestionContainer>
          <p>Escreva aqui a sua dúvida</p>
          <div className="formWrapper">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Textarea
                id="textarea"
                name="question"
                containerStyle={{ width: '100%' }}
              />
              <ButtonsWrapperContainer>
             
              <ImageUpload type="multiple" setImgs={handleChangeImg} ref={multipleImageUploadRef} />
               <ButtonsContainer>
                <StyledButton loading={isLoading} type="submit" id="text-capture">ENVIAR PERGUNTA</StyledButton>
              </ButtonsContainer>
              </ButtonsWrapperContainer>
            </Form>
          </div>
        </QuestionContainer>
      </Content>
    </Container>
  );
};

export default Doubts;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { query } = ctx;
  const formatedSubjectName = String(query.subject).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return ({
    props: {
      subject: {
        name: query.subject,
        img: formatedSubjectName,
      },
    },
  });
});
