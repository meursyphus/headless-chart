import type { CartesianProps } from "./types";
import { Text, TextStyle } from "@meursyphus/flitter";

export function YAxisLabel({
  name,
}: Parameters<CartesianProps["yAxisLabel"]>[0]) {
  return Text(name, { style: new TextStyle({ fontSize: 12, color: "black" }) });
}
