import type { TreemapCustom } from "../types";
import {
  Container,
  EdgeInsets,
  Padding,
  Row,
  SizedBox,
  Text,
  TextStyle,
  type Widget,
} from "@meursyphus/flitter";

export function LegendItem(
  ...[{ label, color }]: Parameters<TreemapCustom["legendItem"]>
): Widget {
  return Padding({
    padding: EdgeInsets.only({ right: 10 }),
    child: Row({
      children: [
        Container({
          width: 10,
          height: 10,
          color,
        }),
        SizedBox({ width: 4 }),
        Text(label, {
          style: new TextStyle({ fontSize: 11 }),
        }),
      ],
    }),
  });
}
