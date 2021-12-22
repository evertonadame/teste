import {
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import {
  signIn,
  signOut,
} from 'next-auth/client';
import { parseCookies, destroyCookie, setCookie } from 'nookies';
import { toast } from 'react-toastify';

import { User } from 'types/AuthModels';
import { LoginDTO } from 'types/dtos/loginDTO';
import { api } from 'services/apiClient';

interface Login {
  email: string;
  password: string;
}

interface Signup {
  email: string;
  password: string;
  username: string;
  profileId: string;
  imageUrl: string;
  subjects?: string;
  schoolPhase?: string;
  schoolLevel?: string;
}

interface AuthContextData {
  user: User;
  isLoading: boolean;
  defaultSignIn(data: Login): Promise<void>;
  handleSignOut(): Promise<void>;
  signUp(info: Signup): Promise<void>;
  signInWithFacebook(): Promise<void>;
  updateUser(field: string, value: any): void;
}

type AuthProvider = {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProvider): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>(() => {
    const cookies = parseCookies();
    const { 'uberPlantao.user': savedUser } = cookies;

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      Object.assign(parsedUser, { defaultImg: 'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png' });
      return parsedUser;
    }

    return {} as User;
  });

  const { push } = useRouter();

  const signInWithFacebook = useCallback(
    async () => {
      // const FirebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
      // const result = await auth.signInWithPopup(FirebaseFacebookAuthProvider);

      // if (result) {
      //   console.log(result.user);
      // }

      setIsLoading(true);
      await signIn();
      setIsLoading(false);
    },
    [],
  );

  const defaultSignIn = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      try {
        const response = await api.post<LoginDTO>('/login', {
          email,
          password,
        });
       
        
        const theUser = {
          name: response.data.profiles[0].user_profile.nick_name,
          fullName: response.data.user.full_name,
          email: response.data.user.email,
          imageUrl: response.data.profiles[0].user_profile.image_url,
          userId: response.data.user.user_id,
          profileId: response.data.user.profile_id,
          token: response.data.auth.token,
          refreshToken: response.data.auth.refresh_token,
          phaseId: response.data.profiles[0].user_profile?.phase_id ?? 'none',
          levelId: response.data.profiles[0].user_profile?.level_id ?? 'none',
          offeredSubjects: response.data.profiles[0].user_profile?.offered_subjects ?? 'none',
          wallet: response.data.user.wallet,
        };

        const { token, refresh_token } = response.data.auth;

        api.defaults.headers.authorization = token;

        setCookie(undefined, 'uberPlantao.user', JSON.stringify(theUser), {
          maxAge: 60 * 60 * 72, // 3 hours
          path: '/',
        });
        setCookie(undefined, 'uberPlantao.token', token, {
          maxAge: 60 * 60 * 72, // 3 hours
          path: '/',
        });
        setCookie(undefined, 'uberPlantao.refreshToken', refresh_token, {
          maxAge: 60 * 60 * 72, // 3 hours
          path: '/',
        });

        setUser(theUser as User);
        push('/dashboard');
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    },
    [push],
  );

  const signUp = useCallback(async ({
    email,
    password,
    username,
    profileId,
    subjects,
    imageUrl = '',
    schoolLevel,
    schoolPhase,
  }: Signup) => {
    setIsLoading(true);
    const body = {
      email,
      password,
      full_name: username,
      nick_name: username,
      image_url: imageUrl,
      profile_id: profileId,
    };

    if (schoolLevel !== '') {
      Object.assign(body, {
        phase_id: schoolPhase,
        level_id: schoolLevel,
      });
    }

    if (subjects) {
      Object.assign(body, { subjects });
    }
    await api.post('/signup', body);
    setIsLoading(false);

    if (profileId === 'Teacher') {
      push('/');
    } else {
      try {
        await defaultSignIn({ email, password });
      } catch (err) {
        toast.error('Ops... parece que algo deu errado ao logar automáticamente!', { draggable: true });
      }
      push('/');
    }
  }, [defaultSignIn, push]);

  const handleSignOut = useCallback(async () => {
    destroyCookie(undefined, 'uberPlantao.user');
    destroyCookie(undefined, 'uberPlantao.token');
    destroyCookie(undefined, 'uberPlantao.refreshToken');

    setUser({} as User);

    await signOut();

    push({
      hostname: process.env.NEXTURL,
      pathname: '/',
    });
  }, [push]);

  const updateUser = (field: string, value: any):void => {
    const updatedUser = { ...user };
    Object.assign(updatedUser, { [field]: value });

    setCookie(undefined, 'uberPlantao.user', JSON.stringify(updatedUser), {
      maxAge: 60 * 60 * 72, // 3 hours
      path: '/',
    });

    setUser({ ...updatedUser });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        defaultSignIn,
        handleSignOut,
        signUp,
        signInWithFacebook,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
