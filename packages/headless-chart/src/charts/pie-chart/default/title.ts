import { Center, Container, Text, TextStyle, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Title = (
  { name }: { name: string },
  _: PieChartConfig
): Widget => {
  return Container({
    child: Center({
      child: Text(name, {
        style: new TextStyle({
          fontSize: 18,
          fontWeight: "bold",
        }),
      }),
    }),
  });
};
