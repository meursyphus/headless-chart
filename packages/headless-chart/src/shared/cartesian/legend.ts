import type { CartesianProps } from "./types";
import { EdgeInsets, Padding, Text, TextStyle } from "@meursyphus/flitter";

export function Legend(...[{ name }]: Parameters<CartesianProps["legend"]>) {
  return Padding({
    padding: EdgeInsets.only({ right: 5 }),
    child: Text(name, {
      style: new TextStyle({
        fontSize: 12,
      }),
    }),
  });
}
