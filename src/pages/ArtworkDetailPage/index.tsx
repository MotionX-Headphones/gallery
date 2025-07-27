import type { FC } from 'react';
import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

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

  return (
    <Page>
      <div className={e('container')}>
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
          <img
            className={e('image')}
            width='100%'
            height='auto'
            src={`${imageUrl}&token=${token}`}
            alt={title}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <HeadphonesPreview overlayImageUrl={`${imageUrl}&token=${token}`} />
        </TabPanel>

        <AboutArtwork title={title} author={author} />
      </div>
    </Page>
  );
};
