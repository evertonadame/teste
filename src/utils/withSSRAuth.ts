import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  getSession,
} from 'next-auth/client';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from 'services/errors/AuthTokenError';

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(ctx);
    const cookies = parseCookies(ctx);
    const { 'uberPlantao.user': savedUser } = cookies;

    if (!session && !savedUser) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'uberPlantao.user');
        destroyCookie(ctx, 'uberPlantao.token');
        destroyCookie(ctx, 'uberPlantao.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      return err;
    }
  };
}
