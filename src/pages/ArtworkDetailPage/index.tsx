import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';
import { HeadphonesPreview } from '@/components/HeadphonesPreview';

import './ArtworkDetailPage.css';
import { useSearchParams } from 'react-router-dom';
import AboutArtwork from './components/AboutArtwork';

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
   * Handles tab change event
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentIndex(newValue);
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={currentIndex}
            onChange={handleTabChange}
            aria-label='artwork detail tabs'
            centered
          >
            <Tab label='Image' />
            <Tab label='Headphones Preview' />
          </Tabs>
        </Box>

        {/* Swipeable container with overflow hidden */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
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
            <div style={{ width: '50%', flexShrink: 0 }}>
              <div style={{ height: '380px' }}>
                <img
                  className={e('image')}
                  width='100%'
                  height='auto'
                  src={`${imageUrl}&token=${token}`}
                  alt={title}
                />
              </div>
            </div>

            {/* Headphones preview view */}
            <div style={{ width: '50%', flexShrink: 0 }}>
              <div style={{ height: '380px' }}>
                <HeadphonesPreview
                  overlayImageUrl={`${imageUrl}&token=${token}`}
                />
              </div>
            </div>
          </div>
        </div>

        <AboutArtwork title={title} author={author} />
      </div>
    </Page>
  );
};
