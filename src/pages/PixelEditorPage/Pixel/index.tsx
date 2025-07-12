import React, { useState } from 'react';
import './index.css';
import { useDrawingContext } from '../index';

const Pixel: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const { drawing, mode, setDrawing } = useDrawingContext();

  // Set pixel state based on mode
  const paint = (action: 'down' | 'enter') => {
    if (mode === 'draw') setSelected(true);
    else setSelected(false);
    if (action === 'down') setDrawing(true);
  };

  return (
    <div
      className={`pixel${selected ? ' selected' : ''}`}
      onMouseDown={(e) => {
        if (e.button !== 0) return; // Only left click
        paint('down');
      }}
      onMouseEnter={(e) => {
        if (drawing) paint('enter');
      }}
      onTouchStart={(e) => {
        paint('down');
      }}
      onTouchMove={(e) => {
        if (drawing) paint('enter');
      }}
    />
  );
};

export default Pixel;
