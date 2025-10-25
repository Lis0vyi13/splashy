'use client';

import { Upload } from 'lucide-react';

import { useAvatarUploader } from '@/features/settings';

import { ImageCropDialog } from '@/entities/image-crop';
import { UserAvatar } from '@/entities/user';

import { Button, Input, Label, Typography } from '@/shared/ui';

const AvatarUploader = () => {
  const {
    inputRef,
    imageSrc,
    uploadAvatarMutation,
    handleButtonClick,
    handleFileChange,
    handleCropSave,
    setImageSrc,
  } = useAvatarUploader();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative group rounded-full">
        <UserAvatar variant="large" />

        <Label
          className="opacity-0 bg-black/40 rounded-full flex justify-center items-center absolute inset-0 group-hover:opacity-100 transition cursor-pointer"
          htmlFor="avatar"
        >
          <Upload className="text-white w-6 h-6" />
        </Label>
      </div>

      <Input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button onClick={handleButtonClick} size="sm">
        <Typography variant="p" affects="small">
          Upload avatar (max. 2MB)
        </Typography>
      </Button>

      {uploadAvatarMutation.isPending && <p>Loading...</p>}
      {uploadAvatarMutation.isError && (
        <Typography className="text-red-500">
          {uploadAvatarMutation.error?.message || 'Loading error'}
        </Typography>
      )}

      {imageSrc && (
        <ImageCropDialog
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          onSave={handleCropSave}
          onCancel={() => setImageSrc(null)}
        />
      )}
    </div>
  );
};

export default AvatarUploader;
