import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';

const options = {
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_FACEBOOK_ID,
      clientSecret: process.env.NEXT_FACEBOOK_SECRET,
      authorization: {
        params: {
          scope: 'email public_profile',
        },
      },
    }),
    AppleProvider({
      clientId: process.env.NEXT_APPLE_ID,
      clientSecret: {
        appleId: process.env.NEXT_APPLE_ID,
        teamId: process.env.NEXT_APPLE_TEAM_ID,
        privateKey: process.env.NEXT_APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        keyId: process.env.NEXT_APPLE_KEY_ID,
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
