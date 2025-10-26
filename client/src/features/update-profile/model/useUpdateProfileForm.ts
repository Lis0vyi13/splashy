'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { useMeQuery } from '@/entities/user';

import { getDate } from '@/shared/lib/getDate';

import { type ProfileData, profileSchema } from './profileSchema';
import { useUpdateProfileMutation } from './useUpdateProfileMutation';

export const useUpdateProfileForm = () => {
  const { data: userData } = useMeQuery();
  const updateMeMutation = useUpdateProfileMutation();

  const initialDate = getDate(userData?.dateOfBirth);

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: userData?.name || '',
      username: userData?.username || '',
      bio: userData?.bio || '',
      dateOfBirth: initialDate,
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      if (!formData.dateOfBirth) {
        await updateMeMutation.mutateAsync(formData);
        return;
      }

      const date = new Date(formData.dateOfBirth);
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      await updateMeMutation.mutateAsync({
        ...formData,
        dateOfBirth: utcDate,
      });
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const message = error.response?.data?.message || error.message;

      if (message.toLowerCase().includes('username')) {
        form.setError('username', {
          type: 'manual',
          message: 'This username is already taken',
        });
      } else {
        console.error(message);
      }
    }
  });

  const { isDirty, isSubmitting } = form.formState;

  const disabled = !isDirty || updateMeMutation.isPending || isSubmitting;

  return {
    form,
    handleSubmit,
    disabled,
  };
};
