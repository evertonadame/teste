import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

const SignInPage = (): null => {
  const [session, loading] = useSession();
  const { push } = useRouter();

  const handleSignInProvider = async (): Promise<void> => {
    await signIn();
  };

  useEffect(() => {
    // eslint-disable-next-line no-void
    if (!loading && !session) {
      handleSignInProvider();
    }
    if (!loading && session) window.close();
  }, [session, loading, push]);

  return null;
};

export default SignInPage;
