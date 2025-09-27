import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Group } from 'react-konva';
import GifImage from './GifImage';
const CANVAS_WIDTH = 3376;
const CANVAS_HEIGHT = 3376;
const IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/app-resources%2Fheadphones-squre.png?alt=media&token=22fa447b-4e6f-4a27-9741-c8361298c8fe';

export const HeadphonesPreview: React.FC<{
  overlayImageUrl?: string;
}> = ({ overlayImageUrl }) => {
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(
    null
  );
  const [overlayPixelArt, setOverlayPixelArt] =
    useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load background image
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setBackgroundImage(img);
    img.src = IMAGE_URL;
  }, []);

  // Load overlay image
  useEffect(() => {
    if (!overlayImageUrl) return;

    const img = new window.Image();
    img.onload = () => setOverlayImage(img);
    img.src = overlayImageUrl;
  }, [overlayImageUrl]);

  useEffect(() => {
    const pixelArt = localStorage.getItem('pixel-art-preview');
    if (pixelArt) {
      const img = new window.Image();
      img.onload = () => setOverlayPixelArt(img);
      img.src = pixelArt;
    }
  }, [overlayPixelArt]);

  // Calculate stage size based on container
  useEffect(() => {
    const updateStageSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const scale = containerWidth / CANVAS_WIDTH;
        setStageSize({
          width: containerWidth,
          height: CANVAS_HEIGHT * scale,
        });
      }
    };

    updateStageSize();
    window.addEventListener('resize', updateStageSize);
    return () => window.removeEventListener('resize', updateStageSize);
  }, []);

  // Calculate scale factor for the stage
  const scale = stageSize.width / CANVAS_WIDTH;

  const isGif = overlayImageUrl?.toLowerCase().includes('.gif');

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '100vw',
        aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
      }}
    >
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          {/* Background image */}
          {backgroundImage && (
            <Image
              image={backgroundImage}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              scaleX={scale}
              scaleY={scale}
            />
          )}

          {/* Overlay image with quadrilateral clipping */}
          {overlayImage && !isGif && (
            <Group
              clipFunc={(ctx: CanvasRenderingContext2D) => {
                // Define the quadrilateral clipping path with slight extension to eliminate white space
                ctx.beginPath();
                ctx.moveTo(1220 * scale, 2395 * scale); // Top-left (extended)
                ctx.lineTo(2145 * scale, 2395 * scale); // Top-right (extended)
                ctx.lineTo(2145 * scale, 3120 * scale); // Bottom-right (extended)
                ctx.lineTo(1220 * scale, 3120 * scale); // Bottom-left (extended)
                ctx.closePath();
              }}
            >
              <Image
                image={overlayImage}
                x={1220 * scale}
                y={2395 * scale}
                width={(2145 - 1220) * scale}
                height={(3120 - 2395) * scale}
              />
            </Group>
          )}

          {isGif && overlayImageUrl && (
            <GifImage
              x={1220 * scale}
              y={2395 * scale}
              width={(2145 - 1220) * scale}
              height={(3120 - 2395) * scale}
              gifUrl={overlayImageUrl!}
            />
          )}
          {overlayPixelArt && (
            <Image
              image={overlayPixelArt}
              x={1455 * scale}
              y={835 * scale}
              width={450 * scale}
              height={520 * scale}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};
