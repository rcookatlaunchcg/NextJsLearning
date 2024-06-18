import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import GoogleProvider from "next-auth/providers/google";
import pool from '@/app/lib/db'
import type { UserTable } from '@/app/lib/definitions';
 
async function getUser(email: string): Promise<UserTable | undefined> {
  try {
    const user = await pool.query<UserTable>(`SELECT * FROM users WHERE email=$1`, [email]);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//https://www.youtube.com/watch?v=O8Ae6MC5bf4
//https://www.youtube.com/watch?v=ThMuhf6jv-s

export interface EnrichedUser extends User {
  hasAccount: boolean;
};

export const {
  handlers: { GET, POST},
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (user && user.email) {
    //     const dbUser = await getUser(user.email);
    //     if (dbUser) {
    //       const testUser = {
    //         ...user,
    //         hasAccount: false,
    //       } satisfies EnrichedUser;
    //       user = testUser;
  
    //       return true;
    //     }
    //     return '/register';
    //   }
    //   return false;
    // },
    // jwt({token, user, account }) {
    //   if (account && user) {
    //     token.providerAccountId = account.providerAccountId;
    //     token.accessToken = account.access_token;
    //     token.user = user;
    //     token.test = "test";
    //   }
    //   return token
    // },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        const dbUser = await getUser(session.user.email);
        session.isRegistered = dbUser ? true : false;
      }

      //console.log(session);
      //console.log(token);
      // if (session.user) {
      //   session.user.id = token.sub as string;
      //   session.user.test = "tesT";
      //   session.user = token.user;
      //   session.accessToken = token.accessToken;
      //   session.accessTokenExpires = token.accessTokenExpires;
      //   session.refreshToken = token.refreshToken;
      //   session.idToken = token.idToken;
      //   session.test = "test";
      // }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
});