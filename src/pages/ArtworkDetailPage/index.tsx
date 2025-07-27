import type { FC } from 'react';
import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';
import { HeadphonesPreview } from '@/components/HeadphonesPreview';

import './ArtworkDetailPage.css';
import { useSearchParams } from 'react-router-dom';
import AboutArtwork from './components/AboutArtwork';

const [, e] = bem('artwork-detail-page');

/**
 * TabPanel component for rendering tab content
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const ArtworkDetailPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(0);

  const imageUrl = searchParams.get('imageUrl') || '';
  const title = searchParams.get('title') || '';
  const author = searchParams.get('author') || 'Unknown';
  const token = searchParams.get('token') || '';

  /**
   * Handles tab change event
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  /**
   * Handles swipe gestures to change tabs
   */
  const handleSwipeLeft = () => {
    if (tabValue < 1) {
      setTabValue(tabValue + 1);
    }
  };

  /**
   * Handles swipe gestures to change tabs
   */
  const handleSwipeRight = () => {
    if (tabValue > 0) {
      setTabValue(tabValue - 1);
    }
  };

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
            value={tabValue}
            onChange={handleTabChange}
            aria-label='artwork detail tabs'
            centered
          >
            <Tab label='Image' />
            <Tab label='Headphones Preview' />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <div style={{ height: '300px' }}>
            <img
              className={e('image')}
              width='100%'
              height='auto'
              src={`${imageUrl}&token=${token}`}
              alt={title}
            />
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <div style={{ height: '300px' }}>
            <HeadphonesPreview overlayImageUrl={`${imageUrl}&token=${token}`} />
          </div>
        </TabPanel>

        <AboutArtwork title={title} author={author} />
      </div>
    </Page>
  );
};
