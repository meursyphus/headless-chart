import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreemapChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

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
  render: () => <ChartWrapper widget={TreemapChart({ data })} />,
};
