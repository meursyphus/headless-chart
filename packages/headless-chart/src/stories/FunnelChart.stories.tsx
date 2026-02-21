import type { Meta, StoryObj } from "@storybook/react-vite";
import { FunnelChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

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
  render: () => <ChartWrapper widget={FunnelChart({ data })} />,
};
