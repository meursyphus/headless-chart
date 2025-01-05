import { PieChartData, PieChartScale } from "../types";

export function getScale({ datasets }: PieChartData): PieChartScale {
  const values: number[] = [];

  datasets.forEach((d) => {
    d.data.forEach((p) => {
      values.push(p.value);
    });
  });

  const totalValues = values.reduce((sum, value) => sum + value, 0);

  const centerX = 150;
  const centerY = 150;

  const maxRadius = 100;
  const radius = totalValues > 0 ? maxRadius : 0;

  return {
    scale: {
      centerX,
      centerY,
      radius,
    },
  };
}
