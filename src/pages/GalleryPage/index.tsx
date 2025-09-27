import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ArtworkCard from '../../components/ArtworkCard';
import ShadArtworkCard from '@/components/ShadArtworkCard';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import { getArtWorks } from '@/utils/request/gallery';
import { Typography } from '@mui/material';

const skeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '8px',
            padding: '0 4px',
          }}
        >
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant='rectangular'
              width={250}
              height={250}
              sx={{ borderRadius: 0, flex: 1 }}
              style={{ maxWidth: 250, margin: '0 2px' }}
            />
          ))}
        </div>
      ))}
    </>
  );
};
export const GalleryPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [_refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (items.length >= 13) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      getArtWorks().then((res) => {
        const newItems = res.map((item) => ({
          ...item,
          price: 8.99,
        }));
        setItems(items.concat(newItems));
      });
    }, 2000);
  };

  const refresh = async () => {
    setRefreshing(true);
    setItems([]);
    setHasMore(true);
    try {
      const res = new Promise<any[]>((resolve) => {
        setTimeout(() => {
          resolve(getArtWorks());
        }, 0);
      });
      const newItems = (await res).map((item: any) => ({
        ...item,
        price: 8.99,
      }));
      setItems(newItems);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: '8px' }} />
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={skeleton()}
        scrollThreshold={'800px'}
        scrollableTarget='scrollableDiv'
        endMessage={
          <Typography
            sx={{ textAlign: 'center', color: 'var(--tg-theme-text-color)' }}
          >
            Yay! You have seen it all 1
          </Typography>
        }
        // Add pull down to refresh props
        pullDownToRefresh
        refreshFunction={refresh}
        pullDownToRefreshThreshold={50}
      >
        {Array.from({ length: Math.ceil(items.length / 2) }).map(
          (_, rowIndex) => {
            const isLastRow = rowIndex === Math.ceil(items.length / 2) - 1;
            const isOdd = items.length % 2 !== 0;
            const firstItem = items[rowIndex * 2];
            const secondItem = items[rowIndex * 2 + 1];
            return (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '4px',
                  marginBottom: '8px',
                  padding: '0 4px',
                }}
              >
                {firstItem && <ShadArtworkCard {...firstItem} />}
                {secondItem ? (
                  <ShadArtworkCard {...secondItem} />
                ) : (
                  isLastRow &&
                  isOdd && (
                    <ShadArtworkCard
                      imageUrl={''}
                      title={''}
                      author={''}
                      isLiked={false}
                    />
                  )
                )}
              </div>
            );
          }
        )}
      </InfiniteScroll>
    </>
  );
};
