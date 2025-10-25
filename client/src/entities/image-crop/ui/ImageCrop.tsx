'use client';

import { useRef, useState } from 'react';
import type { Crop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@/shared/ui';

import './ImageCrop.css';

/* eslint-disable @next/next/no-img-element */

interface ImageCropProps {
  src: string;
  onSave: (blob: Blob) => void;
  onCancel: () => void;
}

const ImageCrop = ({ src, onSave, onCancel }: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const getCroppedBlob = async (): Promise<Blob | null> => {
    if (!imgRef.current || !completedCrop) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleSave = async () => {
    const blob = await getCroppedBlob();
    if (blob) onSave(blob);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-[300px] h-[300px] bg-gray-200 relative">
        <ReactCrop
          circularCrop
          crop={crop}
          onChange={setCrop}
          aspect={1}
          onComplete={setCompletedCrop}
          keepSelection
        >
          <img
            ref={imgRef}
            src={src}
            alt="Image crop"
            className="w-[300px] h-[300px] object-cover"
          />
        </ReactCrop>
      </div>
      <div className="flex gap-2">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default ImageCrop;
