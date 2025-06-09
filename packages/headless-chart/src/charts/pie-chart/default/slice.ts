import { CustomPaint, type Widget, Path } from "@meursyphus/flitter";
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
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#F95738", "#20A39E"
  ];
  
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
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 2 - 10;
          
          // 누적 각도 계산 (이전 슬라이스들의 퍼센트를 합산)
          let cumulativePercentage = 0;
          for (let i = 0; i < index; i++) {
            const dataset = config.data.datasets[0];
            const values = dataset.values;
            const total = values.reduce((sum, v) => sum + v, 0);
            if (total > 0) {
              cumulativePercentage += (values[i] / total) * 100;
            }
          }
          
          const startAngle = (config.startAngle || 0) + (cumulativePercentage / 100) * 360;
          const angleExtent = (percentage / 100) * 360;
          const endAngle = startAngle + angleExtent;
          
          const startAngleRad = (startAngle - 90) * Math.PI / 180;
          const endAngleRad = (endAngle - 90) * Math.PI / 180;
          
          const innerRadius = config.isDonut ? radius * (config.innerRadiusRatio || 0.6) : 0;
          
          const pathData = createPieSlicePath({
            centerX,
            centerY,
            radius,
            innerRadius,
            startAngle: startAngleRad,
            endAngle: endAngleRad,
            isDonut: config.isDonut || false
          });
          
          path.setAttribute("d", pathData);
          path.setAttribute("fill", color);
          path.setAttribute("stroke", "white");
          path.setAttribute("stroke-width", "2");
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 2 - 10;
          
          // 누적 각도 계산
          let cumulativePercentage = 0;
          for (let i = 0; i < index; i++) {
            const dataset = config.data.datasets[0];
            const values = dataset.values;
            const total = values.reduce((sum, v) => sum + v, 0);
            if (total > 0) {
              cumulativePercentage += (values[i] / total) * 100;
            }
          }
          
          const startAngle = ((config.startAngle || 0) + (cumulativePercentage / 100) * 360 - 90) * Math.PI / 180;
          const angleExtent = (percentage / 100) * 2 * Math.PI;
          const endAngle = startAngle + angleExtent;
          
          const innerRadius = config.isDonut ? radius * (config.innerRadiusRatio || 0.6) : 0;
          
          context.canvas.beginPath();
          
          if (config.isDonut) {
            // 도넛 차트 그리기
            context.canvas.arc(centerX, centerY, radius, startAngle, endAngle);
            context.canvas.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
            context.canvas.closePath();
          } else {
            // 일반 파이 차트 그리기
            context.canvas.moveTo(centerX, centerY);
            context.canvas.arc(centerX, centerY, radius, startAngle, endAngle);
            context.canvas.closePath();
          }
          
          context.canvas.fillStyle = color;
          context.canvas.fill();
          
          context.canvas.strokeStyle = "white";
          context.canvas.lineWidth = 2;
          context.canvas.stroke();
        },
      },
    },
  });
};

function createPieSlicePath({
  centerX,
  centerY,
  radius,
  innerRadius,
  startAngle,
  endAngle,
  isDonut
}: {
  centerX: number;
  centerY: number;
  radius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  isDonut: boolean;
}): string {
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
  
  const x1 = centerX + radius * Math.cos(startAngle);
  const y1 = centerY + radius * Math.sin(startAngle);
  const x2 = centerX + radius * Math.cos(endAngle);
  const y2 = centerY + radius * Math.sin(endAngle);
  
  if (isDonut) {
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  } else {
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }
}
