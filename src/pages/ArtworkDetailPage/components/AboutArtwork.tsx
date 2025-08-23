import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface AboutArtworkProps {
  title: string;
  description?: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
}

/**
 * AboutArtwork displays artwork info using shadcn Card components.
 */
const AboutArtwork: React.FC<AboutArtworkProps> = ({
  title,
  description,
  author,
  authorBio,
  authorAvatar,
}) => {
  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        {description && (
          <CardDescription className='leading-relaxed'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className='flex items-start gap-3'>
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={author}
              className='h-14 w-14 rounded-full object-cover'
            />
          ) : (
            <div className='h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold'>
              {author?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className='flex-1'>
            <div className='font-medium mb-1'>{author}</div>
            <div className='text-sm text-muted-foreground'>
              {authorBio || 'No bio available for this artist.'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutArtwork;
