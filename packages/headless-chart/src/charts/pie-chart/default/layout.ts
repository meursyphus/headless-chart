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
  return Container({
    padding: EdgeInsets.only({
      left: 20,
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
            title || Text("No Title"),
            Row({
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: Array.isArray(legends) ? legends : [Text("No Legends")],
            }),
          ],
        }),
        plot || Text("No Plot Available"),
      ],
    }),
  });
}
