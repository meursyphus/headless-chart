
    import Widget from "@meursyphus/flitter-react";
    import { LineChart } from "@meursyphus/headless-chart";
    import {
      Text,
      Border,
      CustomPaint,
      Path,
      Rect,
      Offset,
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

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: "My First Dataset",
          values: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    const chart = LineChart({
      data,
      getScale: () => ({
        min: 40,
        max: 85,
        step: 5,
      }),
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
        line: (...[{ values }, { scale }]) => {
          return CustomPaint({
            painter: {
              svg: {
                createDefaultSvgEl(context) {
                  return {
                    line: context.createSvgEl("path"),
                    point: context.createSvgEl("path"),
                  };
                },
                paint({ line, point }, { height, width }) {
                  const linePath = new Path();
                  const pointPath = new Path();
                  const points = values.map((value, index) => {
                    const y = height - (height * (value - scale.min)) / (scale.max - scale.min);
                    const x = (index * width) / (values.length - 1);
                    return { x, y };
                  });

                  linePath.moveTo(points[0]);
                  points.slice(1).forEach((point) => {
                    linePath.lineTo(point);
                  });

                  points.forEach((point) => {
                    pointPath.addOval(
                      Rect.fromCircle({ center: new Offset(point), radius: 3 })
                    );
                  });

                  line.setAttribute("fill", "none");
                  line.setAttribute("stroke", "rgb(75, 192, 192)");
                  line.setAttribute("stroke-width", "3");
                  line.setAttribute("d", linePath.getD());
                  point.setAttribute("fill", "white");
                  point.setAttribute("stroke", "rgb(75, 192, 192)");
                  point.setAttribute("stroke-width", "2");
                  point.setAttribute("d", pointPath.getD());
                },
              },
            },
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
          color: "#BBBBBB",
        }),
        yAxisTick: () => Container({
          height: 1,
          width: 6,
          color: "#BBBBBB",
        }),
        yAxisLine: () => Container({
          color: "#BBBBBB",
          width: 1,
        }),
        xAxisLine: () => Container({
          color: "#BBBBBB",
          height: 1,
        }),
        legend: (...[{ name }]) => Row({
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Container({
              width: 40,
              height: 15,
              decoration: new BoxDecoration({
                color: "#FFFFFF",
                border: Border.all({ color: "rgb(75, 192, 192)", width: 3 }),
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
        gridXLine: () => Container({ height: 1, color: "#DDDDDD" }),
        gridYLine: () => Container({ width: 1, color: "#DDDDDD" }),
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