import React from 'react';
import { ImageCropper } from '@/components/ImageCropper';
import { toast } from 'sonner';

/**
 * CustomPreviewPage component featuring image cropping functionality
 * Allows users to upload, crop, rotate, and zoom images with 1:1 aspect ratio
 */
const CustomPreviewPage: React.FC = () => {
  /**
   * Handles successful crop completion
   */
  const handleCropComplete = (_croppedImageUrl: string) => {
    toast.success('Result is ready!');
  };

  return (
    <div className='p-6 w-full max-w-6xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold mb-4'>Use your own image</h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Upload an image from your device and see how it would look on the
          MotionX headphones.
        </p>
      </div>

      {/* Image Cropper Component */}
      <ImageCropper
        onCropComplete={handleCropComplete}
        maxFileSize={10} // 10MB limit
      />
    </div>
  );
};

export { CustomPreviewPage };
