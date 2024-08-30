import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/db';

import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { ExtendedUser } from './lib/next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },

  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      // The `authorize` function is used to check credentials
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // validate the email and password
        if (!email || !password) {
          return null;
        }

        // find the user in the database
        const user = await prisma.petsoftUser.findUnique({
          where: {
            email: email as string,
          },
        });
        // check if the user exists
        if (!user) {
          console.log('User not found');
          return null;
        }
        // check if the password is correct : compare the password from the database with the password from the form
        const passwordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        // if the password is incorrect
        if (!passwordMatch) {
          console.log('Invalid password');
          return null;
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email!;
        token.hasAccess = (user as ExtendedUser).hasAccess;
      }

      if (trigger === 'update') {
        // on every request/update
        const userFromDb = await prisma.petsoftUser.findUnique({
          where: {
            email: token.email as string,
          },
        });
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.userId as string;
      session.user.hasAccess = token.hasAccess as boolean;

      return session;
    },
  },
});
