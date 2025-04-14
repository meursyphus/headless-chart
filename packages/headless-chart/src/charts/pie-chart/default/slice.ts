import { CustomPaint, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Slice = (
  { value, percentage, index, label }: { 
    value: number; 
    percentage: number; 
    index: number; 
    label: string;
  },
  config: PieChartConfig
): Widget => {
  // 기본 색상 배열 (실제로는 더 많은 색상이나 사용자 정의 색상을 사용할 수 있음)
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#F95738", "#20A39E"
  ];
  
  // 인덱스에 해당하는 색상 (색상 배열의 범위를 벗어나면 순환)
  const color = colors[index % colors.length];
  
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => {
          return {
            path: context.createSvgEl("path"),
          };
        },
        paint: ({ path }, { width, height }) => {
          // 이전 각도 계산 (누적)
          let startAngle = config.startAngle || 0;
          if (index > 0) {
            // 실제 구현에서는 이전 슬라이스들의 퍼센트를 합산하여 시작 각도 계산
            // 간단한 예시를 위해 여기서는 생략
          }
          
          // 종료 각도 계산
          const angleExtent = (percentage / 100) * 360;
          const endAngle = startAngle + angleExtent;
          
          // 중심점과 반지름 계산
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 2;
          
          // 도넛 차트인 경우 내부 반지름 계산
          let innerRadius = 0;
          if (config.isDonut) {
            innerRadius = radius * (config.innerRadiusRatio || 0.6);
          }
          
          // SVG path 데이터 생성
          let pathData = '';
          
          // path 데이터 생성 로직 (실제 구현에서는 더 정확한 계산 필요)
          // 이 부분은 예시일 뿐이며 실제 구현에서는 정확한 SVG path 계산이 필요함
          
          path.setAttribute("d", pathData);
          path.setAttribute("fill", color);
          path.setAttribute("stroke", "white");
          path.setAttribute("stroke-width", "1");
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          // Canvas 구현도 SVG와 유사하게 진행
          // 중심점과 반지름 계산
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 2;
          
          // 시작 및 종료 각도 계산 (라디안으로 변환)
          let startAngle = (config.startAngle || 0) * Math.PI / 180;
          // 실제 구현에서는 이전 슬라이스들의 퍼센트를 합산하여 시작 각도 계산
          
          const angleExtent = (percentage / 100) * 2 * Math.PI;
          const endAngle = startAngle + angleExtent;
          
          // 도넛 차트인 경우 내부 반지름 계산
          let innerRadius = 0;
          if (config.isDonut) {
            innerRadius = radius * (config.innerRadiusRatio || 0.6);
          }
          
          // Canvas 드로잉 경로 시작
          context.beginPath();
          
          // 파이 조각 그리기 (실제 구현에서는 더 정확한 계산 필요)
          
          // 채우기 색상 설정
          context.fillStyle = color;
          context.fill();
          
          // 테두리 그리기
          context.strokeStyle = "white";
          context.lineWidth = 1;
          context.stroke();
        },
      },
    },
  });
};
