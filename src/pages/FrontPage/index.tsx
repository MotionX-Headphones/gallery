import { useEffect, useRef, useState } from 'react';
// import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { GalleryPage } from '@/pages/GalleryPage/index';

import { PixelEditorPage } from '@/pages/PixelEditorPage/index';
import './index.css';
import {
  MenuDock,
  type MenuDockItem,
} from '@/components/ui/shadcn-io/menu-dock';
import { Home, Palette } from 'lucide-react';
import { KeepAlive } from 'react-activation';

export const FrontPage = () => {
  const [value, setValue] = useState('gallery');

  // const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  // Ref to the scrollable container div
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Ref map to store scrollTop per tab without causing re-renders
  const scrollPositionsRef = useRef<Record<string, number>>({});

  // Save current tab scroll position on scroll
  const handleScroll = () => {
    const div = scrollContainerRef.current;
    if (div) {
      scrollPositionsRef.current[value] = div.scrollTop;
    }
  };

  // Switch tabs while preserving and restoring scroll position
  const switchTab = (newValue: string) => {
    const div = scrollContainerRef.current;
    if (div) {
      scrollPositionsRef.current[value] = div.scrollTop;
    }
    setValue(newValue);
  };

  // Restore scroll position after tab value changes
  useEffect(() => {
    const div = scrollContainerRef.current;
    if (div) {
      const savedTop = scrollPositionsRef.current[value] ?? 0;
      div.scrollTo({ top: savedTop, behavior: 'auto' });
    }
  }, [value]);

  const handleHomeFeed = () => {
    switchTab('gallery');
  };

  const handlePixelEditor = () => {
    switchTab('pixelEditor');
  };

  const items: MenuDockItem[] = [
    { label: 'Home Feed', icon: Home, onClick: handleHomeFeed },
    // { label: 'User', icon: User },
    {
      label: 'Pixel Editor',
      icon: Palette,
      onClick: handlePixelEditor,
    },
  ];

  return (
    <>
      <KeepAlive cacheKey='frontPage'>
        <div
          id='scrollableDiv'
          className='scrollableDiv'
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div className={value === 'gallery' ? 'block' : 'hidden'}>
            <GalleryPage />
          </div>
          <div className={value === 'pixelEditor' ? 'block' : 'hidden'}>
            <PixelEditorPage />
          </div>
        </div>
        <div className='fixed bottom-0 left-0 w-screen flex items-center justify-center h-[60px] p-4'>
          <MenuDock
            className='w-full flex items-center justify-center gap-15'
            items={items}
            variant='compact'
            animated={false}
            orientation='horizontal'
          />
        </div>
      </KeepAlive>
    </>
  );
};
