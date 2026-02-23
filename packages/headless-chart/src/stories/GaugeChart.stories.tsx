import type { Meta, StoryObj } from "@storybook/react-vite";
import { GaugeChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Specialized/GaugeChart",
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="CPU Usage"
      description="Inspired by Toast"
      widget={GaugeChart({
        data: {
          value: 72,
          min: 0,
          max: 100,
          title: "CPU Usage",
          zones: [
            { min: 0, max: 50, color: "#00bd9f" },
            { min: 50, max: 80, color: "#ffb840" },
            { min: 80, max: 100, color: "#ff5a46" },
          ],
        },
        custom: {
          layout: ({ gauge, valueLabel }: any) =>
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
                  gauge,
                ],
              }),
            }),
          title: ({ name }: any) =>
            Text(name, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 14,
                fontWeight: "500",
                color: "#333333",
              }),
            }),
          valueLabel: ({ value }: any) =>
            Text(`${value}%`, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 24,
                fontWeight: "700",
                color: "#333333",
              }),
            }),
        },
      })}
    />
  ),
};

export const HighValue: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Memory Usage"
      description="Inspired by Toast"
      widget={GaugeChart({
        data: {
          value: 92,
          min: 0,
          max: 100,
          title: "Memory Usage",
          zones: [
            { min: 0, max: 50, color: "#00bd9f" },
            { min: 50, max: 80, color: "#ffb840" },
            { min: 80, max: 100, color: "#ff5a46" },
          ],
        },
        custom: {
          layout: ({ gauge, valueLabel }: any) =>
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
                  gauge,
                ],
              }),
            }),
          title: ({ name }: any) =>
            Text(name, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 14,
                fontWeight: "500",
                color: "#333333",
              }),
            }),
          valueLabel: ({ value }: any) =>
            Text(`${value}%`, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 24,
                fontWeight: "700",
                color: "#ff5a46",
              }),
            }),
        },
      })}
    />
  ),
};
