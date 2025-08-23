import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSwipeable } from 'react-swipeable';

import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';
import { HeadphonesPreview } from '@/components/HeadphonesPreview';

import './ArtworkDetailPage.css';
import { useSearchParams } from 'react-router-dom';
import AboutArtwork from './components/AboutArtwork';
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom';

const [, e] = bem('artwork-detail-page');

export const ArtworkDetailPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const imageUrl = searchParams.get('imageUrl') || '';
  const title = searchParams.get('title') || '';
  const author = searchParams.get('author') || 'Unknown';
  const token = searchParams.get('token') || '';

  /**
   * Handles tab value change from shadcn tabs
   */
  const handleTabValueChange = (newValue: string) => {
    setCurrentIndex(newValue === 'image' ? 0 : 1);
  };

  /**
   * Handles swipe gestures to change views
   */
  const handleSwipeLeft = () => {
    if (currentIndex < 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  /**
   * Handles swipe gestures to change views
   */
  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   * Updates container transform based on current index
   */
  useEffect(() => {
    if (containerRef.current) {
      const translateX = -currentIndex * 50;
      containerRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Page>
      <div className={e('container')} {...swipeHandlers}>
        <Tabs
          value={currentIndex === 0 ? 'image' : 'preview'}
          onValueChange={handleTabValueChange}
          aria-label='artwork detail tabs'
          className='mt-10 mb-3'
        >
          <TabsList>
            <TabsTrigger value='image'>Image</TabsTrigger>
            <TabsTrigger value='preview'>Headphones Preview</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Swipeable container with overflow hidden */}
        <div className='w-full'>
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              width: '200%',
              transition: 'transform 0.3s ease-in-out',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {/* Image view */}
            <div className='w-1/2 shrink-0'>
              <div className='min-h-[380px] flex items-center justify-center w-full'>
                <ImageZoom>
                  <img
                    className={`${e('image')} max-w-full h-auto object-contain`}
                    src={`${imageUrl}&token=${token}`}
                    alt={title}
                    loading='lazy'
                  />
                </ImageZoom>
              </div>
            </div>

            {/* Headphones preview view */}
            <div className='w-1/2 shrink-0'>
              <div className='min-h-[380px]'>
                <HeadphonesPreview
                  overlayImageUrl={`${imageUrl}&token=${token}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4'>
        <AboutArtwork title={title} author={author} />
      </div>
    </Page>
  );
};
