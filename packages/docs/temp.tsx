    import Widget from "@meursyphus/flitter-react";
    import { HeatmapChart } from "@meursyphus/headless-chart";
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


    const chart = HeatmapChart({
      data: {
        values: [
                  [-3.5, -1.1, 4.0, 11.3, 17.5, 21.5, 24.9, 25.2, 20.4, 13.9, 6.6, -0.6],
          [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.4, 3.7],
          [22.1, 22.0, 20.9, 18.3, 15.2, 12.8, 11.8, 13.0, 15.2, 17.6, 19.4, 21.2],
          [-10.3, -9.1, -4.1, 4.4, 12.2, 16.3, 18.5, 16.7, 10.9, 4.2, -2.0, -7.5],
          [-13.2, -13.7, -13.1, -10.3, -6.1, -3.2, 0.0, -0.1, -1.8, -4.5, -9.0, -10.9],
        ],
        xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        yLabels: ['Seoul', 'Seattle', 'Sydney', 'Moscow', 'Jungfrau'],
      },
      custom: {
        layout: ({ plot }) =>
          Container({
            padding: EdgeInsets.only({ left: 70, bottom: 30 }),
            child: Stack({
              children: [
                Positioned({
                  top: 0,
                  right: 0,
                  child: Text("Inspired by Toast", {
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
        xAxisLabel: ({ name }) =>
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
        yAxisLabel: ({ name }) =>
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
        // xAxis: ({ line, labels, tick }) => {
        //   return new AnimatedXAxis({ line, labels, tick });
        // },
        // yAxis: ({ line, labels, tick }) => {
        //   return new AnimatedYAxis({ line, labels, tick });
        // }
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
      },
    });

    export default function App() {
      return <Widget
        width="auto"
        height="400px"
        widget={chart}
        renderer="svg"
      />
    }