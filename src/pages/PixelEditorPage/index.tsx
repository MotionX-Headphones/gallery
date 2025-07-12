import './index.css';
import React, { useState, createContext, useContext } from 'react';
import Pixel from './Pixel';
import Button from '@mui/material/Button';
const ROWS = 18;
const COLS = 16;

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

  return (
    <DrawingContext.Provider value={{ drawing, mode, setDrawing, setMode }}>
      <div className='pixelEditorPage'>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <Button
            onClick={() => setMode('draw')}
            style={{
              background: mode === 'draw' ? '#007bff' : '#eee',
              color: mode === 'draw' ? '#fff' : '#222',
              border: '1px solid #007bff',
            }}
          >
            Draw
          </Button>
          <Button
            onClick={() => setMode('erase')}
            style={{
              background: mode === 'erase' ? '#007bff' : '#eee',
              color: mode === 'erase' ? '#fff' : '#222',
              border: '1px solid #007bff',
              padding: '6px 16px',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: mode === 'erase' ? 'bold' : 'normal',
            }}
          >
            Erase
          </Button>
        </div>
        <div className='canvasContainer'>
          {Array.from({ length: ROWS * COLS }).map((_, idx) => (
            <Pixel key={idx} />
          ))}
        </div>
      </div>
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => useContext(DrawingContext);
