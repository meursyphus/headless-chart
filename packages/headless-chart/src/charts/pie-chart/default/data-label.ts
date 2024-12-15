import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function DataLabel(...args: Parameters<PieChartCustom["dataLabel"]>) {
  const { value, label, legend, angle, radius = 50 } = args[0];

  const safeAngle = Number.isFinite(angle) ? angle % 360 : 0;
  const safeRadius = radius > 0 ? radius : 50;

  const radians = (safeAngle * Math.PI) / 180;
  const x = safeRadius * Math.cos(radians);
  const y = safeRadius * Math.sin(radians);

  const computedLabel = label
    ? `${label} (${x.toFixed(2)}, ${y.toFixed(2)})`
    : `${x.toFixed(2)}, ${y.toFixed(2)}`;

  return Cartesian.DataLabel({
    value,
    label: computedLabel,
    legend,
  });
}
