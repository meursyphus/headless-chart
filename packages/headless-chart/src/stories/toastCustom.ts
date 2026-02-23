import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Padding,
  Stack,
  Positioned,
  SizedBox,
  Row,
  Flexible,
  BoxDecoration,
} from "@meursyphus/flitter";

export const toastColors = [
  "#00a9ff",
  "#ffb840",
  "#ff5a46",
  "#00bd9f",
  "#785fff",
  "#f28b8c",
  "#989486",
  "#516f7d",
  "#28e6eb",
  "#28695f",
];

export function toastLayout({ plot }: { plot: any; [key: string]: any }) {
  return Container({
    padding: EdgeInsets.only({ left: 60, bottom: 40, top: 30, right: 20 }),
    child: Stack({
      children: [
        Positioned({
          top: 0,
          right: 0,
          child: Text("Inspired by Toast", {
            style: new TextStyle({
              fontSize: 13,
              color: "#999999",
              fontFamily: "Noto Sans JP",
            }),
          }),
        }),
        Row({
          children: [
            Flexible({ flex: 1, child: plot }),
            SizedBox({ width: 10 }),
          ],
        }),
      ],
    }),
  });
}

export function toastXAxisLabel({ name }: { name: string }) {
  return Padding({
    padding: EdgeInsets.only({ top: 1 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontSize: 11,
        color: "#666666",
      }),
    }),
  });
}

export function toastYAxisLabel({ name }: { name: string }) {
  return Padding({
    padding: EdgeInsets.only({ right: 1 }),
    child: Text(name, {
      style: new TextStyle({
        fontFamily: "Noto Sans JP",
        fontSize: 11,
        color: "#666666",
      }),
    }),
  });
}

export function toastXAxisTick() {
  return Container({ height: 6, width: 1, color: "#BBBBBB" });
}

export function toastYAxisTick() {
  return Container({ height: 1, width: 6, color: "#BBBBBB" });
}

export function toastXAxisLine() {
  return Container({ color: "#BBBBBB", height: 1, width: Infinity });
}

export function toastYAxisLine() {
  return Container({ color: "#BBBBBB", width: 1, height: Infinity });
}

export function toastGridXLine() {
  return Container({ height: 1, color: "#EEEEEE" });
}

export function toastGridYLine() {
  return Container({ width: 1, color: "#EEEEEE" });
}

export function toastLegend() {
  return SizedBox.shrink();
}

/** Common cartesian chart custom props (Toast style) */
export const cartesianToastCustom = {
  layout: toastLayout,
  xAxisLabel: toastXAxisLabel,
  yAxisLabel: toastYAxisLabel,
  xAxisTick: toastXAxisTick,
  yAxisTick: toastYAxisTick,
  xAxisLine: toastXAxisLine,
  yAxisLine: toastYAxisLine,
  gridXLine: toastGridXLine,
  gridYLine: toastGridYLine,
  legend: toastLegend,
};
