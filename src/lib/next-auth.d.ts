/* eslint-disable no-unused-vars */
import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      hasAccess: boolean;
    };
  }
}

// Assuming your user model has 'hasAccess' property
interface ExtendedUser extends User {
  hasAccess: boolean;
}
