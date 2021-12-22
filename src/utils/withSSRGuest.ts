import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  getSession,
} from 'next-auth/client';
import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(ctx);
    const cookies = parseCookies(ctx);
    const { 'uberPlantao.user': savedUser } = cookies;

    if (session || savedUser) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
    // eslint-disable-next-line no-return-await
    return await fn(ctx);
  };
}
