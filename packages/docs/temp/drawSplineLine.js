export function drawSplineLine(
  path,
  { width, height, minValue, maxValue, values }
) {
  const count = values.length;
  if (count === 0) return;

  // 1) values -> 픽셀 좌표로 변환
  const points = values.map((val, i) => {
    const x = (i / (count - 1)) * width;
    const y = height - ((val - minValue) / (maxValue - minValue)) * height;
    return { x, y };
  });

  // 2) 각 point에 bezier controlPoint를 계산하고 cubicTo로 그린다.
  const bezierPoints = points.map((p) => ({
    ...p,
    controlPoint: { prev: null, next: null },
  }));
  setSplineControlPoints(bezierPoints);

  // 3) path에 스플라인 곡선을 실제로 추가
  bezierPoints.forEach((pt, i) => {
    if (i === 0) {
      path.moveTo(pt);
    } else {
      const { x: prevX, y: prevY } = bezierPoints[i - 1].controlPoint.next;
      const { controlPoint, x, y } = pt;

      path.cubicTo({
        startControlPoint: { x: prevX, y: prevY },
        endControlPoint: { x: controlPoint.prev.x, y: controlPoint.prev.y },
        endPoint: { x, y },
      });
    }
  });
}

function setSplineControlPoints(points) {
  for (let i = 0; i < points.length; i++) {
    const prev = points[i - 1] || points[i];
    const cur = points[i];
    const next = points[i + 1] || points[i];

    cur.controlPoint = getControlPoints(prev, cur, next);
  }
}

function getControlPoints(prev, cur, next) {
  const TENSION = 0.333;
  const d01 = getDistance(prev, cur);
  const d12 = getDistance(cur, next);
  const total = d01 + d12;

  const fa = (TENSION * d01) / total || 0;
  const fb = (TENSION * d12) / total || 0;

  const x1 = cur.x,
    y1 = cur.y;
  const x0 = prev.x,
    y0 = prev.y;
  const x2 = next.x,
    y2 = next.y;

  return {
    prev: {
      x: x1 - fa * (x2 - x0),
      y: y1 - fa * (y2 - y0),
    },
    next: {
      x: x1 + fb * (x2 - x0),
      y: y1 + fb * (y2 - y0),
    },
  };
}

function getDistance(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

export default drawSplineLine