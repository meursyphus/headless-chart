import ReactWidget from "@meursyphus/flitter-react";
import { BarChart as HeadlessBarChart} from "@meursyphus/headless-chart";
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
  Positioned
} from "@meursyphus/flitter";
import {useEffect, useState} from 'react';
const BarChart =() => {

  const [barChart, setBarChart] = useState<any>();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets:[
      {
        legend: "온도",
        values: [2, 5, 11, 19, 24, 27, 30, 30, 26, 20, 12, 5],
      },
    ],
  };

  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];
  
  const borderColors = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  const chartInstance = HeadlessBarChart({
    data,
    custom: {
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
      bar: (...[{ label }]) => {
        const index = data.labels.indexOf(label);
        const backgroundColor = backgroundColors[index];
        const borderSide = new BorderSide({
          color: borderColors[index],
          width: 1,
        });
        return Container({
          width: Infinity,
          margin: EdgeInsets.symmetric({ horizontal: 8 }),
          height: Infinity,
          decoration: new BoxDecoration({
            color: backgroundColor,
            border: new Border({
              left: borderSide,
              right: borderSide,
              top: borderSide,
            }),
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
      legend: (...[{ name }]) => Row({
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
      }),
      gridXLine: () => Container({ height: 1, color: "#EEEEEE" }),
      gridYLine: () => Container({ width: 1, color: "#EEEEEE" }),
    },
  });

  useEffect(() => {
    setBarChart(chartInstance);
  },[])

  return (
    <div>
      <h1>Headless 막대 차트</h1>
      {barChart && (
        <ReactWidget
          width="600px"
          height="400px"
          widget={barChart}
          renderer="canvas"
        />
      )}
    </div>
  );
}

export default BarChart;
