import {
  StatelessWidget,
  type Widget,
  type BuildContext,
} from "@meursyphus/flitter";
import { BarChartConfigProvider } from "./provider";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

class Layout extends StatelessWidget {
  #getLegends(context: BuildContext): string[] {
    const { data } = BarChartConfigProvider.of(context);
    return data.datasets.map(({ legend }) => legend);
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.layout(
      {
        title: new Title(),
        plot: new Plot(),
        legends: this.#getLegends(context).map(
          (name, index) => new Legend({ name, index }),
        ),
      },
      config,
    );
  }
}

class Legend extends StatelessWidget {
  #name: string;
  #index: number;

  constructor({ name, index }: { name: string; index: number }) {
    super();
    this.#name = name;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.legend({ name: this.#name, index: this.#index }, config);
  }
}

class Title extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom, title } = config;
    return custom.title({ name: title }, config);
  }
}

abstract class Axis extends StatelessWidget {
  protected getValueLabels(context: BuildContext): string[] {
    const {
      scale: { min, max, step },
    } = BarChartConfigProvider.of(context);
    const labels = [];
    for (let i = 0; i <= (max - min) / step; i++) {
      labels.push(min + step * i);
    }
    return labels.map((label) => label.toString());
  }
  protected getCategoryLabels(context: BuildContext): string[] {
    const { data } = BarChartConfigProvider.of(context);
    return data.labels;
  }
  protected getLabels(context: BuildContext): string[] {
    const { data } = BarChartConfigProvider.of(context);
    return data.labels;
  }
}

class XAxis extends Axis {
  #getLabels(context: BuildContext): string[] {
    const config = BarChartConfigProvider.of(context);

    if (config.direction === "vertical") {
      return this.getCategoryLabels(context);
    } else {
      return this.getValueLabels(context);
    }
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    const labels = this.#getLabels(context);
    return custom.xAxis(
      {
        labels: labels.map(
          (label, index) => new XAxisLabel({ index, name: label }),
        ),
        tick: new XAxisTick(),
        line: new XAxisLine(),
      },
      config,
    );
  }
}

class XAxisLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisLine(undefined, config);
  }
}

class YAxis extends Axis {
  #getLabels(context: BuildContext): string[] {
    const config = BarChartConfigProvider.of(context);

    if (config.direction === "vertical") {
      return this.getValueLabels(context);
    } else {
      return this.getCategoryLabels(context);
    }
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxis(
      {
        labels: this.#getLabels(context).map(
          (label, index) => new YAxisLabel({ index, name: label }),
        ),
        tick: new YAxisTick(),
        line: new YAxisLine(),
      },
      config,
    );
  }
}

class YAxisLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisLine(undefined, config);
  }
}

abstract class Label extends StatelessWidget {
  protected index: number;
  protected name: string;

  constructor({ index, name }: { index: number; name: string }) {
    super();
    this.index = index;
    this.name = name;
  }
}

class XAxisLabel extends Label {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisLabel({ name: this.name, index: this.index }, config);
  }
}

class YAxisLabel extends StatelessWidget {
  #index: number;
  #name: string;

  constructor({ index, name }: { index: number; name: string }) {
    super();
    this.#index = index;
    this.#name = name;
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisLabel({ name: this.#name, index: this.#index }, config);
  }
}

class XAxisTick extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisTick(undefined, config);
  }
}

class YAxisTick extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisTick(undefined, config);
  }
}

class BarGroup extends StatelessWidget {
  #values: number[];
  #index: number;

  constructor({ values, index }: { values: number[]; index: number }) {
    super();
    this.#values = values;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom, data } = config;
    return custom.barGroup(
      {
        index: this.#index,
        label: data.labels[this.#index],
        values: this.#values,
        bars: this.#values.map(
          (value, index) =>
            new Bar({
              value,
              index: this.#index,
              legend: data.datasets[index].legend,
              label: data.labels[this.#index],
            }),
        ),
      },
      config,
    );
  }
}

class Bar extends StatelessWidget {
  #value: number;
  #index: number;
  #legend: string;
  #label: string;

  constructor({
    value,
    index,
    legend,
    label,
  }: {
    value: number;
    index: number;
    legend: string;
    label: string;
  }) {
    super();
    this.#value = value;
    this.#index = index;
    this.#legend = legend;
    this.#label = label;
  }

  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.bar(
      {
        value: this.#value,
        index: this.#index,
        legend: this.#legend,
        label: this.#label,
      },
      config,
    );
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.plot(
      { xAxis: new XAxis(), yAxis: new YAxis(), series: new Series(), grid: new Grid() },
      config,
    );
  }
}

class Series extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom, data } = config;
    return custom.series(
      {
        barGroups: Array.from(
          { length: data.labels.length },
          (_, index) =>
            new BarGroup({
              values: data.datasets.map(({ values }) => values[index]),
              index,
            }),
        ),
      },
      config,
    );
  }
}

class Grid extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.grid(
      { xLine: new GridXLine(), yLine: new GridYLine() },
      config,
    );
  }
}

class GridXLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.gridXLine(undefined, config);
  }
}

class GridYLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BarChartConfigProvider.of(context);
    const { custom } = config;
    return custom.gridYLine(undefined, config);
  }
}
