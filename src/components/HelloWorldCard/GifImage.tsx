import React from 'react';
import { Image } from 'react-konva';

interface GifImageProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
  gifUrl: string;
}

const GifImage: React.FC<GifImageProps> = ({
  x = 0,
  y = 0,
  width,
  height,
  scale = 1,
  gifUrl,
}) => {
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(document.createElement('canvas'));

  React.useEffect(() => {
    // Load gifler library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/gifler@0.1.0/gifler.min.js';

    script.onload = () => {
      // use external library to parse and draw gif animation
      let isFirstFrame = true;

      function onDrawFrame(ctx: CanvasRenderingContext2D, frame: any) {
        // Only set canvas size on the first frame
        if (isFirstFrame) {
          canvasRef.current.width = frame.width;
          canvasRef.current.height = frame.height;
          isFirstFrame = false;
        }

        // update canvas that we are using for Konva.Image
        ctx.drawImage(frame.buffer, 0, 0);
        // update Konva.Image
        (imageRef.current as any)?.getLayer()?.batchDraw();
      }

      (window as any).gifler(gifUrl).frames(canvasRef.current, onDrawFrame);
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
