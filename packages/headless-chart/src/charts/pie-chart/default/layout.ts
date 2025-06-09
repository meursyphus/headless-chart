import { Column, Container, Row, SizedBox, EdgeInsets, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Layout = (
  { title, legends, plot }: { title: Widget; legends: Widget[]; plot: Widget },
  _: PieChartConfig
): Widget => {
  return Column({
    children: [
      title,
      SizedBox({ height: 20 }),
      Row({
        children: [
          Container({
            child: plot,
            width: 300,
            height: 300,
          }),
          Container({
            child: Column({
              children: legends,
            }),
            padding: EdgeInsets.only({ left: 20 }),
          }),
        ],
      }),
    ],
  });
};
