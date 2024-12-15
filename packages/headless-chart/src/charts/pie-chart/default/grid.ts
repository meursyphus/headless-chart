import * as Cartesian from "@shared/cartesian/index";
import { PieChartCustom } from "../types";
import {
  Transform,
  Container,
  Alignment,
  type Widget,
} from "@meursyphus/flitter";

function RadiusLine({
  start = [0, 0],
  angle,
  length,
  thickness = 1,
  color = "black",
}: {
  start?: [number, number];
  angle: number;
  length: number;
  thickness?: number;
  color?: string;
}): Widget {
  const safeLength = length > 0 ? length : 1;

  return Transform.rotate({
    angle: angle % 360,
    child: Container({
      width: safeLength,
      height: thickness,
      color,
      alignment: Alignment.center,
    }),
  });
}

function Circle({
  radius,
  fillColor = "transparent",
}: {
  radius: number;

  fillColor?: string;
}): Widget {
  const safeRadius = radius > 0 ? radius : 1;
  const size = safeRadius * 2;

  return Transform.scale({
    scale: 1,
    child: Container({
      width: size,
      height: size,
      color: fillColor,
      alignment: Alignment.center,
    }),
  });
}

export function Grid(
  ...[{ radialLines = [], concentricCircles = [] }]: Parameters<
    PieChartCustom["grid"]
  >
) {
  const x = Array.isArray(radialLines) ? radialLines.length : 0;
  const y = Array.isArray(concentricCircles) ? concentricCircles.length : 0;

  return Cartesian.Grid({
    x,
    y,
    xLine: RadiusLine({ start: [0, 0], angle: 0, length: 1 }),
    yLine: Circle({ radius: 1 }),
  });
}
