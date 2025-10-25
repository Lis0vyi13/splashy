'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { DEFAULT_LOGIN_REDIRECT } from '@/shared/config';
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

import { signUp } from '../api';
import type { SignUpFormData } from '../model';
import { signUpSchema } from '../model';

const SignUpForm = () => {
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  });

  const router = useRouter();

  const handleSubmit = signUpForm.handleSubmit(
    async (formData: SignUpFormData) => {
      try {
        await signUp(formData);
        router.push(DEFAULT_LOGIN_REDIRECT);
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        console.error(error.response?.data.message || error.message);
      }
    }
  );

  const buttonText = signUpForm.formState.isSubmitting
    ? 'Signing up...'
    : 'Sign Up';

  return (
    <Form {...signUpForm}>
      <form onSubmit={handleSubmit} className="space-y-5 min-w-full">
        <FormField
          control={signUpForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input height="lg" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  height="lg"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input height="lg" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
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

export default SignUpForm;
