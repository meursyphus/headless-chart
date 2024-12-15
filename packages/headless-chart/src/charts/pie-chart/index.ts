import { type Widget, StatelessWidget } from "@meursyphus/flitter";
import type { PieChartCustom, PieChartData, PieChartScale } from "./types";
import { PieChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";
import { classToFn } from "@utils/index";

class PieChart extends StatelessWidget {
  #config: PieChartCustom;
  #data: PieChartData;
  #getScale: (data: PieChartData) => PieChartScale;
  #title: string;

  constructor({
    custom: {
      segments = Default.Segments,
      segment = Default.Segment,
      legend = Default.Legend,
      title: titleWidget = Default.Title,
      layout = Default.Layout,
      plot = Default.Plot,
      grid = Default.Grid,
      dataLabel = Default.DataLabel,
    } = {},
    getScale = Default.getScale,
    data,
    title = "",
  }: {
    custom?: Partial<PieChartCustom>;
    title?: string;
    data: PieChartData;
    getScale?: (data: PieChartData) => PieChartScale;
  }) {
    super();
    this.#data = data;
    this.#getScale = getScale;
    this.#title = title;
    this.#config = {
      segments,
      segment,
      legend,
      title: titleWidget,
      layout,
      plot,
      grid,
      dataLabel,
    };
  }

  override build(): Widget {
    const scale = this.#getScale(this.#data);

    return PieChartConfigProvider({
      value: {
        custom: this.#config,
        data: this.#data,
        scale,
        title: this.#title,
      },
      child: new Chart(),
    });
  }
}

export default classToFn(PieChart);
