import { LineChart, type LineChartCustom } from "@meursyphus/headless-chart";
import {
  Text,
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
  VerticalDirection,
  CrossAxisAlignment,
  FractionalTranslation,
  Offset,
  Opacity,
  FractionallySizedBox,
  Alignment,
  Transform,
  CustomPaint,
  Path,
  Rect,
  Size,
  type SvgPaintContext,
  BoxDecoration,
} from "@meursyphus/flitter";
import { IgnoreSize } from "$lib/utils";

const colors = [
  "hsl(268, 70%, 50%)", // japan
  "hsl(54, 70%, 50%)", // france
  "hsl(291, 70%, 50%)", // us
  "hsl(218, 70%, 50%)", // germany
  "hsl(158, 70%, 50%)", // norway
];

export default LineChart({
  data: {
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
        values: [600, 900, 700, 800, 600, 700, 800, 700, 900, 600],
      },
      {
        legend: "german",
        values: [500, 600, 500, 700, 500, 400, 600, 500, 600, 500],
      },
      {
        legend: "us",
        values: [400, 500, 600, 500, 400, 300, 500, 400, 500, 400],
      },
      {
        legend: "france",
        values: [300, 400, 300, 400, 300, 400, 300, 200, 400, 300],
      },
      {
        legend: "japan",
        values: [200, 300, 200, 300, 200, 100, 200, 100, 300, 200],
      },
    ],
  },
  custom: {
    layout: Layout,
    xAxisLabel: XAxisLabel,
    yAxisLabel: YAxisLabel,
    yAxisTick: YAxisTick,
    xAxisTick: XAxisTick,
    legend: Legend,
    xAxisLine: SizedBox.shrink,
    yAxisLine: () => Container({ color: "#DDDDDD", width: 1 }),
    gridXLine: () => Container({ color: "#DDDDDD", height: 1 }),
    gridYLine: () => Container({ color: "#DDDDDD", width: 1 }),
    line: Line,
  },
});

function Layout(
  ...[{ legends, plot, title }]: Parameters<LineChartCustom["layout"]>
) {
  return Container({
    padding: EdgeInsets.only({ top: 50, left: 50, bottom: 70 }),
    child: Stack({
      children: [
        Positioned({
          bottom: -44,
          left: 0,
          right: 90,
          child: Row({
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text("transportation", {
                style: new TextStyle({
                  fontSize: 14,
                  color: "#666666",
                  fontFamily: "Noto Sans JP",
                }),
              }),
            ],
          }),
        }),
        Positioned({
          left: -58,
          top: 30,
          bottom: 0,
          child: Column({
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Transform.rotate({
                angle: -Math.PI / 2,
                child: Text("count", {
                  style: new TextStyle({
                    fontSize: 14,
                    color: "#666666",
                    fontFamily: "Noto Sans JP",
                  }),
                }),
              }),
            ],
          }),
        }),
        Positioned({
          top: -20,
          right: 80,
          child: Text("nivo 따라하기 ^^", {
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
            Column({
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: legends,
            }),
          ],
        }),
      ],
    }),
  });
}
function XAxisLabel(...[{ name }]: Parameters<LineChartCustom["xAxisLabel"]>) {
  return Column({
    mainAxisSize: MainAxisSize.min,
    children: [
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
function YAxisLabel(...[{ name }]: Parameters<LineChartCustom["yAxisLabel"]>) {
  return Padding({
    padding: EdgeInsets.only({ right: 4 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontSize: 12,
        color: "#666666",
      }),
    }),
  });
}
function XAxisTick(...[,]: Parameters<LineChartCustom["xAxisTick"]>) {
  return Container({
    width: 2,
    height: 6,
    color: "#BBBBBB",
  });
}
function YAxisTick(...[_]: Parameters<LineChartCustom["yAxisTick"]>) {
  return Container({
    height: 2,
    width: 6,
    color: "#BBBBBB",
  });
}
function Legend(...[{ name, index }]: Parameters<LineChartCustom["legend"]>) {
  return Padding({
    padding: EdgeInsets.only({ top: 2 }),
    child: Row({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container({
          width: 20,
          height: 20,
          decoration: new BoxDecoration({
            shape: "circle",
            color: colors[index],
          }),
        }),
        SizedBox({ width: 8 }),
        Text(name, {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 12,
            color: "#777777",
          }),
        }),
      ],
    }),
  });
}

function Line(
  ...[{ values, index }, { scale }]: Parameters<LineChartCustom["line"]>
) {
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
              Rect.fromCircle({ center: new Offset(point), radius: 5 })
            );
          });

          line.setAttribute("fill", "none");
          line.setAttribute("stroke", colors[index]);
          line.setAttribute("stroke-width", "2");
          line.setAttribute("d", linePath.getD());
          point.setAttribute("fill", "white");
          point.setAttribute("stroke", colors[index]);
          point.setAttribute("stroke-width", "1");
          point.setAttribute("d", pointPath.getD());
        },
      },
    },
  });
}
