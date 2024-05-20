import type { BarChartCustom } from '../types';
import { Text, TextStyle } from '@meursyphus/flitter';

export function XAxisLabel({ name }: Parameters<BarChartCustom['xAxisLabel']>[0]) {
	return Text(name, { style: new TextStyle({ fontSize: 12, color: 'black' }) });
}
