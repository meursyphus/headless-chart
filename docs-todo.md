# Headless Chart 한국어 문서 작성 TODO

## 📁 문서 작성 규칙

### 폴더 및 파일 명명 규칙
- **폴더명**: `{숫자}.{폴더명}` (예: `01.getting-started`, `02.basic-chart`)
- **파일명**: `{숫자}.{파일명}.mdx` (예: `01.introduction.mdx`, `02.installation.mdx`)
- **숫자**: 두 자리 숫자로 정렬 순서 지정 (01, 02, 03...)
- **경로**: `/packages/docs/src/content/docs/ko/`

### Frontmatter 필수 필드
```yaml
---
nav_group: "시작하기"  # 사이드바 그룹명 (한국어)
nav_order: 1          # 그룹 내 정렬 순서
title: "소개"         # 페이지 제목
description: "headless-chart 라이브러리 소개, Flitter와의 관계, 그리고 핵심 개념"  # SEO 설명
---
```

### 차트 예제 페이지 Frontmatter (참고)
```yaml
---
nav_group: "Bar"     # 차트 타입
nav_order: 1         # 정렬 순서
title: "Chartjs"     # 스타일 이름
description: "A quick example of a headless-chart inspired by chart.js"
image: /bar-chart/chartjs.png  # 미리보기 이미지
files:              # Sandpack 코드 예제
  App.js: |
    // 코드 내용
---
```

### MDX 컴포넌트 사용
- 코드 블록: ` ```typescript `, ` ```jsx `
- 인라인 코드: `` `code` ``
- 링크: `[텍스트](URL)`
- 굵은 글씨: `**텍스트**`
- 리스트: `- 항목` 또는 `1. 번호`

### nav_group 매핑 (한국어)
```yaml
# 기존 영문 -> 한국어 매핑
"Getting Started" -> "시작하기"
"Basic Chart" -> "기본 차트"
# 새로 추가할 그룹들
"Core Concepts" -> "핵심 개념"
"Chart Guide" -> "차트 가이드"
"Advanced" -> "고급 기능"
"Integration" -> "통합 가이드"
```

### 폴더 구조 예시
```
/packages/docs/src/content/docs/ko/
├── 01.getting-started/
│   ├── 01.introduction.mdx      # ✅ 이미 존재 (수정 필요)
│   ├── 02.installation.mdx      # ✅ 이미 존재
│   └── 03.flitter-react.mdx     # ✅ 이미 존재
├── 02.basic-chart/
│   └── 01.bar-chart.mdx         # ✅ 이미 존재
├── 03.core-concepts/            # 📝 새로 생성
│   ├── 01.widget-system.mdx     # Flitter 위젯 시스템
│   ├── 02.component-structure.mdx # 컴포넌트 구조
│   └── 03.data-structure.mdx    # 데이터 구조
└── 04.chart-guide/              # 📝 새로 생성
    ├── 01.bar-chart.mdx         # Bar Chart + 커스터마이징
    ├── 02.line-chart.mdx        # Line Chart + 커스터마이징
    ├── 03.area-chart.mdx        # Area Chart + 커스터마이징
    ├── 04.scatter-chart.mdx     # Scatter Chart + 커스터마이징
    ├── 05.bubble-chart.mdx      # Bubble Chart + 커스터마이징
    └── 06.heatmap-chart.mdx     # Heatmap Chart + 커스터마이징
```

## 1. 소개 (Introduction)

### [ ] Headless Chart란?
- [ ] "왜 Headless Chart인가?" 섹션 작성
  - 디자인을 자유롭게 바꾸고 싶은데 기존 차트 라이브러리는 제한적
  - 기능을 추가하고 싶은데 확장이 어려움
  - 처음부터 만들기엔 부담스러운 개발 비용
  - Headless Chart = 차트의 로직은 제공, 디자인은 자유롭게
- [ ] Flitter 프레임워크 기반 설명
  - Flutter 스타일의 위젯 시스템
  - 참고: `/packages/headless-chart/src/charts/*/index.ts` - classToFn 패턴
  - 참고: `../flitter/AI.md` - Flitter 프레임워크 문서
- [ ] 주요 특징 설명
  - 완전한 커스터마이징 가능
  - TypeScript 지원
  - React/Svelte 통합 (flitter-react 패키지)

### [ ] 기존 라이브러리와의 비교
- [ ] Chart.js vs Headless Chart
- [ ] Recharts vs Headless Chart
- [ ] D3.js vs Headless Chart

## 2. 시작하기 (Getting Started)

### [ ] 설치 및 설정
- [ ] npm/yarn 설치 가이드
  - 참고: `/packages/docs/src/content/docs/ko/getting-started/installation.mdx`
- [ ] TypeScript 설정
- [ ] Vite/Webpack 설정 예제

### [ ] 첫 번째 차트
- [ ] 기본 Bar Chart 예제
  - 참고: `/packages/docs/src/content/docs/ko/basic-chart/bar-chart.mdx`
- [ ] 필수 구성 요소 설명
- [ ] @meursyphus/flitter-react 사용법

## 3. 핵심 개념 (Core Concepts)

### [ ] Flitter 위젯 시스템
- [ ] StatelessWidget 설명
  - 참고: `/packages/headless-chart/src/charts/bar/chart.ts` - BarChart 클래스
- [ ] build 메서드 패턴
- [ ] Context와 Provider 패턴
  - 참고: `/packages/headless-chart/src/charts/bar/provider.ts`

### [ ] 컴포넌트 구조
- [ ] 차트의 기본 구성 요소
  - Layout, Plot, Axes, Labels, Ticks, Grid, Legend, Title
  - 참고: `/packages/headless-chart/src/charts/bar/default/` 폴더
- [ ] custom prop을 통한 컴포넌트 교체
  - 참고: `/packages/headless-chart/src/charts/bar/types.ts` - CustomCartesianChart 타입

### [ ] 데이터 구조
- [ ] ChartData 타입 설명
  - labels, datasets, title
  - 참고: `/packages/headless-chart/src/shared/types.ts`
- [ ] Dataset 구조 (label, data, style)

## 4. 차트 타입별 가이드 (Chart Types with Customization)

### [ ] Bar Chart (막대 차트)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/bar/` 예제들
  - 참고: `/packages/headless-chart/src/charts/bar/index.ts`
- [ ] 수직/수평 전환 (direction prop)
- [ ] 커스터마이징 가능 요소
  - [ ] CustomBar 컴포넌트 만들기
  - [ ] CustomAxis 구현
  - [ ] CustomLegend 디자인
  - 참고: `/packages/headless-chart/src/charts/bar/default/Plot.ts`
- [ ] 실제 예제 (Chart.js 스타일, Nivo 스타일 등)
  - 참고: `/packages/docs/src/content/charts/bar/chartjs-style.ts`

### [ ] Line Chart (선 차트)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/line/` 예제들
  - 참고: `/packages/headless-chart/src/charts/line/index.ts`
- [ ] 선 스타일 옵션 (smooth, step)
- [ ] 커스터마이징 가능 요소
  - [ ] CustomLine 컴포넌트
  - [ ] CustomPoint 디자인
  - [ ] CustomTooltip 구현
  - 참고: `/packages/headless-chart/src/charts/line/default/Plot.ts`
- [ ] 애니메이션 효과 추가

### [ ] Area Chart (영역 차트)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/area/` 예제들
  - 참고: `/packages/headless-chart/src/charts/area/index.ts`
- [ ] 스택 영역 차트
- [ ] 커스터마이징 가능 요소
  - [ ] CustomArea 컴포넌트
  - [ ] 그라데이션 효과 추가
  - [ ] CustomFill 패턴
  - 참고: `/packages/headless-chart/src/charts/area/default/Plot.ts`

### [ ] Scatter Chart (산점도)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/scatter/` 예제들
  - 참고: `/packages/headless-chart/src/charts/scatter/index.ts`
- [ ] 포인트 크기 및 모양 설정
- [ ] 커스터마이징 가능 요소
  - [ ] CustomPoint 모양 (원, 사각형, 별 등)
  - [ ] CustomLabel 위치 조정
  - [ ] 호버 효과 구현
  - 참고: `/packages/headless-chart/src/charts/scatter/default/Plot.ts`

### [ ] Bubble Chart (버블 차트)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/bubble/` 예제들
  - 참고: `/packages/headless-chart/src/charts/bubble/index.ts`
- [ ] 3차원 데이터 표현 (x, y, size)
- [ ] 커스터마이징 가능 요소
  - [ ] CustomBubble 컴포넌트
  - [ ] 색상 매핑 로직
  - [ ] 크기 스케일 조정
  - 참고: `/packages/headless-chart/src/charts/bubble/default/Plot.ts`

### [ ] Heatmap Chart (히트맵)
- [ ] 기본 사용법
  - 참고: `/packages/docs/src/content/charts/heatmap/` 예제들
  - 참고: `/packages/headless-chart/src/charts/heatmap/index.ts`
- [ ] 색상 스케일 설정
- [ ] 커스터마이징 가능 요소
  - [ ] CustomCell 컴포넌트
  - [ ] CustomColorScale 구현
  - [ ] 셀 내부 텍스트/아이콘 추가
  - 참고: `/packages/headless-chart/src/charts/heatmap/default/Plot.ts`

## 작성 시 참고사항

### 코드 예제 템플릿
```typescript
// 기본 사용법
import { BarChart } from '@meursyphus/headless-chart';
import { Widget } from '@meursyphus/flitter-react';

// 커스터마이징 예제
const CustomBar = () => {
  // 커스텀 구현
};

BarChart({
  data: { /* ... */ },
  custom: {
    bar: CustomBar
  }
});
```

### 각 섹션별 필수 포함 사항
1. 개념 설명
2. 기본 코드 예제
3. 커스터마이징 예제
4. 실행 결과 스크린샷
5. CodeSandbox 또는 Sandpack 데모 (가능한 경우)

### 파일 경로 규칙
- 라이브러리 소스: `/packages/headless-chart/src/`
- 문서 콘텐츠: `/packages/docs/src/content/`
- 예제 차트: `/packages/docs/src/content/charts/`
- Flitter 문서: `../flitter/AI.md`