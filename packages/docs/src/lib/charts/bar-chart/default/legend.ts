import type { BarChartCustom } from '../types';
import { Text, TextStyle } from '@meursyphus/flitter';

export function Legend(...[{ name }]: Parameters<BarChartCustom['legend']>) {
	return Text(name, {
		style: new TextStyle({
			fontSize: 14
		})
	});
}
