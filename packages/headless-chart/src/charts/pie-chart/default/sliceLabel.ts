import { Container, Text, Positioned, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const SliceLabel = (
  { value, percentage, label, index }: {
    value: number;
    percentage: number;
    label: string;
    index: number;
  },
  _: PieChartConfig
): Widget => {
  // 실제 구현에서는 슬라이스의 위치에 따라 레이블 위치 계산 필요
  // 이 예시에서는 간단하게 처리
  return Positioned({
    // 위치 계산은 실제 구현에서 슬라이스 각도와 반지름에 따라 계산해야 함
    top: 0, // 임시 값
    left: 0, // 임시 값
    child: Container({
      padding: { horizontal: 4, vertical: 2 },
      decoration: {
        color: "rgba(255, 255, 255, 0.8)",
        borderRadius: 4,
      },
      child: Text({
        text: `${percentage.toFixed(1)}%`,
        style: {
          fontSize: 12,
          color: "#333",
        },
      }),
    }),
  });
};
