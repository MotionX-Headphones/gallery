import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ArtworkCard({
  imageUrl,
  title,
  author,
  isLiked,
}: {
  imageUrl: string;
  title: string;
  author: string;
  isLiked?: boolean;
}) {
  const [liked, setLiked] = useState(isLiked || false);
  const navigate = useNavigate();
  function handleClick() {
    const encodedImageUrl = encodeURIComponent(imageUrl);
    navigate(
      `/artwork-detail?imageUrl=${encodedImageUrl}&title=${title}&author=${author}`
    );
  }
  useEffect(() => {
    setLiked(isLiked || false);
  }, []);
  const handleLike = () => {
    setLiked(!liked);
  };
  const isEmpty = !imageUrl || !title || !author;
  if (isEmpty) {
    return (
      <Card
        sx={{
          maxWidth: 250,
          width: '100%',
          borderRadius: 0,
          boxShadow: 0,
          position: 'relative',
          background: 'var(--tg-theme-secondary-bg-color)',
          color: 'var(--tg-theme-text-color, #222)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 220,
        }}
      ></Card>
    );
  }
  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 250,
        width: '100%',
        borderRadius: 0,
        boxShadow: 0,
        position: 'relative',
        background: 'var(--tg-theme-bg-color, #fff)',
        color: 'var(--tg-theme-text-color, #222)',
      }}
    >
      <CardMedia
        component='img'
        height='250'
        width='250'
        image={imageUrl || 'https://via.placeholder.com/250x180'}
        alt={title}
        sx={{ objectFit: 'fill' }}
      />
      <CardContent
        sx={{
          pb: '4px',
          pt: 1,
          pl: 1,
          pr: 1,
          borderRadius: 0,
          background: 'var(--tg-theme-secondary-bg-color, #f5f5f5)',
          color: 'var(--tg-theme-text-color, #222)',
        }}
      >
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          noWrap
          sx={{ color: 'var(--tg-theme-text-color, #222)' }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          noWrap
          sx={{ color: 'var(--tg-theme-subtitle-text-color, #888)' }}
        >
          {author}
        </Typography>
      </CardContent>
      <IconButton
        aria-label='like'
        sx={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
        }}
        onClick={handleLike}
      >
        {liked ? (
          <FavoriteIcon color='error' />
        ) : (
          <FavoriteIcon color='disabled' />
        )}
      </IconButton>
    </Card>
  );
}
