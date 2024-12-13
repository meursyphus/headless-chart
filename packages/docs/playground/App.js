import Widget from "@meursyphus/flitter-react";
import { BubbleChart } from "@meursyphus/headless-chart";
import {
  Text,
  BoxDecoration,
  Column,
  Container,
  EdgeInsets,
  Row,
  SizedBox,
  TextStyle,
  Padding,
  MainAxisSize,
  MainAxisAlignment,
  Stack,
  Positioned,
  Alignment,
  Axis,
  CrossAxisAlignment,
  Expanded,
  Flex,
  FractionallySizedBox,
  AnimatedContainer,
  Animation,
  Curves,
  CurvedAnimation,
  AnimationController,
  Tween,
  ClipRect,
  Rect,
  BuildContext,
  StatefulWidget,
  State,
  ConstraintsTransformBox,
} from "@meursyphus/flitter";

import defaultColors from "./colors";

const data = {
  datasets: [
    {
      legend: "Africa",
      data: [
        { x: 4200, y: 70.35, value: 32209101, label: "Morocco" },
        { x: 4200, y: 70.71, value: 76117421, label: "Egypt" },
        { x: 5900, y: 56.46, value: 1355246, label: "Gabon" },
        { x: 6600, y: 72.74, value: 32129324, label: "Algeria" },
        { x: 6700, y: 76.28, value: 5631585, label: "Libya" },
        { x: 7100, y: 74.66, value: 9974722, label: "Tunisia" },
        { x: 10500, y: 69.28, value: 1096585, label: "Trinidad and Tobago" },
        { x: 12800, y: 72.09, value: 1220481, label: "Mauritius" },
        { x: 18200, y: 78.68, value: 396851, label: "Malta" }
      ]
    },
    {
      legend: "America",
      data: [
        { x: 4800, y: 74.64, value: 6191368, label: "Paraguay" },
        { x: 4900, y: 70.92, value: 6587541, label: "El Salvador" },
        { x: 5600, y: 69.22, value: 2754430, label: "Peru" },
        { x: 5800, y: 74.06, value: 2501738, label: "Venezuela" },
        { x: 6300, y: 67.63, value: 8833634, label: "Dominican Republic" },
        { x: 6500, y: 67.43, value: 272945, label: "Belize" },
        { x: 6600, y: 71.43, value: 4231077, label: "Colombia" },
        { x: 6900, y: 72.14, value: 3000463, label: "Panama" },
        { x: 8100, y: 71.41, value: 78410118, label: "Brazil" },
        { x: 9600, y: 76.63, value: 3956507, label: "Costa Rica" },
        { x: 9600, y: 74.94, value: 4495959, label: "Mexico" },
        { x: 12400, y: 75.7, value: 6914475, label: "Argentina" },
        { x: 14500, y: 75.92, value: 3399237, label: "Uruguay" },
        { x: 16400, y: 71.64, value: 278289, label: "Barbados" },
        { x: 17700, y: 65.63, value: 299697, label: "Bahamas, The" },
        { x: 17700, y: 77.49, value: 3897960, label: "Puerto Rico" },
        { x: 31500, y: 79.96, value: 32507874, label: "Canada" },
        { x: 32100, y: 77.43, value: 89302754, label: "United States" }
      ]
    }
  ]
};

const chart = BubbleChart({
  data,
  custom: {
    layout: ({ title, legends, plot }) =>
      Container({
        padding: EdgeInsets.only({ left: 70, bottom: 50, right: 30, top: 30 }),
        child: Stack({
          children: [
            Positioned({
              top: 0,
              right: 0,
              child: Text("Bubble Chart Example", {
                style: new TextStyle({
                  fontSize: 14,
                  color: "#999999",
                  fontFamily: "Noto Sans JP",
                }),
              }),
            }),
            plot,
          ],
        }),
      }),
    bubble: ({ points, legend }) => {
      const legendIndex = data.datasets.findIndex(d => d.legend === legend);
      const color = defaultColors[legendIndex % defaultColors.length];
      
      return CustomPaint({
        painter: {
          svg: {
            createDefaultSvgEl: (context) => {
              return {
                g: context.createSvgEl("g")
              };
            },
            paint: ({ g }, { width, height }) => {
              points.forEach((pt) => {
                const circle = g.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", pt.x.toString());
                circle.setAttribute("cy", pt.y.toString());
                circle.setAttribute("r", (Math.sqrt(pt.value) / 1000).toString());
                circle.setAttribute("fill", color + "80");
                circle.setAttribute("stroke", color);
                circle.setAttribute("stroke-width", "1");
                g.appendChild(circle);
              });
            },
          },
          canvas: {
            paint: (context, { width, height }) => {
              const ctx = context.canvas;
              points.forEach((pt) => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, Math.sqrt(pt.value) / 1000, 0, Math.PI * 2);
                ctx.fillStyle = color + "80";
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.fill();
                ctx.stroke();
              });
            },
          },
        },
      });
    },
    legend: ({ name }) =>
      Padding({
        padding: EdgeInsets.symmetric({ horizontal: 8 }),
        child: Row({
          mainAxisSize: MainAxisSize.min,
          children: [
            Container({
              width: 12,
              height: 12,
              decoration: new BoxDecoration({
                color: defaultColors[data.datasets.findIndex(d => d.legend === name) % defaultColors.length],
                borderRadius: 6,
              }),
            }),
            SizedBox({ width: 4 }),
            Text(name, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 12,
                color: "#666666",
              }),
            }),
          ],
        }),
      }),
    xAxisLabel: ({ name }) =>
      Padding({
        padding: EdgeInsets.only({ top: 1 }),
        child: Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 10,
            color: "#666666",
          }),
        }),
      }),
    yAxisLabel: ({ name }) =>
      Padding({
        padding: EdgeInsets.only({ right: 1 }),
        child: Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 10,
            color: "#666666",
          }),
        }),
      }),
    xAxisTick: () =>
      Container({
        height: 6,
        width: 1,
        color: "#DDDDDD",
      }),
    yAxisTick: () =>
      Container({
        height: 1,
        width: 6,
        color: "#DDDDDD",
      }),
    xAxisLine: () =>
      Container({
        color: "#BBBBBB",
        width: Infinity,
        height: 1,
      }),
    yAxisLine: () =>
      Container({
        color: "#BBBBBB",
        width: 1,
        height: Infinity,
      }),
    gridXLine: () => Container({ height: 1, color: "#EEEEEE" }),
    gridYLine: () => Container({ width: 1, color: "#EEEEEE" }),
  },
});

export default function App() {
  return <Widget
    width="auto"
    height="500px"
    widget={chart}
    renderer="svg"
  />
}
