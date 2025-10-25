'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/ui';

import type { ForgotPasswordFormData } from '../model';
import { forgotPasswordSchema } from '../model';

const ForgotPasswordForm = () => {
  const loginForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit((data) => console.log(data))}
        className="space-y-5 min-w-full"
      >
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

        <Button width="full" size="lg" type="submit">
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
