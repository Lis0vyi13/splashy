'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { SignUpFormData, signUpSchema } from '../model';

const SignUpForm = () => {
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  });

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit((data) => console.log(data))}
        className="space-y-5 min-w-full"
      >
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
                <Input height="lg" type="password" {...field} />
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
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
