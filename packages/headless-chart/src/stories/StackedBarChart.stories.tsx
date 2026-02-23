import type { Meta, StoryObj } from "@storybook/react-vite";
import { StackedBarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import { Container, BoxDecoration } from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/StackedBarChart",
};
export default meta;

const data = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    { legend: "Electronics", values: [120, 150, 180, 200] },
    { legend: "Clothing", values: [80, 90, 100, 110] },
    { legend: "Food", values: [60, 70, 65, 80] },
  ],
};

export const Vertical: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Quarterly Sales by Category"
      description="Inspired by Toast"
      widget={StackedBarChart({
        data,
        custom: {
          ...cartesianToastCustom,
          bar: ({ legend }: any) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            return Container({
              decoration: new BoxDecoration({
                color: toastColors[idx % toastColors.length],
              }),
            });
          },
        },
      })}
    />
  ),
};

export const Horizontal: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Quarterly Sales (Horizontal)"
      description="Inspired by Toast"
      widget={StackedBarChart({
        data,
        direction: "horizontal",
        custom: {
          ...cartesianToastCustom,
          bar: ({ legend }: any) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            return Container({
              decoration: new BoxDecoration({
                color: toastColors[idx % toastColors.length],
              }),
            });
          },
        },
      })}
    />
  ),
};
