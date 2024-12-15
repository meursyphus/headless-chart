import {
  StatelessWidget,
  type Widget,
  type BuildContext,
} from "@meursyphus/flitter";
import { PieChartConfigProvider } from "./provider";
import { PieChartConfig } from "./types";

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
        plot: new Plot(config),
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
  #config: PieChartConfig;

  constructor(config: PieChartConfig) {
    super();
    this.#config = config;
  }
  override build(): Widget {
    const { custom } = this.#config;
    return custom.plot(
      {
        segments: new Segments(this.#config),
        grid: new Grid(this.#config),
      },
      this.#config,
    );
  }
}

class Segments extends StatelessWidget {
  #config: PieChartConfig;

  constructor(config: PieChartConfig) {
    super();
    this.#config = config;
  }
  override build(): Widget {
    const { custom, data } = this.#config;

    if (!data.datasets.length) {
      return custom.segments({ arcs: [], total: 0 }, this.#config);
    }

    const total = data.datasets.reduce((sum, dataset) => {
      const value = dataset.values[0] ?? 0;
      return sum + value;
    }, 0);

    if (total <= 0) {
      console.warn("Total value is zero or less, unable to render segments.");
      return custom.segments({ arcs: [], total: 0 }, this.#config);
    }

    let currentAngle = 0;

    const arcs = data.datasets.map(({ legend, values }, index) => {
      const value = values[0] ?? 0;
      const startAngle = currentAngle;
      const endAngle = currentAngle + (value / total) * 360;
      currentAngle = endAngle;

      return {
        value,
        legend: legend ?? "Unnamed",
        startAngle,
        endAngle,
        index,
      };
    });

    return custom.segments(
      {
        arcs,
        total,
      },
      this.#config,
    );
  }
}

class Grid extends StatelessWidget {
  #config: PieChartConfig;
  constructor(config: PieChartConfig) {
    super();
    this.#config = config;
  }

  override build(): Widget {
    const { custom } = this.#config;
    return custom.grid(
      {
        radialLines: [],
        concentricCircles: [],
      },
      this.#config,
    );
  }
}
