import { Container, Row, Text, SizedBox, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Legend = (
  { name, index }: { name: string; index: number },
  _: PieChartConfig
): Widget => {
  // 기본 색상 배열 (slice.ts와 동일한 색상 사용)
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#F95738", "#20A39E"
  ];
  
  // 인덱스에 해당하는 색상
  const color = colors[index % colors.length];
  
  return Container({
    margin: { bottom: 5 },
    child: Row({
      children: [
        // 색상 표시 상자
        Container({
          width: 15,
          height: 15,
          decoration: {
            color: color,
            borderRadius: 2,
          },
        }),
        // 간격
        SizedBox({ width: 8 }),
        // 레전드 텍스트
        Text({
          text: name,
          style: {
            fontSize: 14,
          }
        }),
      ],
    }),
  });
};
