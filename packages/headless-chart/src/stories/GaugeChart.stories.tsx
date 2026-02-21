import type { Meta, StoryObj } from "@storybook/react-vite";
import { GaugeChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Specialized/GaugeChart",
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      widget={GaugeChart({
        data: {
          value: 72,
          min: 0,
          max: 100,
          title: "CPU Usage",
          zones: [
            { min: 0, max: 50, color: "#4CAF50" },
            { min: 50, max: 80, color: "#FF9800" },
            { min: 80, max: 100, color: "#F44336" },
          ],
        },
      })}
    />
  ),
};

export const HighValue: StoryObj = {
  render: () => (
    <ChartWrapper
      widget={GaugeChart({
        data: {
          value: 92,
          min: 0,
          max: 100,
          title: "Memory Usage",
          zones: [
            { min: 0, max: 50, color: "#4CAF50" },
            { min: 50, max: 80, color: "#FF9800" },
            { min: 80, max: 100, color: "#F44336" },
          ],
        },
      })}
    />
  ),
};
