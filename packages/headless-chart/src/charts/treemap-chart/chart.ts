import {
  StatelessWidget,
  Widget,
  type BuildContext,
} from "@meursyphus/flitter";
import { TreeMapChartConfigProvider } from "./provider";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

class Layout extends StatelessWidget {
  #getLegends(context: BuildContext) {
    const { data } = TreeMapChartConfigProvider.of(context);
    return data.datasets.map(({ legend }) => legend);
  }

  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
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
    const config = TreeMapChartConfigProvider.of(context);
    const { custom } = config;
    return custom.legend({ name: this.#name, index: this.#index }, config);
  }
}

class Title extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
    const { custom, title } = config;
    return custom.title({ name: title }, config);
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
    const { custom } = config;
    return custom.plot(
      {
        xAxis: new Widget(),
        yAxis: new Widget(),
        series: new Series(),
        grid: new Grid(),
      },
      config,
    );
  }
}

class Series extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
    const { custom, data } = config;
    return custom.series(
      {
        areas: data.datasets.map(
          (dataset, index) =>
            new Area({
              values: dataset.values,
              index,
              legend: dataset.legend,
            }),
        ),
      },
      config,
    );
  }
}

class Area extends StatelessWidget {
  #values: number[];
  #index: number;
  #legend: string;

  constructor({
    values,
    index,
    legend,
  }: {
    values: number[];
    index: number;
    legend: string;
  }) {
    super();
    this.#values = values;
    this.#index = index;
    this.#legend = legend;
  }

  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
    const { custom } = config;
    return custom.area(
      {
        values: this.#values,
        legend: this.#legend,
        index: this.#index,
      },
      config,
    );
  }
}
class Grid extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = TreeMapChartConfigProvider.of(context);
    const { custom } = config;
    return custom.grid(
      {
        xLines: new Widget(),
        yLines: new Widget(),
      },
      config,
    );
  }
}
