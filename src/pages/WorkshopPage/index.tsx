import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSwipeable } from 'react-swipeable';

import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';
import { PixelEditorPage } from '@/pages/PixelEditorPage';

const [, e] = bem('workshop-page');

export const WorkshopPage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Handles tab value change from shadcn tabs
   */
  const handleTabValueChange = (newValue: string) => {
    setCurrentIndex(newValue === 'pixel-editor' ? 0 : 1);
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
      <div className={e('container') + ' flex flex-col'} {...swipeHandlers}>
        <div className='w-full flex mt-8'>
          <Tabs
            value={currentIndex === 0 ? 'pixel-editor' : 'placeholder'}
            onValueChange={handleTabValueChange}
            aria-label='workshop tabs'
            className='mt-6 mb-3 ml-3 flex'
          >
            <TabsList>
              <TabsTrigger value='pixel-editor'>Pixel Editor</TabsTrigger>
              <TabsTrigger value='placeholder'>Coming Soon</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* Swipeable container with overflow hidden */}
        <div className='w-full flex h-[calc(100vh-173px)]'>
          <div className='w-full overflow-y-scroll overflow-x-hidden h-full'>
            <div
              ref={containerRef}
              style={{
                display: 'flex',
                width: '200%',
                transition: 'transform 0.3s ease-in-out',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {/* Pixel Editor view */}
              <div className='w-1/2 shrink-0'>
                <div className='h-full flex flex-col items-center justify-start w-full'>
                  <PixelEditorPage />
                </div>
              </div>

              {/* Placeholder view */}
              <div className='w-1/2 shrink-0'>
                <div className='h-full flex items-center justify-center w-full'>
                  <div className='text-center text-gray-500'>
                    <h3 className='text-lg font-medium mb-2'>Coming Soon</h3>
                    <p className='text-sm'>
                      This tab is reserved for future features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
