import type { PieChartCustom } from "../types";
import {
  CustomPaint,
  Painter,
  Path,
  Stack,
  type Widget,
} from "@meursyphus/flitter";

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

  if (radius <= 0) {
    console.warn("Radius must be greater than zero.");
    return path;
  }

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
  path.lineTo({ x: center.x, y: center.y });

  return path;
}

export function Pie(
  ...[{ arcs, total }, context]: Parameters<PieChartCustom["segments"]>
): Widget {
  const { custom, data } = context;
  const center = { x: 100, y: 100 };
  const radius = 80;

  let startAngle = 0;

  if (!arcs || !Array.isArray(arcs)) {
    console.warn("Invalid arcs input.");
    return Stack({ children: [] });
  }

  const arcWidgets = arcs
    .map((_, index) => {
      const value = data.datasets[index].values[0];
      const legend = data.datasets[index].legend;
      const endAngle = startAngle + (value / total) * 360;

      const arcPath = createArcPath({ center, radius, startAngle, endAngle });

      const segment = custom.segment(
        {
          value,
          legend,
          startAngle,
          endAngle,
          index,
        },
        context,
      );

      startAngle = endAngle;
      return Stack({
        children: [
          CustomPaint({
            painter: {
              paint(context: any) {
                context.drawPath(arcPath, { color: "gray" });
              },
            } as any,
          }),
          segment,
        ],
      });
    })
    .filter(Boolean);

  return Stack({
    children: arcWidgets,
  });
}
