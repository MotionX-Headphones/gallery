import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Group } from 'react-konva';
import GifImage from './GifImage';
const CANVAS_WIDTH = 3376;
const CANVAS_HEIGHT = 3376;
const IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/app-resources%2Fheadphones-squre.png?alt=media&token=22fa447b-4e6f-4a27-9741-c8361298c8fe';

export const HelloWorldCard: React.FC<{
  overlayImageUrl?: string;
}> = ({ overlayImageUrl }) => {
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(
    null
  );
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
          {overlayImage && (
            <Group
              clipFunc={(ctx: CanvasRenderingContext2D) => {
                // Define the quadrilateral clipping path
                ctx.beginPath();
                ctx.moveTo(1225 * scale, 2400 * scale); // Top-left
                ctx.lineTo(2140 * scale, 2400 * scale); // Top-right
                ctx.lineTo(2120 * scale, 3115 * scale); // Bottom-right
                ctx.lineTo(1240 * scale, 3115 * scale); // Bottom-left
                ctx.closePath();
              }}
            >
              <Image
                image={overlayImage}
                x={1225 * scale}
                y={2400 * scale}
                width={(2140 - 1225) * scale}
                height={(3115 - 2400) * scale}
              />
            </Group>
          )}
          <GifImage
            x={1225 * scale}
            y={2400 * scale}
            width={(2140 - 1225) * scale}
            height={(3115 - 2400) * scale}
          />
        </Layer>
      </Stage>
    </div>
  );
};
