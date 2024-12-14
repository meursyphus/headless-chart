import Widget from "@meursyphus/flitter-react";
import { ScatterChart } from "@meursyphus/headless-chart";
import {
  Text,
  BoxDecoration,
  Container,
  EdgeInsets,
  Row,
  SizedBox,
  TextStyle,
  Padding,
  MainAxisSize,
  Stack,
  Positioned,
} from "@meursyphus/flitter";

import defaultColors from "./colors";
import Scatter from "./scatter";
import YAxis from "./yAxis";
import XAxis from "./xAxis";

const data = {
  datasets: [
    {
      legend: 'Africa',
      data: [
        { x: 4200, y: 70.35, label: 'Morocco' },
        { x: 4200, y: 70.71, label: 'Egypt' },
        { x: 5900, y: 56.46, label: 'Gabon' },
        { x: 6600, y: 72.74, label: 'Algeria' },
        { x: 6700, y: 76.28, label: 'Libya' },
        { x: 7100, y: 74.66, label: 'Tunisia' },
        { x: 10500, y: 69.28, label: 'Trinidad and Tobago' },
        { x: 12800, y: 72.09, label: 'Mauritius' },
        { x: 18200, y: 78.68, label: 'Malta' }
      ]
    },
    {
      legend: 'America',
      data: [
        { x: 4800, y: 74.64, label: 'Paraguay' },
        { x: 4900, y: 70.92, label: 'El Salvador' },
        { x: 5600, y: 69.22, label: 'Peru' },
        { x: 5800, y: 74.06, label: 'Venezuela' },
        { x: 6300, y: 67.63, label: 'Dominican Republic' },
        { x: 6500, y: 67.43, label: 'Belize' },
        { x: 6600, y: 71.43, label: 'Colombia' },
        { x: 6900, y: 72.14, label: 'Panama' },
        { x: 8100, y: 71.41, label: 'Brazil' },
        { x: 9600, y: 76.63, label: 'Costa Rica' },
        { x: 9600, y: 74.94, label: 'Mexico' },
        { x: 12400, y: 75.7, label: 'Argentina' },
        { x: 14500, y: 75.92, label: 'Uruguay' },
        { x: 16400, y: 71.64, label: 'Barbados' },
        { x: 17700, y: 65.63, label: 'Bahamas, The' },
        { x: 17700, y: 77.49, label: 'Puerto Rico' },
        { x: 31500, y: 79.96, label: 'Canada' },
        { x: 32100, y: 77.43, label: 'United States' }
      ]
    },
    {
      legend: 'Asia',
      data: [
        { x: 5600, y: 71.96, label: 'China' },
        { x: 5700, y: 61.29, label: 'Turkmenistan' },
        { x: 7700, y: 69.66, label: 'Iran' },
        { x: 7800, y: 66.07, label: 'Kazakhstan' },
        { x: 8100, y: 71.41, label: 'Thailand' },
        { x: 9700, y: 71.95, label: 'Malaysia' },
        { x: 12000, y: 75.23, label: 'Saudi Arabia' },
        { x: 13100, y: 72.85, label: 'Oman' },
        { x: 19200, y: 75.58, label: 'Korea, South' },
        { x: 19200, y: 73.98, label: 'Bahrain' },
        { x: 20800, y: 79.17, label: 'Israel' },
        { x: 21300, y: 76.84, label: 'Kuwait' },
        { x: 23200, y: 73.4, label: 'Qatar' },
        { x: 25200, y: 74.99, label: 'United Arab Emirates' },
        { x: 25300, y: 77.06, label: 'Taiwan' },
        { x: 27800, y: 81.53, label: 'Singapore' },
        { x: 29400, y: 81.04, label: 'Japan' },
        { x: 34200, y: 81.39, label: 'Hong Kong' }
      ]
    },
    {
      legend: 'Europe',
      data: [
        { x: 7700, y: 71.12, label: 'Romania' },
        { x: 8200, y: 71.75, label: 'Bulgaria' },
        { x: 9800, y: 66.39, label: 'Russia' },
        { x: 10700, y: 76.38, label: 'Chile' },
        { x: 11200, y: 74.14, label: 'Croatia' },
        { x: 11500, y: 70.86, label: 'Latvia' },
        { x: 12000, y: 74.16, label: 'Poland' },
        { x: 12500, y: 73.46, label: 'Lithuania' },
        { x: 14300, y: 71.38, label: 'Estonia' },
        { x: 14500, y: 74.19, label: 'Slovakia' },
        { x: 14900, y: 72.25, label: 'Hungary' },
        { x: 16800, y: 75.78, label: 'Czech Republic' },
        { x: 17900, y: 77.35, label: 'Portugal' },
        { x: 19600, y: 75.93, label: 'Slovenia' },
        { x: 21300, y: 78.94, label: 'Greece' },
        { x: 23300, y: 79.37, label: 'Spain' },
        { x: 27700, y: 79.54, label: 'Italy' },
        { x: 28400, y: 80.3, label: 'Sweden' },
        { x: 28700, y: 78.54, label: 'Germany' },
        { x: 28700, y: 79.44, label: 'France' },
        { x: 29000, y: 78.24, label: 'Finland' },
        { x: 29500, y: 78.68, label: 'Netherlands' },
        { x: 29600, y: 78.27, label: 'United Kingdom' },
        { x: 30600, y: 78.44, label: 'Belgium' },
        { x: 31300, y: 78.87, label: 'Austria' },
        { x: 31900, y: 77.36, label: 'Ireland' },
        { x: 31900, y: 80.18, label: 'Iceland' },
        { x: 32200, y: 77.44, label: 'Denmark' },
        { x: 33800, y: 80.31, label: 'Switzerland' }
      ]
    },
    {
      legend: 'Oceania',
      data: [
        { x: 2200, y: 64.56, label: 'Papua New Guinea' },
        { x: 2700, y: 61.32, label: 'Kiribati' },
        { x: 5900, y: 69.2, label: 'Fiji' },
        { x: 14500, y: 78.75, label: 'Virgin Islands' },
        { x: 23200, y: 78.49, label: 'New Zealand' },
        { x: 30700, y: 80.26, label: 'Australia' }
      ]
    }
  ]
};

// 숫자를 k단위로 줄여주는 함수
function formatNumberToK(num) {
  if (num >= 1000) {
    const kValue = (num / 1000).toFixed(1).replace(/\.0$/, "");
    return kValue + "k";
  }
  return num.toString();
}

const chart = ScatterChart({
  data,
  custom: {
    layout: ({ title, legends, plot }) =>
      Container({
        padding: EdgeInsets.only({ left: 70, bottom: 50, right: 30, top: 30 }),
        child: Stack({
          children: [
            Positioned({
              top: -20,
              right: 0,
              child: Text("Toast Chart Example", {
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

    xAxis: ({ line, labels, tick }) => {
      // AnimatedXAxis 사용
      return new XAxis({ line, labels, tick });
    },
    yAxis: ({ line, labels, tick }) => {
      return new YAxis({ line, labels, tick });
    },

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

    legend: ({ name }) => {
      const legendIndex = data.datasets.findIndex(d => d.legend === name);
      const color = defaultColors[legendIndex % defaultColors.length];
      return Padding({
        padding: EdgeInsets.symmetric({ horizontal: 8 }),
        child: Row({
          mainAxisSize: MainAxisSize.min,
          children: [
            Container({
              width: 12,
              height: 12,
              decoration: new BoxDecoration({
                color: color,
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
      });
    },

    scatter: ({  label, legend, index }, { scale }) => {
      const legendIndex = index;
      return new Scatter({ label, legend, index, scale, });
    },

    dataLabel: () => SizedBox.shrink(),

    gridXLine: () => Container({ height: 1, color: "#EEEEEE" }),
    gridYLine: () => Container({ width: 1, color: "#EEEEEE" }),

    xAxisLabel: ({ name }) =>
      Padding({
        padding: EdgeInsets.only({ top: 1 }),
        child: Text(formatNumberToK(parseFloat(name)), {
          style: new TextStyle({
            fontFamily: "Noto Sans JP",
            fontSize: 10,
            color: "#666666",
          }),
        }),
      }),
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