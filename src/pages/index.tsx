import Image from 'next/image';
import { useRef, useCallback } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

// import NewWindow from 'react-new-window';
// import { useSession } from 'next-auth/client';

import getValidationErrors from 'utils/getValidationErrors';
import { withSSRGuest } from 'utils/withSSRGuest';

import { Button } from 'components/Atoms/Button';
import { FbButton } from 'components/Atoms/FbButton';
import { Input } from 'components/Atoms/Input';
import { Seo } from 'components/Atoms/Seo';
import { Separator } from 'components/Atoms/Separator';

import {
  Container, LogoContainer, FormContainer, ButtonsContainer, ContainerSeparator
} from 'styles/pages/index';
import { useAuth } from 'hooks/auth';

type DataFormInfo = {
  email: string;
  password: string;
}

const Home = (): JSX.Element => {
  // const [testPopup, setTestPopup] = useState(false);
  // const [session] = useSession();

  const formRef = useRef<FormHandles>(null);

  const { push } = useRouter();
  const { signInWithFacebook, isLoading, defaultSignIn } = useAuth();

  const handleFbLogin = async (): Promise<void> => {
    signInWithFacebook();
  };

  const handleLogin = useCallback(
    async (data: DataFormInfo) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email('E-mail inválido').required('E-mail obrigatório!'),
          password: Yup.string().required('Senha obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await defaultSignIn(data);

        push('/dashboard');
      } catch (err) {
        console.log(err);
        toast.error('Erro na autenticação :(');
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [defaultSignIn, push],
  );

  return (

    <>
      <Seo title="Home | Uber de plantões" metaDesc="Created by thl dev" />
    <Container>
      {/* {(testPopup && !session) && (
        <NewWindow
          url="/sign-in"
          onUnload={() => {
            console.log('oi');
            setTestPopup(false);
            window.location.pathname = '/dashboard';
          }}
        />
      )} */}
    
      <LogoContainer>
        <Image src="/assets/images/nlight.png" width={130} height={98} objectFit="contain" />
        <Image src="/assets/svgs/projectTitle.svg" width={86} height={33} objectFit="contain" />
      </LogoContainer>
      <FormContainer>
          <p>LOGIN</p>
        <Form ref={formRef} onSubmit={handleLogin} autoComplete="off">
         
          <Input
            name="email"
            icon={FiUser}
            placeholder="Digite seu e-mail"
            enabled={!isLoading}
            autoComplete="off"
            containerStyle={{
              
              height: '44px'
            }}
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Sua senha"
            enabled={!isLoading}
            type="password"
            autoComplete="off"
            containerStyle={{
             
              height: '44px',
            }}
            
          />
          <section className="forgot-password">
            <span>esqueci minha senha</span>
          </section>
          <ButtonsContainer>
            {/* <button type="button" onClick={() => setTestPopup((state) => !state)}>
              teste
            </button> */}
            <Button type="submit" loading={isLoading}>
              ENTRAR
            </Button>
            <Separator className="sep" type="vertical" customWidth={35}/>
            <FbButton type="button" onClick={handleFbLogin} />
          </ButtonsContainer>
          <ContainerSeparator>
          <Separator className="contain" type="horizontal" customWidth={100}  />
          </ContainerSeparator>
        </Form>
        
      </FormContainer>
      <Button onClick={() => push('/signup')} outlined>
          NOVO CADASTRO
      </Button>
    </Container>
  </>
  );
};

export default Home;

export const getServerSideProps = withSSRGuest(async () => ({
  props: {},
}));
