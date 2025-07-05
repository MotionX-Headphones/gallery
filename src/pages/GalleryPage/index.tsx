import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtworkCard from '../../components/ArtworkCard';

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
        <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
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
                    style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '16px', padding: '0 5px' }}
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
    )
}