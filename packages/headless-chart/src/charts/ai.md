{{ ... }}
# Headless Chart 파일 구조 가이드

이 문서는 `headless-chart` 라이브러리에서 새로운 차트 타입을 구현할 때 참고할 수 있는 파일 구조 가이드입니다. 이 가이드는 기존의 area-chart와 bubble-chart 구현을 분석하여 작성되었습니다.

## 기본 파일 구조

새로운 차트 타입(예: AI-Chart)을 구현할 때 다음과 같은 파일 구조를 따라야 합니다:

```
src/charts/ai-chart/
├── chart.ts          # 차트 컴포넌트 및 구성 요소 정의
├── default/          # 기본 구현 디렉토리
│   ├── index.ts      # 모든 기본 구현을 내보내는 인덱스 파일
│   ├── getScale.ts   # 스케일 계산 함수
│   ├── layout.ts     # 레이아웃 기본 구현
│   └── [기타 컴포넌트].ts  # 차트 요소별 기본 구현 파일
├── index.ts          # 메인 인덱스 파일 (외부 API)
├── provider.ts       # 설정 제공자 (Context Provider)
└── types.ts          # 타입 정의
```

## 핵심 파일 상세 설명

### 1. `types.ts`

이 파일은 차트에 필요한 모든 타입과 인터페이스를 정의합니다:

```typescript
import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: AIChartConfig) => Widget;

export type AIChartCustom = {
  // 차트의 모든 커스터마이징 가능한 요소들을 정의
  // 예시:
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{
    xAxis: Widget;
    yAxis: Widget;
    series: Widget;
    // 기타 플롯 관련 요소
  }>;
  // 각 축 관련 요소
  xAxis: ConfigArgs<{ line: Widget; labels: Widget[]; tick: Widget }>;
  yAxis: ConfigArgs<{ line: Widget; labels: Widget[]; tick: Widget }>;
  
  // 각 컴포넌트별 필요한 ConfigArgs 추가
  // ...
};

export type AIChartData = {
  // 차트 데이터 구조 정의
  labels: string[];
  datasets: { legend: string; values: number[] }[];
  // AI 차트에 특화된 추가 데이터 필드
};

export type AIChartScale = {
  // 차트 스케일 속성 정의
  min: number;
  max: number;
  step: number;
  // AI 차트에 필요한 추가 스케일 속성
};

export type AIChartConfig = {
  // 완전한 차트 설정 정의
  custom: AIChartCustom;
  data: AIChartData;
  scale: AIChartScale;
  title: string;
  // AI 차트에 특화된 추가 설정
};
```

### 2. `provider.ts`

Context API를 사용하여 차트 설정을 제공하는 Provider 정의:

```typescript
import { type Widget, Provider, BuildContext } from "@meursyphus/flitter";
import type { AIChartConfig } from "./types";

const AI_CHART_CONTEXT_KEY = Symbol("AIChartKey");

export function AIChartConfigProvider({
  child,
  value,
}: {
  child: Widget;
  value: AIChartConfig;
}): Widget {
  return Provider({
    child,
    providerKey: AI_CHART_CONTEXT_KEY,
    value,
  });
}

AIChartConfigProvider.of = (context: BuildContext): AIChartConfig => {
  return Provider.of(AI_CHART_CONTEXT_KEY, context);
};
```

### 3. `chart.ts`

차트의 모든 컴포넌트와 그들의 관계를 정의합니다:

```typescript
import {
  StatelessWidget,
  type Widget,
  type BuildContext,
} from "@meursyphus/flitter";
import { AIChartConfigProvider } from "./provider";

class Chart extends StatelessWidget {
  override build(_: BuildContext): Widget {
    return new Layout();
  }
}

export default Chart;

// 메인 레이아웃 컴포넌트
class Layout extends StatelessWidget {
  // 내부 도우미 메서드들
  
  override build(context: BuildContext): Widget {
    const config = AIChartConfigProvider.of(context);
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

// 범례 컴포넌트
class Legend extends StatelessWidget {
  // 필요한 필드와 메서드
}

// 제목 컴포넌트
class Title extends StatelessWidget {
  // 구현
}

// 축 추상 클래스
abstract class Axis extends StatelessWidget {
  // 공통 메서드
}

// X축 구현
class XAxis extends Axis {
  // 구현
}

// Y축 구현
class YAxis extends Axis {
  // 구현
}

// 기타 필요한 모든 컴포넌트들:
// - 축 레이블
// - 그리드
// - 데이터 시리즈
// - AI 차트 특화 컴포넌트
// ...
```

### 4. `index.ts`

외부에 노출되는 메인 API를 정의합니다:

```typescript
import { type Widget, StatelessWidget } from "@meursyphus/flitter";
import type { AIChartCustom, AIChartData, AIChartScale } from "./types";
import { AIChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";
import { classToFn } from "@utils/index";

class AIChart extends StatelessWidget {
  #config: AIChartCustom;
  #data: AIChartData;
  #getScale: (data: AIChartData) => AIChartScale;
  #title: string;

  constructor({
    custom: {
      // 모든 커스텀 컴포넌트들의 기본값 설정
      xAxis = Default.XAxis,
      yAxis = Default.YAxis,
      // ... 기타 모든 컴포넌트
    } = {},
    getScale = Default.getScale,
    data,
    title = "",
  }: {
    custom?: Partial<AIChartCustom>;
    title?: string;
    data: AIChartData;
    getScale?: (data: AIChartData) => AIChartScale;
  }) {
    super();
    this.#data = data;
    this.#getScale = getScale;
    this.#title = title;
    this.#config = {
      // 모든 컴포넌트를 구성에 할당
      xAxis,
      yAxis,
      // ... 기타 모든 컴포넌트
    };
  }

  override build(): Widget {
    const scale = this.#getScale(this.#data);

    return AIChartConfigProvider({
      value: {
        custom: this.#config,
        data: this.#data,
        scale,
        title: this.#title,
        // 추가 AI 관련 설정
      },
      child: new Chart(),
    });
  }
}

export default classToFn(AIChart);
```

### 5. `default/` 디렉토리

이 디렉토리는 모든 차트 컴포넌트의 기본 구현을 포함합니다:

#### `default/index.ts`

```typescript
export * from "./getScale";
export * from "./layout";
export * from "./plot";
// AI 차트의 모든 컴포넌트 내보내기
// ...
```

#### `default/getScale.ts`

```typescript
import type { AIChartData, AIChartScale } from "../types";

export const getScale = (data: AIChartData): AIChartScale => {
  // 데이터를 기반으로 적절한 스케일 계산
  // 최소값, 최대값, 단계 계산
  return {
    min: /* 계산된 최소값 */,
    max: /* 계산된 최대값 */,
    step: /* 계산된 단계 */,
  };
};
```

#### 기타 컴포넌트 파일들

```typescript
// default/layout.ts
export const Layout = ({ title, legends, plot }, config) => {
  // 레이아웃 기본 구현
};

// default/xAxis.ts
export const XAxis = ({ line, labels, tick }, config) => {
  // X축 기본 구현
};

// 등등...
```

## 구현 과정

새로운 AI 차트를 구현할 때 다음 단계를 따르세요:

1. **타입 정의**: `types.ts`에서 시작하여 AI 차트에 필요한 모든 데이터 타입과 설정 옵션을 정의합니다.

2. **Provider 설정**: `provider.ts`에서 컨텍스트 제공자를 설정하여 차트 전체에서 설정에 접근할 수 있게 합니다.

3. **핵심 컴포넌트 구현**: `chart.ts`에서 차트의 모든 시각적 요소를 나타내는 클래스들을 구현합니다. 기존 차트와의 일관성을 위해 비슷한 이름 규칙을 사용하세요.

4. **기본 구현 작성**: `default/` 디렉토리에 모든 컴포넌트의 기본 구현을 제공합니다. 이는 사용자가 커스터마이징하지 않았을 때 적용됩니다.

5. **메인 클래스 구현**: `index.ts`에서 공개 API를 구현하여 사용자가 차트를 쉽게 구성하고 사용할 수 있도록 합니다.

## 예시: AI 차트 사용 방법

```typescript
import { AIChart } from "@headless-chart/charts/ai-chart";
import { Container, Text } from "@meursyphus/flitter";

// 기본 구현으로 차트 사용
const basicChart = AIChart({
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      { legend: "예측", values: [10, 20, 30] },
      { legend: "실제", values: [12, 19, 29] },
    ],
  },
  title: "AI 예측 분석",
});

// 커스텀 구성으로 차트 사용
const customChart = AIChart({
  data: /* 데이터 */,
  title: "커스텀 AI 차트",
  custom: {
    // 원하는 컴포넌트 커스터마이징
    title: ({ name }, config) => Container({
      child: Text({ text: name, style: { fontSize: 24, fontWeight: "bold" } }),
    }),
    // 기타 커스텀 컴포넌트...
  },
});
```

## 추가 고려사항

1. **계층 구조**: 컴포넌트 간의 명확한 계층 구조를 유지하세요. 차트 → 레이아웃 → 플롯 → 시리즈와 같은 구조가 일반적입니다.

2. **명명 규칙**: 일관된 명명 규칙을 사용하세요. 모든 컴포넌트 이름이 자체 설명적이어야 합니다.

3. **추상화**: 공통 로직은 추상 클래스에 배치하여 코드 중복을 줄이세요.

4. **확장성**: 나중에 손쉽게 기능을 추가할 수 있도록 코드를 설계하세요.

이 가이드를 따라 일관되고 유지보수하기 쉬운 AI 차트 구현을 만들 수 있습니다.