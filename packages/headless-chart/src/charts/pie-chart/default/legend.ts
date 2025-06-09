import { 
  Container, 
  Row, 
  Text, 
  SizedBox, 
  EdgeInsets, 
  BorderRadius, 
  BoxDecoration,
  TextStyle,
  type Widget 
} from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Legend = (
  { name, index }: { name: string; index: number },
  _: PieChartConfig
): Widget => {
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#F95738", "#20A39E"
  ];
  
  const colorHex = colors[index % colors.length];
  
  return Container({
    margin: EdgeInsets.only({ bottom: 5 }),
    child: Row({
      children: [
        Container({
          width: 15,
          height: 15,
          decoration: new BoxDecoration({
            color: colorHex,
            borderRadius: BorderRadius.circular(2),
          }),
        }),
        SizedBox({ width: 8 }),
        Text(name, {
          style: new TextStyle({
            fontSize: 14,
          }),
        }),
      ],
    }),
  });
};
