'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useUploadUserAvatarMutation } from './useUploadUserAvatarMutation';

export const useUserAvatarUploader = () => {
  const uploadAvatarMutation = useUploadUserAvatarMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image!');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File is too large (maximum 2MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const handleCropSave = (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'avatar.png');

    uploadAvatarMutation.mutate(formData);
    setImageSrc(null);
  };

  return {
    inputRef,
    imageSrc,
    uploadAvatarMutation,
    handleButtonClick,
    handleFileChange,
    handleCropSave,
    setImageSrc,
  };
};
