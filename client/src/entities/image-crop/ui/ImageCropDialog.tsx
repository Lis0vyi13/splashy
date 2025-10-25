'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/ui';

import ImageCrop from './ImageCrop';

interface ImageCropDialogProps {
  imageSrc: string | null;
  onSave: (blob: Blob) => void;
  onCancel: () => void;
  setImageSrc: (src: string | null) => void;
}

const ImageCropDialog = ({
  imageSrc,
  onSave,
  onCancel,
  setImageSrc,
}: ImageCropDialogProps) => {
  if (!imageSrc) return null;

  return (
    <Dialog
      open={!!imageSrc}
      onOpenChange={(open) => !open && setImageSrc(null)}
    >
      <DialogContent className="max-w-md">
        <DialogTitle>Crop Your Image</DialogTitle>
        <DialogDescription>
          Adjust and crop the image before saving.
        </DialogDescription>
        <ImageCrop src={imageSrc} onSave={onSave} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
