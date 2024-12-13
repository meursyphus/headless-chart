import type { BubbleChartData, BubbleChartScale } from "../types";

export function getScale({ datasets }: BubbleChartData): BubbleChartScale {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  let valueMin = Infinity;
  let valueMax = -Infinity;

  datasets.forEach((d) => {
    d.data.forEach((p) => {
      if (p.x < xMin) xMin = p.x;
      if (p.x > xMax) xMax = p.x;
      if (p.y < yMin) yMin = p.y;
      if (p.y > yMax) yMax = p.y;
      if (p.value < valueMin) valueMin = p.value;
      if (p.value > valueMax) valueMax = p.value;
    });
  });

  return {
    xMin,
    xMax,
    yMin,
    yMax,
    valueMin,
    valueMax,
  };
}
