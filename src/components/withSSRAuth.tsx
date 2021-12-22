import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const sessionToken = cookies['nextauth.token'];
    const authToken = cookies['uberPlantao.user'];
    const nextAuthToken = cookies['next-auth.session-token'];

    if (!sessionToken && !authToken && !nextAuthToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // console.log(nextAuthToken);

    try {
      return await fn(ctx);
    } catch (err) {
      console.log(err);

      destroyCookie(ctx, 'nextauth.token');
      destroyCookie(ctx, 'uberPlantao.user');
      destroyCookie(ctx, 'next-auth.session-token');
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
}
