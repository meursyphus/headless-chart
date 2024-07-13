import { BarChart, type BarChartCustom } from "@meursyphus/headless-chart";
import {
  Text,
  Border,
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
  Flexible,
  Stack,
  Positioned,
  FractionalTranslation,
  Offset,
  CustomPaint,
} from "@meursyphus/flitter";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "black",
];
const data = {
  labels: [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ],
  datasets: [
    {
      legend: "",
      values: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
    },
  ],
};

export default BarChart({
  data,
  getScale(data) {
    return {
      min: 0,
      max: 4000,
      step: 1000,
    };
  },
  custom: {
    layout: Layout,
    bar: Bar,
    xAxisLabel: XAxisLabel,
    yAxisLabel: YAxisLabel,
    xAxisTick: () => SizedBox.shrink(),
    legend: Legend,
    gridXLine: () => Container({ height: 1, color: "#DDDDDD" }),
    gridYLine: () => Container({ width: 1, color: "#DDDDDD" }),
  },
});

function Layout(
  ...[{ legends, plot, title }]: Parameters<BarChartCustom["layout"]>
) {
  return Container({
    padding: EdgeInsets.only({ left: 30, bottom: 70 }),
    child: Stack({
      children: [
        Positioned({
          top: 0,
          right: 0,
          child: Text("made by flitter", {
            style: new TextStyle({
              fontSize: 14,
              color: "#999999",
              fontFamily: "Noto Sans JP",
            }),
          }),
        }),
        Padding({
          padding: EdgeInsets.only({ top: 20, left: 30 }),
          child: plot,
        }),
      ],
    }),
  });
}
function XAxisLabel(...[{ name }]: Parameters<BarChartCustom["xAxisLabel"]>) {
  return Column({
    mainAxisSize: MainAxisSize.min,
    children: [
      Container({
        width: 1,
        height: 6,
        color: "black",
      }),
      Text(name, {
        style: new TextStyle({
          fontFamily: "Noto Sans JP",
          fontSize: 12,
          color: "#666666",
        }),
      }),
    ],
  });
}
function YAxisLabel(...[{ name }]: Parameters<BarChartCustom["yAxisLabel"]>) {
  return Padding({
    padding: EdgeInsets.only({ right: 1 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontSize: 12,
        color: "#666666",
      }),
    }),
  });
}
function Legend(...[{ name }]: Parameters<BarChartCustom["legend"]>) {
  return Row({
    mainAxisAlignment: MainAxisAlignment.center,
    mainAxisSize: MainAxisSize.min,
    children: [
      Container({
        width: 36,
        height: 12,
        decoration: new BoxDecoration({
          color: "rgba(255, 99, 132, 0.2)",
          border: Border.all({ color: "rgb(255, 99, 132)" }),
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
  });
}
function Bar(...[{ label, value }]: Parameters<BarChartCustom["bar"]>) {
  const index = data.labels.indexOf(label);
  const color = colors[index];
  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
  };
  return Stack({
    children: [
      Positioned({
        top: 0,
        left: 0,
        right: 0,
        child: FractionalTranslation({
          translation: new Offset({ x: 0, y: -1 }),
          child: Row({
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(`${value}`, {
                style: new TextStyle({
                  fontSize: 14,
                  color,
                }),
              }),
            ],
          }),
        }),
      }),
      Container({
        width: Infinity,
        height: Infinity,
        margin: EdgeInsets.symmetric({ horizontal: 5 }),
        child: CustomPaint({
          painter: {
            svg: {
              createDefaultSvgEl(context) {
                return {
                  bar: context.createSvgEl("path"),
                };
              },
              paint({ bar }, { width, height }) {
                bar.setAttribute("fill", color);
                bar.setAttribute("d", getPath(0, 0, width, height));
              },
            },
          },
        }),
      }),
    ],
  });
}
