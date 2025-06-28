import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const GalleryPage = () => {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        if (items.length >= 500) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(items.concat(Array.from({ length: 10 })));
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
            <p>hasMore: {hasMore.toString()}</p>
            {items.map((_, index) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }} key={index}>
                    div - #{index}
                </div>
            ))}
        </InfiniteScroll>
    )
}