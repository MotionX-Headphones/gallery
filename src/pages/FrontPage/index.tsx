import { useState } from 'react';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { GalleryPage } from '@/pages/GalleryPage/index';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export const FrontPage = () => {
    const [value, setValue] = useState('home');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <>
            <div id="scrollableDiv" style={{ height: `calc(100vh - 56px)`, overflow: 'scroll' }}>
                {value === 'home' && <IndexPage />}
                {value === 'gallery' && <GalleryPage />}
            </div>

            {/* <Tabbar>
                {tabs.map(({
                    id,
                    text,
                    Icon
                }) => <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
                        <Icon />
                    </Tabbar.Item>)}
            </Tabbar> */}
            <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0 }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    label="Settings"
                    value="settings"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="Gallery"
                    value="gallery"
                    icon={<LocationOnIcon />}
                />
            </BottomNavigation>
        </>
    )
}