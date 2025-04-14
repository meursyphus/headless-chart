import {
  StatelessWidget,
  type Widget,
  type BuildContext,
} from "@meursyphus/flitter";
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
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return custom.legend({ name: this.#name, index: this.#index }, config);
  }
}

class Title extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, title } = config;
    return custom.title({ name: title }, config);
  }
}

class Plot extends StatelessWidget {
  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return custom.plot(
      {
        series: new Series(),
      },
      config,
    );
  }
}

class Series extends StatelessWidget {
  #calculatePercentages(values: number[]): number[] {
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.map(value => (total > 0 ? (value / total) * 100 : 0));
  }

  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom, data } = config;
    
    // 현재는 단일 데이터셋만 처리 (첫 번째 데이터셋 사용)
    const dataset = data.datasets[0];
    const percentages = this.#calculatePercentages(dataset.values);
    
    return custom.series(
      {
        slices: dataset.values.map(
          (value, index) => 
            new Slice({
              value,
              percentage: percentages[index],
              label: data.labels[index],
              index,
            }),
        ),
      },
      config,
    );
  }
}

class Slice extends StatelessWidget {
  #value: number;
  #percentage: number;
  #label: string;
  #index: number;

  constructor({
    value,
    percentage,
    label,
    index,
  }: {
    value: number;
    percentage: number;
    label: string;
    index: number;
  }) {
    super();
    this.#value = value;
    this.#percentage = percentage;
    this.#label = label;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return custom.slice(
      {
        value: this.#value,
        percentage: this.#percentage,
        label: this.#label,
        index: this.#index,
      },
      config,
    );
  }
}

class SliceLabel extends StatelessWidget {
  #value: number;
  #percentage: number;
  #label: string;
  #index: number;

  constructor({
    value,
    percentage,
    label,
    index,
  }: {
    value: number;
    percentage: number;
    label: string;
    index: number;
  }) {
    super();
    this.#value = value;
    this.#percentage = percentage;
    this.#label = label;
    this.#index = index;
  }

  override build(context: BuildContext): Widget {
    const config = PieChartConfigProvider.of(context);
    const { custom } = config;
    return custom.sliceLabel(
      {
        value: this.#value,
        percentage: this.#percentage,
        label: this.#label,
        index: this.#index,
      },
      config,
    );
  }
}
