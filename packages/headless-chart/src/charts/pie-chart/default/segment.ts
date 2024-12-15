import type { PieChartCustom } from "../types";
import { CustomPaint, Path, type Widget } from "@meursyphus/flitter";

function createArcPath({
  center,
  radius,
  startAngle,
  endAngle,
}: {
  center: { x: number; y: number };
  radius: number;
  startAngle: number;
  endAngle: number;
}) {
  const path = new Path();

  const startX = center.x + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = center.y + radius * Math.sin((startAngle * Math.PI) / 180);

  const endX = center.x + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = center.y + radius * Math.sin((endAngle * Math.PI) / 180);

  path.moveTo(center);
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
function calculatePath(
  width: number,
  height: number,
  startAngle: number,
  endAngle: number,
) {
  const radius = Math.min(width, height) / 2;
  const center = { x: width / 2, y: height / 2 };
  return createArcPath({ center, radius, startAngle, endAngle });
}
export function Segment(
  ...[{ value = 0, legend = "gray", startAngle = 0, endAngle = 0 }]: Parameters<
    PieChartCustom["segment"]
  >
): Widget {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => ({
          arc: context.createSvgEl("path"),
        }),
        paint: ({ arc }, { width, height }) => {
          const path = calculatePath(width, height, startAngle, endAngle);
          arc.setAttribute("d", path.getD());
          arc.setAttribute("fill", legend);
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          const path = calculatePath(width, height, startAngle, endAngle);
          context.canvas.fillStyle = legend;
          context.canvas.fill(path.toCanvasPath());
        },
      },
    },
  });
}
