'use client';

import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/ui';

import { useUpdateProfileForm } from '../model';

const UpdateProfileForm = () => {
  const { form, handleSubmit, disabled } = useUpdateProfileForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5 w-96">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>@Username</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => {
            const length = field.value?.length || 0;
            const max = 160;

            return (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  <span>Biography</span>
                  <span className="text-sm text-muted-foreground">
                    {length}/{max}
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={max}
                    placeholder="Your biography..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(date) => field.onChange(date ?? null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={disabled} width="full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
