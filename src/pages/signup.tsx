import {
  useState, useCallback, useRef,
} from 'react';
import {
  FiUser, FiLock, FiPhone, FiMail, FiBookOpen, FiArrowLeft,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from 'utils/getValidationErrors';
import { getStudentPhase, getStudentPhaseLevels } from 'services/mocks';
import { telMask } from 'utils/masks';
import { useAuth } from 'hooks/auth';

import { Button } from 'components/Atoms/Button';
import { Input } from 'components/Atoms/Input';
import { Seo } from 'components/Atoms/Seo';
import { Separator } from 'components/Atoms/Separator';
import ImageUpload from 'components/Atoms/ImageUpload';
import { Dropdown } from 'components/Atoms/Dropdown';

import { Switch } from 'components/Mols/Switch';

import { Container, FormWrapper } from '../styles/pages/signup';

type DataFormInfo = {
  username: string;
  email: string;
  phone: string;
  subjects: string
  password: string;
  confirmPassword: string;
}

const SignUp = (): JSX.Element => {
  const [accountType, setAccountType] = useState('Estudante');
  const [imgUrl, setImgUrl] = useState('');
  const [schoolPhase, setSchoolPhase] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');

  const { signUp, isLoading } = useAuth();
  const { push } = useRouter();

  const formRef = useRef<FormHandles>(null);

  const handleChangeImg = (img: string): void => {
    setImgUrl(img);
  };

  const handleChangeAccountType = useCallback((value: string) => {
    setSchoolPhase('');
    setAccountType(value);
  }, []);

  const handleChangeSchoolPhase = (value: string): void => {
    setSchoolPhase('');
    setTimeout(() => {
      setSchoolPhase(value);
    }, 250);
  };

  const handleSignUp = useCallback(async (data: DataFormInfo) => {
    try {
      formRef.current?.setErrors({});
      // eslint-disable-next-line no-param-reassign
      data.phone = data.phone.replaceAll(/[^\d]/g, '');

      if ((!schoolLevel || !schoolPhase) && accountType !== 'Professor') {
        toast.error('Você precisa selecionar fase e nível escolar!', { draggable: true });
        return;
      }

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário obrigatório!').when(() => {
          if (accountType === 'Estudante' && !schoolPhase && !schoolLevel) {
            return Yup.string().required('Selecione sua fase escolar');
          }
          return Yup.string();
        }),
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório!'),
        phone: Yup.string().required('Número de telefone inválido'),
        subjects: Yup.string().when(() => {
          if (accountType === 'Professor') {
            return Yup.string().required('O campo matéria é obrigatório para professores');
          }
          return Yup.string();
        }),
        password: Yup.string().when(() => {
          if (accountType !== 'Professor') {
            return Yup.string().required('Senha obrigatória!');
          }
          return Yup.string();
        }),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const profileId = accountType === 'Estudante' ? 'Student' : 'Teacher';

      const user = {
        email: data.email,
        password: data.password,
        username: data.username,
        profileId,
        subjects: data.subjects ?? null,
        imageUrl: imgUrl,
        schoolPhase,
        schoolLevel,
      };

      await signUp(user);
      toast.info(accountType === 'Professor' ? 'Em breve entraremos em contato' : 'Sua conta foi criada com sucesso!');
    } catch (err) {
      toast.error('Ops... parece que algo deu errado, confira as informações!', { draggable: true });
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, [accountType, signUp, imgUrl, schoolPhase, schoolLevel]);

  return (
    <>
      <Seo title="SignUp | Uber de plantões" metaDesc="Created by thl dev" />
      <Container>
      <div className="centralizar">
      <FiArrowLeft size={36} onClick={() => push('/')} className="svgSair"/>
        <h1>Cadastro</h1>
        </div>
        <div className="headerActions">
        
          <Switch
            type="1"
            values={['Estudante', 'Professor']}
            switchValue={accountType}
            onChange={handleChangeAccountType}
          />
        </div>

        <ImageUpload type="simple" setImg={handleChangeImg} customChild={false} />
        <FormWrapper>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="username"
              icon={FiUser}
              placeholder="Digite seu nome"
              enabled={!isLoading}
              containerStyle={{
                width: '100%',
                height: '44px',
              }}
              disabled={isLoading}
            />
            {accountType === 'Estudante' && (
              <div className="dropdownWrapper">
                <Dropdown
                  arrowColor="#fff"
                  textColor="#fff"
                  backgroundCollor="#812E93"
                  customFontSize={14}
                  customRadius={28}
                  customWidth={100}
                  customHeight={2.75}
                  title="Selecionar fase escolar"
                  items={getStudentPhase()}
                  defaultValue={{ key: '', value: '' }}
                  isLoading={isLoading}
                  onChange={(e: any) => (e.key ? handleChangeSchoolPhase(e.key) : handleChangeSchoolPhase(''))}
                />
                {schoolPhase !== '' && (
                  <Dropdown
                    arrowColor="#fff"
                    textColor="#fff"
                    customFontSize={14}
                    customRadius={28}
                    customWidth={100}
                    customHeight={2.75}
                    backgroundCollor="#812E93"
                    title="Selecionar nível escolar"
                    items={getStudentPhaseLevels(schoolPhase)}
                    defaultValue={{ key: '', value: '' }}
                    isLoading={isLoading}
                    onChange={(e: any) => setSchoolLevel(e.key)}
                  />
                )}
              </div>
            )}
            <Input
              name="email"
              icon={FiMail}
              placeholder="Digite seu e-mail"
              enabled={!isLoading}
              containerStyle={{
                width: '100%',
                height: '44px',
              }}
              disabled={isLoading}
            />
            <Input
              name="phone"
              icon={FiPhone}
              placeholder="Digite seu telefone"
              enabled={!isLoading}
              mask={telMask}
              containerStyle={{
                width: '100%',
                height: '44px',
              }}
              disabled={isLoading}
            />
            {accountType === 'Professor' && (
              <Input
                name="subjects"
                icon={FiBookOpen}
                placeholder="Ex: matematica, fisica, biologia ..."
                focusPlaceholder="Matéria que desejo ensinar"
                enabled={!isLoading}
                containerStyle={{
                  width: '100%',
                  height: '44px',
                }}
                disabled={isLoading}
              />
            )}
            {accountType !== 'Professor' && (
              <>
                <Input
                  name="password"
                  icon={FiLock}
                  placeholder="Sua senha"
                  enabled={!isLoading}
                  type="password"
                  containerStyle={{
                    width: '100%',
                    height: '44px',
                  }}
                  disabled={isLoading}
                />
                <Input
                  name="confirmPassword"
                  icon={FiLock}
                  placeholder="Confirmar senha"
                  enabled={!isLoading}
                  type="password"
                  containerStyle={{
                    width: '100%',
                    height: '44px',
                  }}
                />
              </>
            )}
            <section className="forgot-password">
              <Separator className="sep" type="horizontal" />
            </section>
             <Button loading={isLoading} type="submit" disabled={isLoading}>
              CADASTRAR
             </Button>
          </Form>
        </FormWrapper>
       
      </Container>
    </>
  );
};

export default SignUp;
