import type { BarChartCustom } from '../types';
import { Text } from '@meursyphus/flitter';

export function Title({ name }: Parameters<BarChartCustom['title']>[0]) {
	return Text(name);
}
