import type { PieChartCustom } from "../types";
import {
  Text,
  Column,
  Container,
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
  MainAxisSize,
  Row,
} from "@meursyphus/flitter";

export function Layout(
  ...[{ title, legends, plot }, { data }]: Parameters<PieChartCustom["layout"]>
) {
  const maxLabelLength = Math.max(...data.labels.map((label) => label.length));

  return Container({
    padding: EdgeInsets.only({
      left: 20 + maxLabelLength * 3,
      bottom: 60,
      right: 10,
    }),
    child: Column({
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row({
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            title,
            Row({
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: legends,
            }),
          ],
        }),
        plot,
      ],
    }),
  });
}
