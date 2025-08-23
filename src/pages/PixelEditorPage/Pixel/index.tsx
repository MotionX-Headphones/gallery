import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';
import { useDrawingContext } from '../index';

const Pixel: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const { drawing, mode, setDrawing } = useDrawingContext();
  const ref = useRef<HTMLDivElement>(null);

  // Set pixel state based on mode
  const paint = useCallback(() => {
    if (mode === 'draw') setSelected(true);
    else setSelected(false);
  }, [mode]);

  // Mouse event handling for desktop (original smooth experience)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only handle left mouse button
      if (e.button !== 0) return;

      setDrawing(true);
      paint();
    },
    [setDrawing, paint]
  );

  const handleMouseEnter = useCallback(() => {
    // Handle drawing when entering pixel during active drawing (original behavior)
    if (drawing) {
      paint();
    }
  }, [drawing, paint]);

  // Touch-specific pointer handling for mobile
  const handlePointerStart = useCallback(
    (e: React.PointerEvent) => {
      // Only handle touch and pen events, let mouse events use original handlers
      if (e.pointerType === 'mouse') return;

      // Only handle primary pointer (avoid multi-touch conflicts)
      if (!e.isPrimary) return;

      // Prevent default behavior for touch events
      e.preventDefault();

      // Capture the pointer for smooth tracking
      if (ref.current) {
        ref.current.setPointerCapture(e.pointerId);
      }

      setDrawing(true);
      paint();
    },
    [setDrawing, paint]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      // Only handle touch and pen events for pointer enter
      if (e.pointerType === 'mouse') return;

      // Handle drawing when entering pixel during active drawing
      if (drawing) {
        paint();
      }
    },
    [drawing, paint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Only handle touch and pen events
      if (e.pointerType === 'mouse') return;

      // Only handle primary pointer and when drawing is active
      if (!e.isPrimary || !drawing) return;

      // Prevent default to avoid scrolling on mobile
      e.preventDefault();

      // Check if pointer is over this pixel element
      const rect = ref.current?.getBoundingClientRect();
      if (
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        paint();
      }
    },
    [drawing, paint]
  );

  // Global pointer events for better touch handling
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Handle touch-specific improvements
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent default to avoid iOS Safari's zoom and pan
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling during drawing
      e.preventDefault();

      if (!drawing || e.touches.length === 0) return;

      // Get the touch coordinates
      const touch = e.touches[0];
      const elementFromPoint = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      // Check if we're over a different pixel and trigger its paint
      if (
        elementFromPoint &&
        elementFromPoint !== node &&
        elementFromPoint.classList.contains('pixel')
      ) {
        const pixelElement = elementFromPoint as HTMLElement;
        // Find the React component instance and trigger paint
        // This allows smooth swiping across pixels
        const paintEvent = new CustomEvent('pixelPaint');
        pixelElement.dispatchEvent(paintEvent);
      }
    };

    const handlePixelPaint = () => {
      if (drawing) paint();
    };

    // Add touch event listeners with passive: false for preventDefault
    node.addEventListener('touchstart', handleTouchStart, { passive: false });
    node.addEventListener('touchmove', handleTouchMove, { passive: false });
    node.addEventListener('pixelPaint', handlePixelPaint);

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('pixelPaint', handlePixelPaint);
    };
  }, [drawing, paint]);

  return (
    <div
      ref={ref}
      className={`pixel${selected ? ' selected' : ''}`}
      // Mouse events for desktop (original smooth experience)
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      // Pointer events for touch/pen (enhanced mobile experience)
      onPointerDown={handlePointerStart}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      style={{
        touchAction: 'none', // Prevent browser touch behaviors
        userSelect: 'none', // Prevent text selection
      }}
    />
  );
};

export default Pixel;
