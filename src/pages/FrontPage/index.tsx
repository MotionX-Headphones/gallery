import { useState } from 'react';
// import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { GalleryPage } from '@/pages/GalleryPage/index';

import { PixelEditorPage } from '@/pages/PixelEditorPage/index';
import './index.css';
import {
  MenuDock,
  type MenuDockItem,
} from '@/components/ui/shadcn-io/menu-dock';
import { Home, Palette } from 'lucide-react';

export const FrontPage = () => {
  const [value, setValue] = useState('gallery');

  // const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  // Function to scroll to top of #scrollableDiv
  const scrollToTop = () => {
    const div = document.getElementById('scrollableDiv');
    if (div) {
      div.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHomeFeed = () => {
    setValue('gallery');
    scrollToTop();
  };

  const handlePixelEditor = () => {
    setValue('pixelEditor');
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
      <div id='scrollableDiv' className='scrollableDiv'>
        {/* {value === 'home' && <IndexPage />} */}
        {value === 'gallery' && <GalleryPage />}
        {value === 'pixelEditor' && <PixelEditorPage />}
      </div>
      <div className='fixed bottom-0 left-0 w-screen flex items-center justify-center h-[60px] p-4'>
        <MenuDock
          className='lg:hidden w-full flex items-center justify-center gap-15'
          items={items}
          variant='compact'
          animated={false}
          orientation='horizontal'
        />
      </div>
    </>
  );
};
