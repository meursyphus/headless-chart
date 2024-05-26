import {
  CustomPaint,
  Container,
  Offset,
  Path,
  Rect,
  EdgeInsets,
  Row,
  Text,
  Stack,
  Positioned,
  Column,
  TextStyle,
  MainAxisAlignment,
  SizedBox,
  Border,
  BoxDecoration,
  MainAxisSize,
  Padding,
} from "@meursyphus/flitter";
import { LineChart, type LineChartCustom } from "@meursyphus/headless-chart";

export default LineChart({
  getScale: () => {
    return {
      min: 40,
      max: 85,
      step: 5,
    };
  },
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        legend: "My First dataset",
        values: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  },
  custom: {
    line: Line,
    layout: Layout,
    xAxisLine: () => Container({ color: "#BBBBBB", height: 1 }),
    yAxisLine: () => Container({ color: "#BBBBBB", width: 1 }),
    xAxisTick: () => Container({ color: "#BBBBBB", height: 6, width: 1 }),
    yAxisTick: () => Container({ color: "#BBBBBB", height: 1, width: 6 }),
    gridXLine: () => Container({ color: "#DDDDDD", height: 1 }),
    gridYLine: () => Container({ color: "#DDDDDD", width: 1 }),
    xAxisLabel: XAxisLabel,
    yAxisLabel: YAxisLabel,
    legend: Legend,
  },
});

function Line(...[{ values }, { scale }]: Parameters<LineChartCustom["line"]>) {
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
            const y =
              height - (height * (value - scale.min)) / (scale.max - scale.min);
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
          point.setAttribute("fill", "none");
          point.setAttribute("stroke", "rgb(75, 192, 192)");
          point.setAttribute("stroke-width", "1");
          point.setAttribute("d", pointPath.getD());
        },
      },
    },
  });
}

function Layout(
  ...[{ legends, plot, title }]: Parameters<LineChartCustom["layout"]>
) {
  return Container({
    padding: EdgeInsets.only({ left: 30, bottom: 70 }),
    child: Stack({
      children: [
        Positioned({
          top: 0,
          right: 0,
          child: Text("chartjs 따라하기", {
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
  });
}
function XAxisLabel(...[{ name }]: Parameters<LineChartCustom["xAxisLabel"]>) {
  return Padding({
    padding: EdgeInsets.only({ top: 1 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontSize: 12,
        color: "#666666",
      }),
    }),
  });
}
function YAxisLabel(...[{ name }]: Parameters<LineChartCustom["yAxisLabel"]>) {
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
function Legend(...[{ name }]: Parameters<LineChartCustom["legend"]>) {
  return Row({
    mainAxisAlignment: MainAxisAlignment.center,
    mainAxisSize: MainAxisSize.min,
    children: [
      Container({
        width: 40,
        height: 15,
        decoration: new BoxDecoration({
          color: "#DDDDDD",
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
  });
}
