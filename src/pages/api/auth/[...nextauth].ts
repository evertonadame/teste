import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.FB_APP_ID,
      clientSecret: process.env.FB_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      return {
        ...session,
        sub: token.sub,
      };
    },
  },
});
