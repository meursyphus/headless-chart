import {
  StatelessWidget,
  Widget,
  type BuildContext,
} from "@meursyphus/flitter";
import { PieChartConfigProvider } from "./provider";
import { PieChartConfig, PieChartCustom } from "./types";
import { PieGroup, Pie } from "./default";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

class Layout extends StatelessWidget {
  #getLegends(config: PieChartConfig): string[] {
    return config.data.datasets.map(({ legend }) => legend ?? "Unnamed");
  }

  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    if (!config) {
      throw new Error("PieChartConfigProvider is not found in the context.");
    }

    const { custom } = config;

    return custom.layout(
      {
        title: new Title(config),
        plot: new Plot(),
        legends: this.#getLegends(config).map(
          (name, index) => new Legend({ name, index, config }),
        ),
      },
      config,
    );
  }
}

class Legend extends StatelessWidget {
  #name: string;
  #index: number;
  #config: PieChartConfig;

  constructor({
    name,
    index,
    config,
  }: {
    name: string;
    index: number;
    config: PieChartConfig;
  }) {
    super();
    this.#name = name;
    this.#index = index;
    this.#config = config;
  }

  override build(): Widget {
    return this.#config.custom.legend(
      { name: this.#name, index: this.#index },
      this.#config,
    );
  }
}
class Title extends StatelessWidget {
  #config: PieChartConfig;
  constructor(config: PieChartConfig) {
    super();
    this.#config = config;
  }
  override build(): Widget {
    const { custom, title } = this.#config;
    return custom.title({ name: title ?? "Untitled Chart" }, this.#config);
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
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

class Series extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, data } = config;
    return custom.series(
      {
        pieGroups: data.datasets.map((dataset, index) => {
          return new PieGroups(
            {
              pies: dataset.values.map((value, index) => {
                return new PieWidget(
                  {
                    value,
                    label: data.labels[index],
                    legend: dataset.legend,
                    index,
                  },
                  config,
                );
              }),
              index,
              label: dataset.legend,
              values: dataset.values,
            },
            config,
          );
        }),
      },
      config,
    );
  }
}

export class PieGroups extends StatelessWidget {
  #args: Parameters<PieChartCustom["pieGroup"]>[0];
  #context: PieChartConfig;

  constructor(
    args: Parameters<PieChartCustom["pieGroup"]>[0],
    context: PieChartConfig,
  ) {
    super();
    this.#args = args;
    this.#context = context;
  }

  override build(): Widget {
    return PieGroup(this.#args, this.#context);
  }
}

class PieWidget extends StatelessWidget {
  #config: Parameters<PieChartCustom["pie"]>[0];
  #context: PieChartConfig;

  constructor(
    config: {
      value: number;
      label: string;
      legend: string;
      index: number;
    },
    context: PieChartConfig,
  ) {
    super();
    this.#config = config;
    this.#context = context;
  }

  override build(): Widget {
    return Pie(this.#config, this.#context);
  }
}

class Grid extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return new Widget();
  }
}

class XAxis extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return new Widget();
  }
}

class YAxis extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return new Widget();
  }
}
