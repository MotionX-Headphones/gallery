import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, ZoomIn, Crop } from 'lucide-react';
import { HeadphonesPreview } from '../HeadphonesPreview';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CroppedAreaPixels extends CroppedArea {}

interface ImageCropperProps {
  onCropComplete?: (croppedImageUrl: string) => void;
  maxFileSize?: number; // in MB
}

/**
 * ImageCropper component with rotation and zoom controls
 * Uses react-easy-crop for cropping functionality with fixed 1:1 aspect ratio
 */
export const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  maxFileSize = 5,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles file selection from device
   */
  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxFileSize}MB`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        // Reset states when new image is selected
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setCroppedImageUrl(null);
      };
      reader.readAsDataURL(file);
    },
    [maxFileSize]
  );

  /**
   * Handles crop area change - called when user stops moving/zooming
   */
  const onCropCompleteHandler = useCallback(
    (_croppedArea: CroppedArea, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  /**
   * Creates cropped image from canvas
   */
  const createCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';

    return new Promise<string>((resolve) => {
      image.onload = () => {
        const { width, height } = croppedAreaPixels;

        // Set canvas size to square (1:1 aspect ratio)
        canvas.width = width;
        canvas.height = height;

        // Apply rotation if needed
        if (rotation !== 0) {
          ctx.translate(width / 2, height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-width / 2, -height / 2);
        }

        // Draw the cropped portion
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          width,
          height
        );

        // Convert canvas to base64 data URL
        const base64String = canvas.toDataURL('image/jpeg', 0.9);
        resolve(base64String);
      };
      image.src = imageSrc;
    });
  }, [imageSrc, croppedAreaPixels, rotation]);

  /**
   * Handles the crop action and shows result in dialog
   */
  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels) return;

    const croppedUrl = await createCroppedImage();
    if (croppedUrl) {
      setCroppedImageUrl(croppedUrl);
      setIsDialogOpen(true);
      onCropComplete?.(croppedUrl);
    }
  }, [croppedAreaPixels, createCroppedImage, onCropComplete]);

  /**
   * Resets the cropper to initial state
   */
  const handleReset = useCallback(() => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setCroppedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className='w-full max-w-4xl mx-auto p-4'>
      {/* File Input */}
      <div className='mb-6'>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={onFileChange}
          className='hidden'
          id='image-upload'
        />
        <label htmlFor='image-upload'>
          <Button asChild className='cursor-pointer'>
            <span>
              <Upload className='w-4 h-4 mr-2' />
              Select Image
            </span>
          </Button>
        </label>
      </div>

      {/* Cropper Area */}
      {imageSrc && (
        <div className='space-y-6'>
          {/* Cropper Container */}
          <div
            className='relative w-full bg-gray-100 rounded-lg overflow-hidden'
            style={{ height: '400px' }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1} // Fixed 1:1 aspect ratio
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropCompleteHandler}
              cropShape='rect'
              showGrid={true}
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f3f4f6',
                },
              }}
            />
          </div>

          {/* Controls */}
          <div className='space-y-4'>
            {/* Zoom Control */}
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <ZoomIn className='w-4 h-4' />
                <span className='text-sm font-medium'>
                  Zoom: {zoom.toFixed(1)}x
                </span>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                className='w-full'
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-3'>
            <Button onClick={handleCrop} disabled={!croppedAreaPixels}>
              <Crop className='w-4 h-4 mr-2' />
              Check it out!
            </Button>
            <Button variant='outline' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* Result Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Result</DialogTitle>
          </DialogHeader>
          {croppedImageUrl && (
            <div className='space-y-4'>
              <div className='w-full flex items-center justify-center rounded-lg'>
                <HeadphonesPreview overlayImageUrl={croppedImageUrl} />
              </div>
              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  onClick={() => setIsDialogOpen(false)}
                  className='flex-1'
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
