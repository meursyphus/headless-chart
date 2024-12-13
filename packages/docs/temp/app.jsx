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
      legend: "norway",
      values: [600, 1000, -800, 1000, 500, 850, 600, 675, 720, 890, 700, 950],
    },

    {
      legend: "germany",
      values: [565, 850, -734, 863, 268, 571, -396, 588, 442, 726, 640, 732],
    },
    {
      legend: "us",
      values: [435, 559, -482, 580, 167, 308, -255, 557, 437, 438, 543, 554],
    },
    {
      legend: "france",
      values: [242, 405, -262, 418, 109, 224, -216, 339, 428, 284, 247, 416],
    },
    {
      legend: "japan",
      values: [126, 166, -238, 122, 102, 120, -70, 281, 234, 59, 213, 289],
    },
  ],
};

const chart = AreaChart({
  data,
  getScale: () => ({
    min: -900,
    max: 1100,
    step: 200,
  }),
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
