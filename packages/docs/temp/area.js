// Area.js
import { CustomPaint, Path } from "@meursyphus/flitter";
import drawSplineLine from "./drawSplineLine"; 
import colors from "./colors";           

export default function Area({ values, index }, { scale }) {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl(context) {
          return {
            linePath: context.createSvgEl("path"),
            areaPath: context.createSvgEl("path"),
          };
        },
        paint({ linePath, areaPath }, { width, height }) {
          const path = new Path();

          // 1) 스플라인(곡선) 라인을 그린다 (직선 원하면 spline: false)
          drawSplineLine(path, {
            width,
            height,
            minValue: scale.min,
            maxValue: scale.max,
            values,
          });

          // "linePath" 속성
          linePath.setAttribute("stroke", colors[index]);
          linePath.setAttribute("fill", "none");
          linePath.setAttribute("stroke-width", "2");
          linePath.setAttribute("d", path.getD());

          // 2) 영역 채우기 (0선 = zeroY 기준)
          const zeroRatio = (0 - scale.min) / (scale.max - scale.min); 
          const zeroY = height - zeroRatio * height;

          // path를 이어서 area 영역 닫기
          path
            .lineTo({ x: width, y: zeroY })
            .lineTo({ x: 0,  y: zeroY })
            .close();

          // "areaPath" 속성
          areaPath.setAttribute("fill", colors[index]);
          areaPath.setAttribute("opacity", "0.3"); // 투명도
          areaPath.setAttribute("d", path.getD());
        },
      },
    },
  });
}