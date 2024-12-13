import Widget from "@meursyphus/flitter-react";
import { AreaChart } from "@meursyphus/headless-chart";
import {
  Text,
  CustomPaint,
  Path,
  Rect,
  Offset,
  BoxDecoration,
  Column,
  Container,
  CrossAxisAlignment,
  EdgeInsets,
  Row,
  SizedBox,
  TextStyle,
  Flexible,
  Padding,
  MainAxisSize,
  MainAxisAlignment,
  Stack,
  Positioned,
} from "@meursyphus/flitter";

import Area from "./area";
import Series from "./series";

const data = {
  labels: [
    "plane",
    "helicopter",
    "boat",
    "train",
    "subway",
    "bus",
    "car",
    "moto",
    "bicycle",
    "horse",
    "skateboard",
    "others",
  ],
  datasets: [
    {
      legend: "A",
      values: [30, 40.5, 50.12, 30.5, 40, 90, 50, -20, 10],
    },
    {
      legend: "B",
      values: [60, 20.5, -20.2, 22.5, -10, 10, 10, 30, 20],
    },
    {
      legend: "C",
      values: [6, 10.5, 20.2, -12.5, 1, 23, -17, 91, 0],
    },
  ],
};

const chart = AreaChart({
  data,
  custom: {
    layout: (...[{ legends, plot, title }]) =>
      Container({
        padding: EdgeInsets.only({ top: 50, left: 50, bottom: 70 }),
        child: Stack({
          children: [
            Positioned({
              top: -20,
              right: 0,
              child: Text("Inspired by Toast", {
                style: new TextStyle({
                  fontSize: 14,
                  color: "#999999",
                  fontFamily: "Noto Sans JP",
                }),
              }),
            }),
            Row({
              children: [
                Flexible({ flex: 1, child: plot }),
                SizedBox({ width: 20 }),
              ],
            }),
          ],
        }),
      }),
    area: Area,
    series: ({areas}) => new Series({areas}),
    xAxisLabel: (...[{ name }]) =>
      Padding({
        padding: EdgeInsets.only({ top: 1 }),
        child: Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 12,
            color: "#666666",
          }),
        }),
      }),
    yAxisLabel: (...[{ name }]) =>
      Padding({
        padding: EdgeInsets.only({ right: 1 }),
        child: Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 12,
            color: "#666666",
          }),
        }),
      }),
    xAxisTick: () =>
      Container({
        height: 6,
        width: 1,
        color: "#BBBBBB",
      }),
    yAxisTick: () =>
      Container({
        height: 1,
        width: 6,
        color: "#BBBBBB",
      }),
    yAxisLine: () =>
      Container({
        color: "#BBBBBB",
        width: 1,
      }),
    xAxisLine: () =>
      Container({
        color: "#BBBBBB",
        height: 1,
      }),
    gridXLine: () => Container({ height: 1, color: "#DDDDDD" }),
    gridYLine: () => Container({ width: 1, color: "#DDDDDD" }),
  },
});

export default function App() {
  return <Widget width="auto" height="400px" widget={chart} renderer="svg" />;
}
