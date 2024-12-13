import { StatelessWidget, Widget, BuildContext } from "@meursyphus/flitter";
import { BubbleChartConfigProvider } from "./provider";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

class Layout extends StatelessWidget {
  #getLegends(context: BuildContext): string[] {
    const { data } = BubbleChartConfigProvider.of(context);
    return data.datasets.map(({ legend }) => legend);
  }

  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.layout(
      {
        title: new TitleWidget(),
        legends: this.#getLegends(context).map(
          (name, index) => new Legend({ name, index }),
        ),
        plot: new Plot(),
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
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.legend({ name: this.#name, index: this.#index }, config);
  }
}

class TitleWidget extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom, title } = config;
    return custom.title({ name: title }, config);
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.plot(
      {
        xAxis: new XAxis(),
        yAxis: new YAxis(),
        series: new Series(),
        grid: new Grid(),
      },
      config,
    );
  }
}

class XAxis extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    const { scale } = config;
    const stepCount = scale.x.step;
    const stepSize = (scale.x.max - scale.x.min) / stepCount;
    const labels = [];
    for (let i = 0; i <= stepCount; i++) {
      labels.push((scale.x.min + i * stepSize).toFixed(2));
    }

    return custom.xAxis(
      {
        labels: labels.map((name, index) => new XAxisLabel({ name, index })),
        tick: new XAxisTick(),
        line: new XAxisLine(),
      },
      config,
    );
  }
}

class YAxis extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    const { scale } = config;
    const stepCount = scale.y.step;
    const stepSize = (scale.y.max - scale.y.min) / stepCount;
    const labels = [];
    for (let i = 0; i <= stepCount; i++) {
      labels.push((scale.y.min + i * stepSize).toFixed(2));
    }

    return custom.yAxis(
      {
        labels: labels.map((name, index) => new YAxisLabel({ name, index })),
        tick: new YAxisTick(),
        line: new YAxisLine(),
      },
      config,
    );
  }
}

class XAxisLabel extends StatelessWidget {
  #name: string;
  #index: number;

  constructor({ name, index }: { name: string; index: number }) {
    super();
    this.#name = name;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisLabel({ name: this.#name, index: this.#index }, config);
  }
}

class YAxisLabel extends StatelessWidget {
  #name: string;
  #index: number;

  constructor({ name, index }: { name: string; index: number }) {
    super();
    this.#name = name;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisLabel({ name: this.#name, index: this.#index }, config);
  }
}

class XAxisTick extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisTick(undefined, config);
  }
}

class YAxisTick extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisTick(undefined, config);
  }
}

class XAxisLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.xAxisLine(undefined, config);
  }
}

class YAxisLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.yAxisLine(undefined, config);
  }
}

class Series extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom, data } = config;

    return custom.series(
      {
        bubbles: data.datasets.map(
          (dataset, index) =>
            new BubbleWidget({
              points: dataset.data,
              index,
              legend: dataset.legend,
            }),
        ),
      },
      config,
    );
  }
}

class BubbleWidget extends StatelessWidget {
  #points: { x: number; y: number; value: number; label: string }[];
  #index: number;
  #legend: string;

  constructor({
    points,
    index,
    legend,
  }: {
    points: { x: number; y: number; value: number; label: string }[];
    index: number;
    legend: string;
  }) {
    super();
    this.#points = points;
    this.#index = index;
    this.#legend = legend;
  }

  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.bubble(
      {
        points: this.#points,
        legend: this.#legend,
        index: this.#index,
      },
      config,
    );
  }
}

class Grid extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.grid(
      {
        xLine: new GridXLine(),
        yLine: new GridYLine(),
      },
      config,
    );
  }
}

class GridXLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.gridXLine(undefined, config);
  }
}

class GridYLine extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = BubbleChartConfigProvider.of(context);
    const { custom } = config;
    return custom.gridYLine(undefined, config);
  }
}
