import './index.css';
import React, { useState, createContext, useContext } from 'react';
import domtoimage from 'dom-to-image';
import Pixel from '@/pages/PixelEditorPage/Pixel';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Button as ButtonShadCn } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
  // Handle pointer events globally to stop drawing (unified for mouse, touch, pen)
  React.useEffect(() => {
    const stopDrawing = () => setDrawing(false);

    // Pointer events provide unified handling for mouse, touch, and pen
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointercancel', stopDrawing);

    // Keep legacy events for better browser compatibility
    window.addEventListener('mouseup', stopDrawing);
    window.addEventListener('touchend', stopDrawing);
    window.addEventListener('touchcancel', stopDrawing);

    return () => {
      window.removeEventListener('pointerup', stopDrawing);
      window.removeEventListener('pointercancel', stopDrawing);
      window.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('touchend', stopDrawing);
      window.removeEventListener('touchcancel', stopDrawing);
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
        setOpenDialog(true);
        setDataUrl(dataUrl);
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
            variant='outline'
            onClick={() => setMode('draw')}
            className={`pixelEditor-btn pixelEditor-btn--draw${
              mode === 'draw' ? ' active' : ''
            }`}
            aria-label='Draw'
          >
            <BrushIcon fontSize='small' />
          </ButtonShadCn>
          <ButtonShadCn
            variant='outline'
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
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Download Pixel Art</DialogTitle>
              <DialogDescription>
                <p>
                  Due to Telegram restrictions, you have to copy the Base64
                  string of the image and retrieve the image file via browser or
                  other tools.
                </p>
                <ButtonShadCn
                  variant='default'
                  className='mt-6 w-full'
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(dataUrl);
                      toast.success('Copied to clipboard!');
                      setOpenDialog(false);
                    }
                  }}
                >
                  Copy Base64
                </ButtonShadCn>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => useContext(DrawingContext);
