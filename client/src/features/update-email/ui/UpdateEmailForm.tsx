'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useMeQuery } from '@/entities/user';

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

import {
  type UpdateEmailData,
  updateEmailSchema,
  useUpdateEmailMutation,
} from '../model';

const UpdateEmailForm = () => {
  const { data: userData } = useMeQuery();
  const updateEmailMutation = useUpdateEmailMutation();

  const form = useForm<UpdateEmailData>({
    resolver: zodResolver(updateEmailSchema),
    values: {
      email: userData?.email || '',
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const disabled = !isDirty || isSubmitting;

  const handleSubmit = form.handleSubmit(async (formData) => {
    await updateEmailMutation.mutateAsync(formData);

    form.reset({
      email: formData.email,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5 w-96">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={disabled} width="full" type="submit">
          Change email
        </Button>
      </form>
    </Form>
  );
};

export default UpdateEmailForm;
