import type { RadarChartCustom } from "../types";
import {
  EdgeInsets,
  Padding,
  Text,
  TextStyle,
  type Widget,
} from "@meursyphus/flitter";

export function Legend(
  ...[{ name }]: Parameters<RadarChartCustom["legend"]>
): Widget {
  return Padding({
    padding: EdgeInsets.only({ right: 5 }),
    child: Text(name, {
      style: new TextStyle({
        fontSize: 12,
      }),
    }),
  });
}
