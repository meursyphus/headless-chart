import { Center, Container, Text, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Title = (
  { name }: { name: string },
  _: PieChartConfig
): Widget => {
  return Container({
    child: Center({
      child: Text({
        text: name,
        style: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }),
    }),
  });
};
