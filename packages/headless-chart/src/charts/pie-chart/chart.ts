import { StatelessWidget, Widget, BuildContext } from "@meursyphus/flitter";
import { PieChartConfigProvider } from "./provider";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

class Layout extends StatelessWidget {
  #getLegends(context: BuildContext): string[] {
    const { data } = PieChartConfigProvider.of(context);
    return data.datasets.map(({ legend }) => legend);
  }

  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
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
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return custom.legend({ name: this.#name, index: this.#index }, config);
  }
}

class TitleWidget extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, title } = config;
    return custom.title({ name: title }, config);
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, data, scale } = config;
    return custom.plot(
      {
        xAxis: new Widget(),
        yAxis: new Widget(),
        series: new Series({ data: data.datasets, scale }),
        grid: new Widget(),
      },
      config,
    );
  }
}

class Series extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, data, scale } = config;

    const pie = data.datasets.flatMap((dataset, index) =>
      dataset.data.map((slice, index) => ({
        value: slice.value,
        label: slice.label,
        legend: dataset.legend,
        index: index,
      })),
    );

    return custom.series({ pie, scale }, config);
  }
}
