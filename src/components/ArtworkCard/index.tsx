import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ArtworkCard({ imageUrl, title, author }: { imageUrl: string, title: string, author: string }) {
    return (
      <Card sx={{ maxWidth: 250, width: '100%'}}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl || 'https://via.placeholder.com/250x180'}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {author}
          </Typography>
        </CardContent>
      </Card>
    );
}