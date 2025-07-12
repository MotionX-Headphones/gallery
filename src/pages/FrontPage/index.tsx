import { useState } from 'react';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { GalleryPage } from '@/pages/GalleryPage/index';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
export const FrontPage = () => {
  const [value, setValue] = useState('gallery');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Function to scroll to top of #scrollableDiv
  const scrollToTop = () => {
    const div = document.getElementById('scrollableDiv');
    if (div) {
      div.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        id='scrollableDiv'
        style={{
          height: `calc(100vh - 56px)`,
          overflow: 'scroll',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // Internet Explorer 10+
          '&::-webkit-scrollbar': {
            display: 'none', // WebKit
          },
        }}
      >
        {value === 'home' && <IndexPage />}
        {value === 'gallery' && <GalleryPage />}
      </div>
      <BottomNavigation
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          background: 'var(--tg-theme-bottom-bar-bg-color)',
          color: 'var(--tg-theme-text-color)',
          '& .MuiBottomNavigationAction-root': {
            color: 'var(--tg-theme-text-color)',
          },
          '& .Mui-selected, & .Mui-selected svg': {
            color: 'var(--tg-theme-accent-color)',
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label='Gallery'
          value='gallery'
          icon={<ExploreOutlinedIcon />}
          sx={{ color: 'var(--tg-theme-text-color)' }}
          onClick={() => {
            if (value === 'gallery') {
              scrollToTop();
            }
          }}
        />
        {false && (
          <BottomNavigationAction
            label='Home'
            value='home'
            icon={<RestoreIcon />}
            sx={{ color: 'var(--tg-theme-text-color)' }}
          />
        )}
        {false && (
          <BottomNavigationAction
            label='Settings'
            value='settings'
            icon={<FavoriteIcon />}
            sx={{ color: 'var(--tg-theme-text-color)' }}
          />
        )}
      </BottomNavigation>
    </>
  );
};
