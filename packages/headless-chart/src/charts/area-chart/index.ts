import { type Widget, StatelessWidget } from "@meursyphus/flitter";
import type { AreaChartCustom, AreaChartData, AreaChartScale } from "./types";
import { AreaChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";
import { classToFn } from "@utils/index";

class BarChart extends StatelessWidget {
  #config: AreaChartCustom;
  #data: AreaChartData;
  #getScale: (data: AreaChartData) => AreaChartScale;
  #title: string;

  constructor({
    custom: {
      xAxis = Default.XAxis,
      xAxisLabel = Default.XAxisLabel,
      xAxisTick = Default.XAxisTick,
      yAxis = Default.YAxis,
      yAxisLabel = Default.YAxisLabel,
      yAxisTick = Default.YAxisTick,
      series = Default.Series,
      layout = Default.Layout,
      plot = Default.Plot,
      legend = Default.Legend,
      title: titleWidget = Default.Title,
      dataLabel = Default.DataLabel,
      area: line = Default.Line,
      xAxisLine = Default.XAxisLine,
      yAxisLine = Default.YAxisLine,
      grid = Default.Grid,
      gridXLine = Default.GridXLine,
      gridYLine = Default.GridYLine,
    } = {},
    getScale = Default.getScale,
    data,
    title = "",
  }: {
    custom?: Partial<AreaChartCustom>;
    title?: string;
    data: AreaChartData;
    getScale?: (data: AreaChartData) => AreaChartScale;
  }) {
    super();
    this.#data = data;
    this.#getScale = getScale;
    this.#title = title;
    this.#config = {
      area: line,
      xAxis,
      xAxisLabel,
      xAxisTick,
      xAxisLine,
      yAxis,
      yAxisLabel,
      yAxisTick,
      yAxisLine,
      series,
      layout,
      plot,
      legend,
      title: titleWidget,
      dataLabel,
      grid,
      gridXLine,
      gridYLine,
    };
  }

  override build(): Widget {
    const scale = this.#getScale(this.#data);

    return AreaChartConfigProvider({
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

export default classToFn(BarChart);
