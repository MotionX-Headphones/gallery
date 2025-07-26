import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';

import './ArtworkDetailPage.css';
import { useSearchParams } from 'react-router-dom';
import AboutArtwork from './components/AboutArtwork';
const [, e] = bem('artwork-detail-page');

export const ArtworkDetailPage: FC = () => {
  const [searchParams] = useSearchParams();
  const imageUrl = searchParams.get('imageUrl') || '';
  const title = searchParams.get('title') || '';
  const author = searchParams.get('author') || 'Unknown';
  const token = searchParams.get('token') || '';
  return (
    <Page>
      <div className={e('container')}>
        <img
          className={e('image')}
          width='100%'
          height='auto'
          src={`${imageUrl}&token=${token}`}
          alt={title}
        />
        <AboutArtwork
          title={'Lorem ipsum dolor sit amet'}
          author={author}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        />
      </div>
    </Page>
  );
};
