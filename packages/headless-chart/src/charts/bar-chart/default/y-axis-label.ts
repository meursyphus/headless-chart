import type { BarChartCustom } from '../types';
import { Text, TextStyle } from '@meursyphus/flitter';

export function YAxisLabel({ name }: Parameters<BarChartCustom['yAxisLabel']>[0]) {
	return Text(name, { style: new TextStyle({ fontSize: 12, color: 'black' }) });
}
