import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreemapChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
  BoxDecoration,
  Alignment,
  Column,
  MainAxisAlignment,
  CrossAxisAlignment,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Specialized/TreemapChart",
};
export default meta;

const data = {
  nodes: [
    { label: "Documents", value: 45 },
    { label: "Photos", value: 30 },
    { label: "Videos", value: 25 },
    { label: "Music", value: 15 },
    { label: "Downloads", value: 12 },
    { label: "Apps", value: 10 },
    { label: "Cache", value: 8 },
    { label: "Other", value: 5 },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Disk Usage"
      description="Inspired by Toast"
      widget={TreemapChart({
        data,
        custom: {
          layout: ({ treemap }: any) =>
            Container({
              padding: EdgeInsets.all(20),
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
                  treemap,
                ],
              }),
            }),
          node: ({ label, value, color }: any) =>
            Container({
              decoration: new BoxDecoration({
                color: color,
              }),
              alignment: Alignment.center,
              child: Column({
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(label, {
                    style: new TextStyle({
                      fontFamily: "Noto Sans JP",
                      fontSize: 11,
                      fontWeight: "500",
                      color: "#ffffff",
                    }),
                  }),
                  Text(`${value}GB`, {
                    style: new TextStyle({
                      fontFamily: "Noto Sans JP",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.8)",
                    }),
                  }),
                ],
              }),
            }),
        },
        colors: toastColors,
      })}
    />
  ),
};
