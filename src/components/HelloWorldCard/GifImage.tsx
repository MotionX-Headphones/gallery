import React from 'react';
import { Image } from 'react-konva';

interface GifImageProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
}

const GifImage: React.FC<GifImageProps> = ({
  x = 0,
  y = 0,
  width,
  height,
  scale = 1,
}) => {
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(document.createElement('canvas'));

  React.useEffect(() => {
    // Load gifler library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/gifler@0.1.0/gifler.min.js';

    script.onload = () => {
      // use external library to parse and draw gif animation
      function onDrawFrame(ctx: CanvasRenderingContext2D, frame: any) {
        // update canvas size
        canvasRef.current.width = frame.width;
        canvasRef.current.height = frame.height;
        // update canvas that we are using for Konva.Image
        ctx.drawImage(frame.buffer, 0, 0);
        // update Konva.Image
        imageRef.current?.getLayer()?.batchDraw();
      }

      (window as any)
        .gifler('https://konvajs.org/assets/yoda.gif')
        .frames(canvasRef.current, onDrawFrame);
    };

    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <Image
      ref={imageRef}
      image={canvasRef.current}
      x={x}
      y={y}
      width={width}
      height={height}
      scaleX={scale}
      scaleY={scale}
    />
  );
};

export default GifImage;
