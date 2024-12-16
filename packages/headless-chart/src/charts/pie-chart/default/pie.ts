import { PieChartCustom } from "../types";
import { Container, Widget } from "@meursyphus/flitter";

export function Pie(
  ...[{ value, label, legend, index }]: Parameters<PieChartCustom["pie"]>
) {
  const totalValue = 100;
  const startAngle = index * (360 / totalValue);
  const sweepAngle = (value / totalValue) * 360;
  const endAngle = startAngle + sweepAngle;

  const radius = 75;
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  const x1 = 75 + radius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = 75 - radius * Math.sin((Math.PI * startAngle) / 180);
  const x2 = 75 + radius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = 75 - radius * Math.sin((Math.PI * endAngle) / 180);

  const pathData = `
  M ${radius} ${radius}
  L ${x1} ${y1}
  A ${radius}, ${radius} 0 ${largeArcFlag} 1 ${x2}, ${y2}
  Z 
  `;

  return Container({
    width: 150,
    height: 150,
    color: "black",
    key: index,
    child: new Widget({
      createElement: () => ({
        type: "svg",
        children: [
          {
            type: "path",
            props: {
              d: pathData,
              fill: `hsl(${index * 45}, 70%, 50%)`,
              title: `${label} (${legend})`,
            },
          },
        ],
      }),
    }),
  });
}
