import type { PieChartCustom } from "../types";
import { CustomPaint, Path } from "@meursyphus/flitter";

export function Pie(
  ...[{ startAngle, endAngle, centerX, centerY, radius, color }]: Parameters<
    PieChartCustom["pie"]
  >
) {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => {
          return {
            slice: context.createSvgEl("path"),
          };
        },
        paint: ({ slice }, { width, height }) => {
          const path = createPiePath({
            startAngle,
            endAngle,
            centerX,
            centerY,
            radius,
          });
          slice.setAttribute("fill", color);
          slice.setAttribute("d", path.getD());
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          const path = createPiePath({
            startAngle,
            endAngle,
            centerX,
            centerY,
            radius,
          });
          context.canvas.fillStyle = color;
          context.canvas.beginPath();
          context.canvas.fill(path.toCanvasPath());
        },
      },
    },
  });
}

function createPiePath({
  startAngle,
  endAngle,
  centerX,
  centerY,
  radius,
}: {
  startAngle: number;
  endAngle: number;
  centerX: number;
  centerY: number;
  radius: number;
}) {
  const path = new Path();

  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;

  const startX = centerX + radius * Math.cos(startAngleRad);
  const startY = centerY + radius * Math.sin(startAngleRad);
  const endX = centerX + radius * Math.cos(endAngleRad);
  const endY = centerY + radius * Math.sin(endAngleRad);

  path.moveTo({ x: centerX, y: centerY });
  path.lineTo({ x: startX, y: startY });
  path.arcToPoint({
    endPoint: { x: endX, y: endY },
    rotation: 0,
    radius: { x: radius, y: radius },
    largeArc: endAngle - startAngle > 180,
    clockwise: true,
  });
  path.close();

  return path;
}
