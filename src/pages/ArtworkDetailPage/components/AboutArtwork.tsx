import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

interface AboutArtworkProps {
  title: string;
  description?: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
}

/**
 * AboutArtwork component displays artwork information including title, description, and author details
 */
const AboutArtwork: React.FC<AboutArtworkProps> = ({
  title,
  description,
  author,
  authorBio,
  authorAvatar,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: 'var(--tg-theme-secondary-bg-color, #f5f5f5)',
        color: 'var(--tg-theme-text-color, #222)',
        borderRadius: 2,
        mb: 2,
      }}
    >
      {/* Artwork Title */}
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'var(--tg-theme-text-color, #222)',
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Artwork Description */}
      {description && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.6,
              color: 'var(--tg-theme-text-color, #222)',
            }}
          >
            {description}
          </Typography>
        </Box>
      )}

      {/* Author Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar
          src={authorAvatar}
          alt={author}
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'var(--tg-theme-button-color, #0088cc)',
          }}
        >
          {author.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant='h6'
            component='h3'
            gutterBottom
            sx={{
              fontWeight: 500,
              color: 'var(--tg-theme-text-color, #222)',
              mb: 1,
            }}
          >
            {author}
          </Typography>

          {authorBio ? (
            <Typography
              variant='body2'
              sx={{
                lineHeight: 1.5,
                color: 'var(--tg-theme-subtitle-text-color, #888)',
              }}
            >
              {authorBio}
            </Typography>
          ) : (
            <Typography
              variant='body2'
              sx={{
                fontStyle: 'italic',
                color: 'var(--tg-theme-subtitle-text-color, #888)',
              }}
            >
              No bio available for this artist.
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default AboutArtwork;
