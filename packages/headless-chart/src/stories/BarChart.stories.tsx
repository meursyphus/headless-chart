import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import {
  Container,
  EdgeInsets,
  BoxDecoration,
  SizedBox,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/BarChart",
};
export default meta;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    { legend: "Seoul", values: [65, 59, 80, 81, 56, 55, 40] },
    { legend: "Seattle", values: [28, 48, 40, 19, 86, 27, 90] },
    { legend: "Sydney", values: [35, 25, 30, 45, 35, 40, 25] },
  ],
};

export const Vertical: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Monthly Temperature"
      description="Inspired by Toast"
      widget={BarChart({
        data,
        custom: {
          ...cartesianToastCustom,
          bar: ({ legend }) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            return Container({
              margin: EdgeInsets.symmetric({ horizontal: 1 }),
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
      title="Monthly Temperature (Horizontal)"
      description="Inspired by Toast"
      widget={BarChart({
        data,
        direction: "horizontal",
        custom: {
          ...cartesianToastCustom,
          bar: ({ legend }) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            return Container({
              margin: EdgeInsets.symmetric({ vertical: 1 }),
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
