import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

/**F
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
    const encodedImageUrl = encodeURIComponent(imageUrl);
    const url = `/artwork-detail?imageUrl=${encodedImageUrl}&title=${title}&author=${author}`;
    navigate(url);
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
    // return <Card className='flex-1 h-[260px]' />;
    return <div className='flex-1 h-[260px] max-w-[200px]' />;
  }

  // Render card with artwork data
  return (
    <Card
      onClick={handleClick}
      className='flex-1 h-[260px] max-w-[200px] flex flex-col pb-0 pt-0 pl-0 pr-0 gap-4'
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
      <CardContent className='relative'>
        {imageLoaded ? (
          <>
            <CardTitle className='absolute top-0 left-2'>{title}</CardTitle>
            <CardDescription className='absolute top-5 left-2'>
              {author}
            </CardDescription>
            <div className='absolute top-3 right-2 font-bold text-sm flex items-center'>
              <Star className='w-3 h-3' color='#ffc400' />
              <span
                style={{
                  backgroundImage: 'linear-gradient(90deg, #ffc400, #ff8f00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                100
              </span>
            </div>
          </>
        ) : (
          <div className='space-y-2'>
            <Skeleton className='absolute top-0 left-2 h-4 w-2/3' />
            <Skeleton className='absolute top-5 left-2 h-3 w-1/2' />
            <Skeleton className='absolute top-2 right-2 h-4 w-8' />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
