'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import AuthFormButton from './AuthFormButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authFormSchema } from '@/lib/validations';
import { z } from 'zod';
import {
  signInWithCredentials,
  signUpWithCredentials,
} from '@/actions/user.actions';

type AuthFormProps = {
  type: 'sign-in' | 'sign-up';
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const formData = new FormData();
        const { email, password } = getValues();
        formData.append('email', email);
        formData.append('password', password);

        if (type === 'sign-in') {
          const response = await signInWithCredentials(formData);
          if (response?.error) {
            setErrorMessage(response.error);
          }
        } else {
          const response = (await signUpWithCredentials(formData)) as any;
          if (response.error) {
            setErrorMessage(response.error);
          }
        }
      }}
      className="mx-auto w-full max-w-sm space-y-4 px-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <AuthFormButton type={type} />
    </form>
  );
};

export default AuthForm;
