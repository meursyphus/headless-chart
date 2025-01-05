import type { PieChartCustom } from "../types";
import { Stack, Align, Alignment } from "@meursyphus/flitter";

export function Series(
  ...[{ pie, scale }, context]: Parameters<PieChartCustom["series"]>
) {
  const totalValue = pie.reduce((sum, slice) => sum + slice.value, 0);

  let currentAngle = 0;

  const children = pie.map((slice, index) => {
    const startAngle = currentAngle;
    const angleDelta = (slice.value / totalValue) * 360;
    const endAngle = startAngle + angleDelta;

    const midAngle = (startAngle + endAngle) / 2;
    const labelX =
      scale.centerX + scale.radius * 0.6 * Math.cos((midAngle * Math.PI) / 180);
    const labelY =
      scale.centerY + scale.radius * 0.6 * Math.sin((midAngle * Math.PI) / 180);

    currentAngle = endAngle;

    return Align({
      alignment: new Alignment({ x: 0, y: 0 }),
    });
  });

  return Stack({ children });
}
