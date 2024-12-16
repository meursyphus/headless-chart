import { type Widget, StatelessWidget } from "@meursyphus/flitter";
import type {
  TreeMapChartCustom,
  TreeMapChartData,
  TreeMapChartScale,
} from "./types";
import { TreeMapChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";
import { classToFn } from "@utils/index";

class TreeMap extends StatelessWidget {
  #config: TreeMapChartCustom;
  #data: TreeMapChartData;
  #getScale: (data: TreeMapChartData) => TreeMapChartScale;
  #title: string;

  constructor({
    custom: {
      area = Default.Area,
      series = Default.Series,
      layout = Default.Layout,
      plot = Default.Plot,
      legend = Default.Legend,
      title: titleWidget = Default.Title,
      dataLabel = Default.DataLabel,
      grid = Default.Grid,
      gridXLine = Default.GridXLine,
      gridYLine = Default.GridYLine,
    } = {},
    getScale = Default.getScale,
    data,
    title = "",
  }: {
    custom?: Partial<TreeMapChartCustom>;
    title?: string;
    data: TreeMapChartData;
    getScale?: (data: TreeMapChartData) => TreeMapChartScale;
  }) {
    super();
    this.#data = data;
    this.#getScale = getScale;
    this.#title = title;
    this.#config = {
      area,
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

    return TreeMapChartConfigProvider({
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

export default classToFn(TreeMap);
