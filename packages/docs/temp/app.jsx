import Widget from "@meursyphus/flitter-react";
import { BarChart } from "@meursyphus/headless-chart";
import {
  Text,
  Border,
  BorderSide,
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
  Flex,
  Axis,
  Alignment,
  FractionallySizedBox,
  FractionalTranslation,
  Transform,
  CrossAxisAlignment,
  Offset,
  Matrix4,
  BorderRadius,
} from "@meursyphus/flitter";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      legend: "Fully Rounded",
      values: [120, -50, 70, -80, 100, 40, -30],
    },
    {
      legend: "Small Rounded",
      values: [50, -40, 60, 70, 50, -50, 30],
    },
  ],
};

const backgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)"
];
const borderColors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)"
];

const chart = BarChart({
  data,
  custom: {
    barGroup: (...[{ bars, values }, { scale }]) => {
      const total = scale.max - scale.min;
      const zeroPosition = -scale.min / total;
      const ratios = values.map((value) => Math.abs(value) / total);
      const translation = 0 - zeroPosition

      return Container({
        width: Infinity,
        height: Infinity,
        child: FractionalTranslation({
          translation: { x: 0, y: translation },
          child: Flex({
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            direction: Axis.horizontal,
            children: bars.map((bar, index) => {
              const isNegative = values[index] < 0;

              return FractionallySizedBox({
                heightFactor: ratios[index],
                alignment: isNegative ? Alignment.topCenter : Alignment.bottomCenter,
                child: Padding({
                  padding: EdgeInsets.symmetric({ horizontal: 2 }),
                  child: isNegative 
                  ?
                  FractionalTranslation({
                    translation: { x: 0, y: 1 },
                    child: Transform({transform: Matrix4.diagonal3Values(1, -1, 1), child: bar})
                  })
                  : bar
                })
              });
            })
          })
        })
      });
    },
    layout: (...[{ legends, plot }]) => 
      Container({
        padding: EdgeInsets.only({ left: 30, bottom: 70 }),
        child: Stack({
          children: [
            Positioned({
              top: 0,
              right: 0,
              child: Text("Inspired by Chart.js", {
                style: new TextStyle({
                  fontSize: 14,
                  color: "#999999",
                  fontFamily: "Noto Sans JP",
                }),
              }),
            }),
            Column({
              children: [
                Row({
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [...legends, SizedBox({ width: 30 })],
                }),
                SizedBox({ height: 5 }),
                plot,
              ],
            }),
          ],
        }),
      }),
    bar: (...[{ label, legend }]) => {
      const index = data.datasets.findIndex((dataset) => dataset.legend === legend);
      const backgroundColor = backgroundColors[index];
      return Container({
        width: 30,
        decoration: new BoxDecoration({
          color: backgroundColor,
          borderRadius: index === 0 ? BorderRadius.circular(15) : BorderRadius.circular(5),
          border: Border.all({ color: borderColors[index], width: 2 }),
        }),
      });
    },
    xAxisLabel: (...[{ name }]) => Padding({
      padding: EdgeInsets.only({ top: 1 }),
      child: Text(name, {
        style: new TextStyle({
          fontFamily: "Noto Sans JP",
          fontSize: 12,
          color: "#666666",
        }),
      }),
    }),
    yAxisLabel: (...[{ name }]) => Padding({
      padding: EdgeInsets.only({ right: 1 }),
      child: Text(name, {
        style: new TextStyle({
          fontFamily: "Noto Sans JP",
          fontSize: 12,
          color: "#666666",
        }),
      }),
    }),
    xAxisTick: () => Container({
      height: 6,
      width: 1,
      color: "#DDDDDD",
    }),
    yAxisTick: () => Container({
      height: 1,
      width: 6,
      color: "#DDDDDD",
    }),
    yAxisLine: () => Container({
      color: "#BBBBBB",
      width: 1,
      height: Infinity,
    }),
    xAxisLine: () => Container({
      color: "#BBBBBB",
      height: 1,
      width: Infinity,
    }),
    legend: (...[{ name, index }]) => 
      Padding({
        padding: EdgeInsets.only({ left: index === 0 ? 0 : 10 }),
        child: Row({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container({
          width: 36,
          height: 12,
          decoration: new BoxDecoration({
            color: backgroundColors[index],
            border: Border.all({ color: borderColors[index] }),
          }),
        }),
        SizedBox({ width: 5 }),
        Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 14,
            color: "#666666",
          }),
        }),
      ],
    })
  }),
    gridXLine: () => Container({ height: 1, color: "#EEEEEE" }),
    gridYLine: () => Container({ width: 1, color: "#EEEEEE" }),
  },
});

export default function App() {
  return (
    <Widget
      width="auto"
      height="400px"
      widget={chart}
      renderer="svg"
    />
  );
}