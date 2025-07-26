import { useRef, useEffect } from 'react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/app-resources%2Fheadphones-squre.png?alt=media&token=22fa447b-4e6f-4a27-9741-c8361298c8fe'; // Replace with your image link

export const HelloWorldCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = new window.Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    img.src = IMAGE_URL;
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100vw',
        aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          background: 'white',
        }}
      />
    </div>
  );
};
