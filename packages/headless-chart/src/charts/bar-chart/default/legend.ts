import type { BarChartCustom } from '../types';
import * as Cartesian from '@shared/cartesian/index'

export function Legend(...args: Parameters<BarChartCustom['legend']>) {
	return Cartesian.Legend(args[0]);
}
