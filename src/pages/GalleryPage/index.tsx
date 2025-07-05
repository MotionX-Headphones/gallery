import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtworkCard from '../../components/ArtworkCard';
import Skeleton from '@mui/material/Skeleton';

export const GalleryPage = () => {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        if (items.length >= 500) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            const newItems = Array.from({ length: 10 }).map((_, i) => {
                const index = items.length + i;
                return {
                    artId: `art-${index}`,
                    imageUrl: `https://picsum.photos/seed/${index}/200/200`,
                    title: `Artwork ${index}`,
                    author: `Author ${index % 10}`
                };
            });
            setItems(items.concat(newItems));
        }, 1000);
    }

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
            loader={
                <>
                    {Array.from({ length: 4 }).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px', padding: '0 4px' }}
                        >
                            {Array.from({ length: 2 }).map((_, colIndex) => (
                                <Skeleton
                                    key={colIndex}
                                    variant="rectangular"
                                    width={250}
                                    height={250}
                                    sx={{ borderRadius: 3, flex: 1 }}
                                    style={{ maxWidth: 250, margin: '0 2px' }}
                                />
                            ))}
                        </div>
                    ))}
                </>
            }
            scrollThreshold={'800px'}
            scrollableTarget="scrollableDiv"
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {Array.from({ length: Math.ceil(items.length / 2) }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px', padding: '0 4px' }}
                >
                    {items[rowIndex * 2] && (
                        <ArtworkCard {...items[rowIndex * 2]} />
                    )}
                    {items[rowIndex * 2 + 1] && (
                        <ArtworkCard {...items[rowIndex * 2 + 1]} />
                    )}
                </div>
            ))}
        </InfiniteScroll>
        </>
    )
}