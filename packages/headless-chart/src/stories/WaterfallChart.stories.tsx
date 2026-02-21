import type { Meta, StoryObj } from "@storybook/react-vite";
import { WaterfallChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/WaterfallChart",
};
export default meta;

const data = {
  labels: ["Revenue", "COGS", "Gross Profit", "OpEx", "Tax", "Net Income"],
  values: [500, -200, 300, -150, -50, 100],
  totalIndices: [2, 5],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={WaterfallChart({ data })} />,
};
