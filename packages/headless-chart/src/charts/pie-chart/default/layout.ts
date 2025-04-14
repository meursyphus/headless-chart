import { Column, Container, Row, SizedBox, type Widget } from "@meursyphus/flitter";
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
          // 플롯은 메인 영역을 차지
          Container({
            child: plot,
            width: 300, // 기본 크기, 실제로는 조정 가능
            height: 300,
          }),
          // 범례는 오른쪽에 배치
          Container({
            child: Column({
              children: legends,
            }),
            padding: { left: 20 },
          }),
        ],
      }),
    ],
  });
};
