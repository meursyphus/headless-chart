import type { Meta, StoryObj } from "@storybook/react-vite";
import { CandlestickChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/CandlestickChart",
};
export default meta;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    { open: 100, high: 115, low: 95, close: 110 },
    { open: 110, high: 120, low: 105, close: 108 },
    { open: 108, high: 125, low: 100, close: 122 },
    { open: 122, high: 130, low: 118, close: 125 },
    { open: 125, high: 128, low: 110, close: 112 },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={CandlestickChart({ data })} />,
};
