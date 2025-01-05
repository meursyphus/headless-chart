import type { PieChartCustom } from "./../types";
import {
  Column,
  Container,
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
  MainAxisSize,
  Row,
} from "@meursyphus/flitter";

export function Layout(
  ...[{ title, legends }]: Parameters<PieChartCustom[""]>
) {
  return Container({
    padding: EdgeInsets.only({
      left: 20,
      bottom: 60,
      right: 10,
    }),
  });
}
