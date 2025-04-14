import { type Widget, StatelessWidget } from "@meursyphus/flitter";
import type { PieChartCustom, PieChartData, PieChartConfig } from "./types";
import { PieChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";
import { classToFn } from "@utils/index";

class PieChart extends StatelessWidget {
  #config: PieChartCustom;
  #data: PieChartData;
  #title: string;
  #isDonut: boolean;
  #innerRadiusRatio: number;
  #startAngle: number;

  constructor({
    custom: {
      layout = Default.Layout,
      plot = Default.Plot,
      series = Default.Series,
      slice = Default.Slice,
      legend = Default.Legend,
      title: titleWidget = Default.Title,
      sliceLabel = Default.SliceLabel,
    } = {},
    data,
    title = "",
    isDonut = false,
    innerRadiusRatio = 0.6,
    startAngle = 0,
  }: {
    custom?: Partial<PieChartCustom>;
    title?: string;
    data: PieChartData;
    isDonut?: boolean;
    innerRadiusRatio?: number;
    startAngle?: number;
  }) {
    super();
    this.#data = data;
    this.#title = title;
    this.#isDonut = isDonut;
    this.#innerRadiusRatio = innerRadiusRatio;
    this.#startAngle = startAngle;
    this.#config = {
      layout,
      plot,
      series,
      slice,
      legend,
      title: titleWidget,
      sliceLabel,
    };
  }

  override build(): Widget {
    return PieChartConfigProvider({
      value: {
        custom: this.#config,
        data: this.#data,
        title: this.#title,
        isDonut: this.#isDonut,
        innerRadiusRatio: this.#innerRadiusRatio,
        startAngle: this.#startAngle,
      },
      child: new Chart(),
    });
  }
}

export default classToFn(PieChart);
