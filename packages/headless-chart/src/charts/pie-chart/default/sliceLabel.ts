import { 
  Container, 
  Text, 
  Positioned, 
  EdgeInsets,
  BorderRadius,
  BoxDecoration,
  TextStyle,
  type Widget 
} from "@meursyphus/flitter";
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
  return Positioned({
    top: 0,
    left: 0,
    child: Container({
      padding: EdgeInsets.symmetric({ horizontal: 4, vertical: 2 }),
      decoration: new BoxDecoration({
        color: "rgba(255, 255, 255, 0.8)",
        borderRadius: BorderRadius.circular(4),
      }),
      child: Text(`${percentage.toFixed(1)}%`, {
        style: new TextStyle({
          fontSize: 12,
          color: "#333",
        }),
      }),
    }),
  });
};
