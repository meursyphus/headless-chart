import type { PieChartCustom } from "../types";
import {
  Container,
  Axis,
  Alignment,
  Padding,
  EdgeInsets,
  Widget,
  Flex,
  MainAxisAlignment,
} from "@meursyphus/flitter";

export function PieGroup(
  ...[{ pies, values, index, label }]: Parameters<PieChartCustom["pieGroup"]>
) {
  const total = values.reduce((acc, value) => acc + value, 0);

  const angles = values.map((value) => (value / total) * 360);

  let accumulatedAngle = 0;

  return Container({
    width: Infinity,
    height: Infinity,
    alignment: Alignment.center,
    child: Flex({
      mainAxisAlignment: MainAxisAlignment.center,
      direction: Axis.horizontal,
      children: pies.map((pie, idx): Widget => {
        const startAngle = accumulatedAngle;
        const endAngle = startAngle + angles[idx];
        accumulatedAngle = endAngle;

        return Padding({
          padding: EdgeInsets.all(2),
          child: Container({
            width: 300,
            height: 300,
            alignment: Alignment.center,
            child: pie,
          }),
        });
      }),
    }),
  });
}
