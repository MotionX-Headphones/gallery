import './index.css';
import React, { useState, createContext, useContext } from 'react';
import domtoimage from 'dom-to-image';

import Pixel from './Pixel';
import Button from '@mui/material/Button';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import DownloadIcon from '@mui/icons-material/Download';
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

    domtoimage
      .toPng(element)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = `pixel-art-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading pixel art:', error);
      });
  };

  return (
    <DrawingContext.Provider value={{ drawing, mode, setDrawing, setMode }}>
      <div className='pixelEditorPage'>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <Button
            onClick={() => setMode('draw')}
            className={`pixelEditor-btn pixelEditor-btn--draw${
              mode === 'draw' ? ' active' : ''
            }`}
            aria-label='Draw'
          >
            <BrushIcon fontSize='small' />
          </Button>
          <Button
            onClick={() => setMode('erase')}
            className={`pixelEditor-btn pixelEditor-btn--erase${
              mode === 'erase' ? ' active' : ''
            }`}
            aria-label='Erase'
          >
            <AutoFixOffIcon fontSize='small' />
          </Button>
        </div>
        <div id='pixel-art-node' className='canvasContainer'>
          {Array.from({ length: ROWS * COLS }).map((_, idx) => (
            <Pixel key={idx} />
          ))}
        </div>
        <Button
          onClick={downloadPixelArt}
          startIcon={<DownloadIcon />}
          style={{
            marginTop: 20,
            color: 'var(--tg-theme-text-color)',
            borderColor: 'var(--tg-theme-text-color)',
          }}
        >
          Download Pixel Art
        </Button>
      </div>
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => useContext(DrawingContext);
