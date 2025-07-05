import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ArtworkCard({ imageUrl, title, author }: { imageUrl: string, title: string, author: string }) {
    return (
      <Card sx={{ maxWidth: 250, width: '100%', borderRadius: 3, boxShadow: 3, position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl || 'https://via.placeholder.com/250x180'}
          alt={title}
        />
        <CardContent sx={{ pb: 2, pt: 1, pl: 1, pr: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {author}
          </Typography>
        </CardContent>
        <IconButton
          aria-label="like"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: 'rgba(255,255,255,0.85)',
            '&:hover': { background: 'rgba(255,255,255,1)' }
          }}
        >
          <FavoriteIcon color="error" />
        </IconButton>
      </Card>
    );
}