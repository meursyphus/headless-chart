import { BarChart, type BarChartCustom } from "@meursyphus/headless-chart";
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
  Flexible,
  Stack,
  Positioned,
  CrossAxisAlignment,
  BorderRadius,
  Radius,
  Alignment,
  FractionalTranslation,
  BoxShadow,
} from "@meursyphus/flitter";
const data = {
  labels: ["Africa", "America", "Asia", "Europe"],
  datasets: [
    {
      legend: "Year 1990",
      values: [631, 727, 3292, 721],
    },
    {
      legend: "Year 2000",
      values: [814, 841, 3714, 726],
    },
    {
      legend: "Year 2018",
      values: [1276, 1007, 4561, 746],
    },
  ],
};
const backgroundColors = [
  "rgb(44,175,254)",
  "rgb(84,79,197)",
  "rgb(0,226,114)",
];

export default BarChart({
  data,
  direction: "horizontal",
  custom: {
    layout: Layout,
    xAxisLabel: XAxisLabel,
    yAxisLabel: YAxisLabel,
    xAxisLine: xAxisLine,
    yAxisTick: () => SizedBox.shrink(),
    xAxisTick: () => SizedBox.shrink(),
    legend: Legend,
    yAxisLine: () => SizedBox.shrink(),
    bar: Bar,
    gridYLine: () => SizedBox.shrink(),
    gridXLine: () => Container({ height: 1, color: "#DDDDDD" }),
  },
});

function Layout(
  ...[{ legends, plot, title }]: Parameters<BarChartCustom["layout"]>
) {
  return Container({
    padding: EdgeInsets.only({ left: 60, bottom: 70, right: 60 }),
    child: Stack({
      children: [
        Positioned({
          top: 20,
          right: 0,
          child: Text("highchart 따라하기 :)", {
            style: new TextStyle({
              fontSize: 14,
              color: "#999999",
              fontFamily: "Noto Sans JP",
            }),
          }),
        }),
        Positioned({
          top: 0,
          left: -60,
          child: Column({
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text("Historic World Population by Region", {
                style: new TextStyle({
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Noto Sans JP",
                }),
              }),
              Text("Source: Wikipedia.org", {
                style: new TextStyle({
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#666666",
                  fontFamily: "Noto Sans JP",
                }),
              }),
            ],
          }),
        }),
        Padding({
          padding: EdgeInsets.only({ top: 60 }),
          child: plot,
        }),
        Positioned({
          top: 90,
          right: 40,
          child: Container({
            padding: EdgeInsets.symmetric({ horizontal: 10, vertical: 8 }),
            decoration: new BoxDecoration({
              color: "white",
              boxShadow: [
                new BoxShadow({
                  color: "black",
                  offset: { x: 0, y: 0 },
                  blurRadius: 2,
                }),
              ],
            }),
            child: Column({
              mainAxisSize: MainAxisSize.min,
              children: legends,
            }),
          }),
        }),
      ],
    }),
  });
}
function XAxisLabel(...[{ name }]: Parameters<BarChartCustom["xAxisLabel"]>) {
  return Padding({
    padding: EdgeInsets.only({ top: 10 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontWeight: "600",
        fontSize: 14,
        color: "#333333",
      }),
    }),
  });
}
function YAxisLabel(...[{ name }]: Parameters<BarChartCustom["yAxisLabel"]>) {
  return Padding({
    padding: EdgeInsets.only({ right: 10 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontWeight: "600",
        fontSize: 14,
        color: "#333333",
      }),
    }),
  });
}
function xAxisLine(...[,]: Parameters<BarChartCustom["xAxisLine"]>) {
  return Container({
    color: "#BBBBBB",
    height: 1,
    width: Infinity,
  });
}
function Legend(...[{ name, index }]: Parameters<BarChartCustom["legend"]>) {
  return Padding({
    padding: EdgeInsets.symmetric({ vertical: 2 }),
    child: Row({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container({
          width: 12,
          height: 12,
          decoration: new BoxDecoration({
            shape: "circle",
            color: backgroundColors[index],
          }),
        }),
        SizedBox({ width: 8 }),
        Text(name, {
          style: new TextStyle({
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: "500",
            color: "#111111",
          }),
        }),
      ],
    }),
  });
}
function Bar(
  ...[{ legend, value }, { data }]: Parameters<BarChartCustom["bar"]>
) {
  const index = data.datasets.findIndex((d) => d.legend === legend);
  const backgroundColor = backgroundColors[index];
  return Container({
    width: Infinity,
    height: 14,
    alignment: Alignment.centerRight,
    decoration: new BoxDecoration({
      color: backgroundColor,
      borderRadius: BorderRadius.only({
        topRight: Radius.circular(7),
        bottomRight: Radius.circular(7),
      }),
    }),
    child: FractionalTranslation({
      translation: { x: 1, y: 0 },
      child: Padding({
        padding: EdgeInsets.only({ left: 6 }),
        child: Text(value.toLocaleString("ko-KR").replace(",", " "), {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 12,
            fontWeight: "bold",
          }),
        }),
      }),
    }),
  });
}
