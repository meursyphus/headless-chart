import type { PieChartCustom } from '../types';
import { Text, type Widget } from '@meursyphus/flitter';

export function Title(...[{ name }]: Parameters<PieChartCustom['title']>): Widget {
	return Text(name);
}
