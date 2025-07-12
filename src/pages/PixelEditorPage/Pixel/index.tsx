import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { useDrawingContext } from '../index';

const Pixel: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const { drawing, mode, setDrawing } = useDrawingContext();
  const ref = useRef<HTMLDivElement>(null);

  // Set pixel state based on mode
  const paint = () => {
    if (mode === 'draw') setSelected(true);
    else setSelected(false);
  };

  // Attach touch listeners with passive: false
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      setDrawing(true);
      paint();
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (drawing) paint();
    };
    node.addEventListener('touchstart', handleTouchStart, { passive: false });
    node.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
    };
  }, [drawing, mode]);

  return (
    <div
      ref={ref}
      className={`pixel${selected ? ' selected' : ''}`}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        setDrawing(true);
        paint();
      }}
      onMouseEnter={() => {
        if (drawing) paint();
      }}
    />
  );
};

export default Pixel;
