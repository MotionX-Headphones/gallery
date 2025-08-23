import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { popup } from '@telegram-apps/sdk-react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Props interface for ShadArtworkCard component
 */
interface ShadArtworkCardProps {
  imageUrl: string;
  title: string;
  author: string;
  isLiked?: boolean;
}

/**
 * ShadArtworkCard component - A replica of ArtworkCard using shadcn/ui components
 * Displays artwork information with image, title, and author
 * Supports click navigation to artwork details
 */
export default function ShadArtworkCard({
  imageUrl,
  title,
  author,
  isLiked,
}: ShadArtworkCardProps) {
  const [, setLiked] = useState(isLiked || false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles card click to show artwork details in a popup overlay
   */
  function handleClick() {
    // Check if popup is available and supported
    if (popup.isSupported() && false) {
      console.log('popup is supported');
      // Show artwork details in a popup overlay
      popup
        .show({
          title: title,
          message: `Artist: ${author}\n\nClick "View Details" to see the full artwork.`,
          buttons: [
            {
              id: 'view-details',
              type: 'default',
              text: 'View Details',
            },
            {
              id: 'close',
              type: 'close',
            },
          ],
        })
        .then((buttonId) => {
          // Handle button clicks
          console.log('buttonId', buttonId);
          if (buttonId === 'view-details') {
            // Navigate to detail page when user wants to see full details
            const encodedImageUrl = encodeURIComponent(imageUrl);
            navigate(
              `/artwork-detail?imageUrl=${encodedImageUrl}&title=${title}&author=${author}`
            );
          }
        });
    } else {
      // Fallback to direct navigation if popup is not supported
      console.log('popup is not supported');
      const encodedImageUrl = encodeURIComponent(imageUrl);
      navigate(
        `/artwork-detail?imageUrl=${encodedImageUrl}&title=${title}&author=${author}`
      );
    }
  }

  /**
   * Initialize liked state on component mount
   */
  useEffect(() => {
    setLiked(isLiked || false);
  }, [isLiked]);

  /**
   * Reset image loaded state when imageUrl changes
   */
  useEffect(() => {
    setImageLoaded(false);
  }, [imageUrl]);

  // Check if required props are provided
  const isEmpty = !imageUrl || !title || !author;

  // Render empty card if data is missing
  if (isEmpty) {
    return <Card className='flex-1 h-[260px]' />;
  }

  // Render card with artwork data
  return (
    <Card
      onClick={handleClick}
      className='flex-1 h-[260px] flex flex-col pb-0 pt-0 pl-0 pr-0 gap-4'
    >
      {/* Artwork Image */}
      <div className='relative h-[195px] overflow-hidden rounded-t-lg'>
        <img
          src={imageUrl || 'https://via.placeholder.com/250x180'}
          alt={title}
          width={250}
          height={195}
          className={`w-full h-full transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit: 'cover' }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {!imageLoaded && <Skeleton className='absolute inset-0 rounded-t-lg' />}
      </div>

      {/* Card Content */}
      <CardContent className='pl-1 pb-0'>
        {imageLoaded ? (
          <>
            <CardTitle className='truncate'>{title}</CardTitle>
            <CardDescription className='truncate'>{author}</CardDescription>
          </>
        ) : (
          <div className='space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
