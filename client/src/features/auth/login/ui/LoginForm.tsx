'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/ui';

import type { LoginFormData } from '../model';
import { loginSchema, useLoginMutation } from '../model';

const LoginForm = () => {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const loginMutation = useLoginMutation();

  const handleSubmit = loginForm.handleSubmit(
    async (formData: LoginFormData) => {
      await loginMutation.mutateAsync(formData);
      try {
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        console.error(error.response?.data.message || error.message);
      }
    }
  );

  const buttonText = loginForm.formState.isSubmitting
    ? 'Logging in...'
    : 'Login';

  return (
    <Form {...loginForm}>
      <form onSubmit={handleSubmit} className="space-y-5 min-w-full">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input height="lg" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input height="lg" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 flex-row-reverse w-fit">
              <FormLabel className="cursor-pointer mt-0.5">
                Remember Me
              </FormLabel>
              <FormControl>
                <Checkbox
                  size="lg"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button width="full" size="lg" type="submit">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
