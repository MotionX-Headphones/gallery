import { useRef, useEffect } from 'react';

const CANVAS_WIDTH = 3376;
const CANVAS_HEIGHT = 3376;
const IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/app-resources%2Fheadphones-squre.png?alt=media&token=22fa447b-4e6f-4a27-9741-c8361298c8fe'; // Replace with your image link

export const HelloWorldCard: React.FC = (props: {
  overlayImageUrl?: string;
}) => {
  const { overlayImageUrl } = props;
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
      if (overlayImageUrl) {
        const overlayImg = new window.Image();
        overlayImg.onload = () => {
          // Draw overlay image as a quadrilateral using the 4 corner points
          // Source corners: (1225,2400), (2140,2400), (1240,3115), (2120,3115)

          // Save current context state
          ctx?.save();

          // Create a path for the quadrilateral
          ctx?.beginPath();
          ctx?.moveTo(1225, 2400); // Top-left
          ctx?.lineTo(2140, 2400); // Top-right
          ctx?.lineTo(2120, 3115); // Bottom-right
          ctx?.lineTo(1240, 3115); // Bottom-left
          ctx?.closePath();

          // Set clipping path to the quadrilateral
          ctx?.clip();

          // Calculate bounding box for the image
          const minX = Math.min(1225, 2140, 1240, 2120);
          const maxX = Math.max(1225, 2140, 1240, 2120);
          const minY = Math.min(2400, 2400, 3115, 3115);
          const maxY = Math.max(2400, 2400, 3115, 3115);

          // Draw the image to fill the bounding box
          ctx?.drawImage(overlayImg, minX, minY, maxX - minX, maxY - minY);

          // Restore context state
          ctx?.restore();
        };
        overlayImg.src = overlayImageUrl;
      }
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
