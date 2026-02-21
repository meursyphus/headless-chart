import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeatmapChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Specialized/HeatmapChart",
};
export default meta;

const data = {
  xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  yLabels: ["Morning", "Afternoon", "Evening"],
  values: [
    [3, 7, 5, 9, 2],
    [8, 4, 6, 3, 7],
    [1, 5, 9, 4, 8],
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={HeatmapChart({ data })} />,
};
