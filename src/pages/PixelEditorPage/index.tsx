import './index.css';
import React, { useState, createContext, useContext } from 'react';
import domtoimage from 'dom-to-image';
import Pixel from './Pixel';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import DialogComponent from './DialogComponent';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button as ButtonShadCn } from '@/components/ui/button';
import { toast } from 'sonner';
const ROWS = 12;
const COLS = 15;

// Context to share drawing state and mode
const DrawingContext = createContext({
  drawing: false,
  mode: 'draw',
  setDrawing: (_d: boolean) => {},
  setMode: (_m: 'draw' | 'erase') => {},
});

export const PixelEditorPage = () => {
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const [drawing, setDrawing] = useState(false);
  const [dialogChildren, setDialogChildren] = useState<React.ReactNode | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  // Handle mouseup/touchend globally to stop drawing
  React.useEffect(() => {
    const stopDrawing = () => setDrawing(false);
    window.addEventListener('mouseup', stopDrawing);
    window.addEventListener('touchend', stopDrawing);
    return () => {
      window.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  const downloadPixelArt = () => {
    const element = document.getElementById('pixel-art-node');
    if (!element) {
      console.error('Pixel art element not found');
      return;
    }
    const launchParams = retrieveLaunchParams();
    const { tgWebAppPlatform: platform } = launchParams;

    domtoimage.toPng(element).then((dataUrl) => {
      if (platform === 'ios' || platform === 'android') {
        setDialogChildren(
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant='body1' sx={{ mb: 2 }}>
                Due to Telegram limitations, you have to copy the Base64 string
                of the image and retrieve the image file via browser or other
                tools.
              </Typography>
              <Button
                variant='contained'
                onClick={async () => {
                  if (navigator.clipboard) {
                    try {
                      await navigator.clipboard.writeText(dataUrl);
                      toast.success('Copied to clipboard!');
                    } catch (err) {
                      toast.error('Failed to copy!');
                    }
                  } else {
                    toast.error('Clipboard API not supported.');
                  }
                }}
              >
                Copy Base64
              </Button>
              <Typography
                variant='body2'
                sx={{ wordBreak: 'break-all', mb: 2 }}
              >
                {dataUrl}
              </Typography>
            </CardContent>
          </Card>
        );
        setOpenDialog(true);
      } else {
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = `pixel-art-${new Date().toISOString()}.png`;
        a.click();
        a.remove();
      }
    });
  };

  function clearPreviewPixelArt() {
    localStorage.removeItem('pixel-art-preview');
    toast.success('Preview pixel art cleared!');
  }

  const setAsPreviewPixelArt = () => {
    const element = document.getElementById('pixel-art-node');
    if (!element) {
      console.error('Pixel art element not found');
      return;
    }

    domtoimage
      .toPng(element)
      .then((dataUrl) => {
        if (dataUrl) {
          localStorage.setItem('pixel-art-preview', dataUrl);
          toast.success(
            'You have set the pixel art as preview! You will see it in Artwork Detail previews.'
          );
          setTimeout(() => {
            setOpenDialog(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.error('Failed to set pixel art as preview', err);
        clearPreviewPixelArt();
      });
  };

  return (
    <DrawingContext.Provider value={{ drawing, mode, setDrawing, setMode }}>
      <div className='pixelEditorPage'>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <ButtonShadCn
            onClick={() => setMode('draw')}
            className={`pixelEditor-btn pixelEditor-btn--draw${
              mode === 'draw' ? ' active' : ''
            }`}
            aria-label='Draw'
          >
            <BrushIcon fontSize='small' />
          </ButtonShadCn>
          <ButtonShadCn
            onClick={() => setMode('erase')}
            className={`pixelEditor-btn pixelEditor-btn--erase${
              mode === 'erase' ? ' active' : ''
            }`}
            aria-label='Erase'
          >
            <AutoFixOffIcon fontSize='small' />
          </ButtonShadCn>
        </div>
        <div id='pixel-art-node' className='canvasContainer'>
          {Array.from({ length: ROWS * COLS }).map((_, idx) => (
            <Pixel key={idx} />
          ))}
        </div>
        <ButtonShadCn
          className='mt-10'
          variant='outline'
          onClick={downloadPixelArt}
        >
          Download Pixel Art
        </ButtonShadCn>
        <ButtonShadCn
          className='mt-4'
          variant='outline'
          onClick={setAsPreviewPixelArt}
        >
          Set as preview Pixel Art
        </ButtonShadCn>
        <ButtonShadCn
          className='mt-4'
          variant='outline'
          onClick={clearPreviewPixelArt}
        >
          Restore Preview Pixel Art
        </ButtonShadCn>
        <DialogComponent
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title='Download Pixel Art'
        >
          {dialogChildren}
        </DialogComponent>
      </div>
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => useContext(DrawingContext);
