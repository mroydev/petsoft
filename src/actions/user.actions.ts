'use server';

import prisma from '../lib/db';
import bcrypt from 'bcryptjs';

import { signIn, signOut } from '@/auth';
import { revalidatePath } from 'next/cache';
import { authFormSchema } from '@/lib/validations';

// sign in with OAuth
export async function signInWithOAuth(provider: string) {
  await signIn(provider, { redirectTo: '/dashboard' });
  revalidatePath('/dashboard');
}

// sign out user
export const signOutUser = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

// sign in with credentials
export async function signInWithCredentials(formData: FormData) {
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validation = authFormSchema.safeParse(userData);
  if (!validation.success) {
    return { error: 'Invalid credentials' };
  }

  const user = await prisma.petsoftUser.findUnique({
    where: { email: userData.email },
  });

  if (!user) {
    return { error: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!isPasswordValid) {
    return { error: 'Invalid password' };
  }

  const hasAccess = user.hasAccess;

  await signIn('credentials', {
    email: userData.email,
    password: userData.password,
    redirectTo: hasAccess ? '/dashboard' : '/payment',
  });
  // Revalidate the appropriate path based on the user's access
  revalidatePath(hasAccess ? '/dashboard' : '/payment');
}

// sign up with credentials
export const signUpWithCredentials = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = authFormSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.format() };
  }

  const existingUser = await prisma.petsoftUser.findUnique({
    where: { email },
  });
  if (existingUser) {
    return { error: 'User already exists!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.petsoftUser.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/payment',
  });
  revalidatePath('/payment');
  return newUser;
};
