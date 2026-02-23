import type { Meta, StoryObj } from "@storybook/react-vite";
import { FunnelChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Specialized/FunnelChart",
};
export default meta;

const data = {
  stages: [
    { label: "Visitors", value: 10000 },
    { label: "Leads", value: 5000 },
    { label: "Qualified", value: 2500 },
    { label: "Proposals", value: 1200 },
    { label: "Closed", value: 600 },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Sales Funnel"
      description="Inspired by Toast"
      widget={FunnelChart({
        data,
        custom: {
          layout: ({ funnel }: any) =>
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
                  funnel,
                ],
              }),
            }),
          stageLabel: ({ label }: any) =>
            Text(label, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 12,
                color: "#333333",
              }),
            }),
          dataLabel: ({ value, percentage }: any) =>
            Text(`${value.toLocaleString()} (${percentage.toFixed(0)}%)`, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 11,
                color: "#666666",
              }),
            }),
        },
      })}
    />
  ),
};
