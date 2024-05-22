<script lang="ts">
	import Widget from '@meursyphus/flitter-svelte';
	import { BarChart, type BarChartCustom } from '@meursyphus/headless-chart';
	import {
		Text,
		Column,
		Container,
		EdgeInsets,
		Row,
		SizedBox,
		TextStyle,
		Padding,
		MainAxisSize,
		MainAxisAlignment,
		Flexible,
		Stack,
		Positioned,
		VerticalDirection,
		CrossAxisAlignment,
		FractionalTranslation,
		Offset,
		Opacity,
		FractionallySizedBox,
		Alignment,
		Transform,
		CustomPaint,
		Path,
		Rect,
		Size
	} from '@meursyphus/flitter';
	import { IgnoreSize } from '$lib/utils';
	const data = {
		labels: ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM'],
		datasets: [
			{
				legend: 'hot dog',
				values: [14, 189, 91, 51, 165, 24, 127]
			},
			{
				legend: 'burger',
				values: [56, 16, 47, 182, 68, 25, 131]
			},
			{
				legend: 'sandwich',
				values: [25, 48, 102, 92, 33, 140, 61]
			},
			{
				legend: 'kebab',
				values: [86, 156, 62, 22, 150, 59, 68]
			},
			{
				legend: 'fries',
				values: [35, 115, 188, 148, 84, 193, 177]
			},
			{
				legend: 'donut',
				values: [128, 70, 189, 48, 2, 77, 46]
			}
		].reverse()
	};
	const backgroundColors = ['#97e3d5', '#61cdbb', '#e8a838', '#f1e15b', '#f47560', '#e8c1a0'];

	function Layout(...[{ legends, plot, title }]: Parameters<BarChartCustom['layout']>) {
		return Container({
			padding: EdgeInsets.only({ left: 50, bottom: 70 }),
			child: Stack({
				children: [
					Positioned({
						bottom: -44,
						left: 0,
						right: 90,
						child: Row({
							mainAxisAlignment: MainAxisAlignment.center,
							children: [
								Text('country', {
									style: new TextStyle({
										fontSize: 14,
										color: '#666666',
										fontFamily: 'Noto Sans JP'
									})
								})
							]
						})
					}),
					Positioned({
						left: -58,
						top: 30,
						bottom: 0,
						child: Column({
							mainAxisAlignment: MainAxisAlignment.center,
							children: [
								Transform.rotate({
									angle: -Math.PI / 2,
									child: Text('food', {
										style: new TextStyle({
											fontSize: 14,
											color: '#666666',
											fontFamily: 'Noto Sans JP'
										})
									})
								})
							]
						})
					}),
					Positioned({
						top: 0,
						right: 0,
						child: Text('nivo 따라하기 ^^', {
							style: new TextStyle({
								fontSize: 14,
								color: '#999999',
								fontFamily: 'Noto Sans JP'
							})
						})
					}),
					Row({
						children: [
							Flexible({ flex: 1, child: plot }),
							SizedBox({ width: 20 }),
							Column({
								mainAxisAlignment: MainAxisAlignment.end,
								crossAxisAlignment: CrossAxisAlignment.start,
								children: legends
							})
						]
					})
				]
			})
		});
	}
	function XAxisLabel(...[{ name }]: Parameters<BarChartCustom['xAxisLabel']>) {
		return Column({
			mainAxisSize: MainAxisSize.min,
			children: [
				Container({
					width: 2,
					height: 6,
					color: '#BBBBBB'
				}),
				SizedBox({ height: 4 }),
				Text(name, {
					style: new TextStyle({
						fontFamily: 'Noto Sans JP',
						fontSize: 12,
						color: '#666666'
					})
				})
			]
		});
	}
	function YAxisLabel(...[{ name }]: Parameters<BarChartCustom['yAxisLabel']>) {
		return Padding({
			padding: EdgeInsets.only({ right: 4 }),
			child: Text(name, {
				style: new TextStyle({
					fontFamily: 'Noto Sans JP',
					fontSize: 12,
					color: '#666666'
				})
			})
		});
	}
	function XAxisTick(...[,]: Parameters<BarChartCustom['xAxisTick']>) {
		return SizedBox.shrink();
	}
	function YAxisTick(...[_]: Parameters<BarChartCustom['yAxisTick']>) {
		return Container({
			height: 2,
			width: 6,
			color: '#BBBBBB'
		});
	}
	export function YAxis({ labels, tick }: Parameters<BarChartCustom['yAxis']>[0]) {
		return Container({
			height: Infinity,
			child: Row({
				mainAxisSize: MainAxisSize.min,
				children: [
					Column({
						verticalDirection: VerticalDirection.up,
						mainAxisAlignment: MainAxisAlignment.spaceBetween,
						crossAxisAlignment: CrossAxisAlignment.end,
						children: labels.map((label, index) =>
							Opacity({
								opacity: labels.length - 1 === index ? 0 : 1,
								child: Row({
									mainAxisSize: MainAxisSize.min,
									children: [
										IgnoreSize({ child: label, ignoreHeight: true }),
										FractionalTranslation({
											translation: new Offset({ x: 0, y: index !== 0 ? 0 : 1 }),
											child: tick
										})
									]
								})
							})
						)
					})
				]
			})
		});
	}
	function xAxisLine(...[,]: Parameters<BarChartCustom['xAxisLine']>) {
		return Container({
			color: '#EEEEEE',
			height: 2,
			width: Infinity
		});
	}
	function Series(...[{ barGroups }, { scale }]: Parameters<BarChartCustom['series']>) {
		const count = (scale.max - scale.min) / scale.step;
		return Stack({
			children: [
				Column({
					mainAxisAlignment: MainAxisAlignment.spaceBetween,
					children: [
						...Array.from({ length: count + 1 }, (_, index) =>
							Container({
								height: 2,
								color: index !== count && index !== 0 ? '#EEEEEE' : 'transparent'
							})
						)
					]
				}),
				Container({
					height: Infinity,
					child: Row({
						crossAxisAlignment: CrossAxisAlignment.end,
						children: barGroups.map((barGroup) => Flexible({ flex: 1, child: barGroup }))
					})
				})
			]
		});
	}
	function Legend(...[{ name, index }]: Parameters<BarChartCustom['legend']>) {
		return Padding({
			padding: EdgeInsets.only({ top: 2 }),
			child: Row({
				mainAxisAlignment: MainAxisAlignment.center,
				mainAxisSize: MainAxisSize.min,
				children: [
					Container({
						width: 20,
						height: 20,
						color: backgroundColors[index]
					}),
					SizedBox({ width: 8 }),
					Text(name, {
						style: new TextStyle({ fontFamily: 'Noto Sans JP', fontSize: 12, color: '#777777' })
					})
				]
			})
		});
	}
	function Bar(...[{ label, legend, value }, { data }]: Parameters<BarChartCustom['bar']>) {
		const index = data.datasets.findIndex((dataset) => dataset.legend === legend);
		const backgroundColor = backgroundColors[index];
		return Container({
			width: Infinity,
			margin: EdgeInsets.symmetric({ horizontal: 11 }),
			height: Infinity,
			color: backgroundColor,
			child: Stack({
				alignment: Alignment.center,
				clipped: true,
				children: [
					CustomPaint({
						size: Size.maximum(),
						painter: {
							canvas: {
								paint(context, size) {
									if (legend === 'fries') {
										const path = new Path();
										context.canvas.fillStyle = '#38bcb2';
										for (let y = 2; y < size.height; y += 8) {
											for (let x = 2 + (y % 16) / 2; x < size.width; x += 10) {
												path.addOval(Rect.fromCircle({ center: new Offset({ x, y }), radius: 2 }));
											}
										}

										context.canvas.fill(path.toCanvasPath());
									}

									if (legend === 'sandwich') {
										const path = new Path();
										const { width, height } = size;
										const stripeWidth = 5;
										context.canvas.strokeStyle = '#eed312';
										context.canvas.lineWidth = stripeWidth;
										for (let y = -Math.max(width, height); y < Math.max(width, height); y += 12) {
											path.moveTo({ x: width, y: y });
											path.lineTo({ x: 0, y: y + width });
										}
										context.canvas.stroke(path.toCanvasPath());
									}
								}
							}
						}
					}),
					Text(value > 20 ? `${value}` : '', {
						style: new TextStyle({ fontFamily: 'Noto Sans JP', fontSize: 11, color: '#777777' })
					})
				]
			})
		});
	}

	function BarGroup(...[{ bars, values }, { scale }]: Parameters<BarChartCustom['barGroup']>) {
		const ratios = values.map((value) => value / (scale.max - scale.min));
		return Column({
			mainAxisAlignment: MainAxisAlignment.end,
			mainAxisSize: MainAxisSize.min,
			children: bars.map((bar, index) =>
				FractionallySizedBox({
					alignment: Alignment.bottomCenter,
					heightFactor: ratios[index],
					child: bar
				})
			)
		});
	}
</script>

<!-- <Widget
	width="470px"
	height="252px"
	widget={BarChart({
		data,
		title: 'no designed'
	})}
/> -->

<Widget
	width="632px"
	height="437px"
	renderer="canvas"
	widget={BarChart({
		data,
		getScale(data) {
			return {
				min: 0,
				step: 50,
				max: 700
			};
		},
		custom: {
			layout: Layout,
			bar: Bar,
			xAxisLabel: XAxisLabel,
			yAxisLabel: YAxisLabel,
			yAxisTick: YAxisTick,
			xAxisTick: XAxisTick,
			legend: Legend,
			xAxisLine: xAxisLine,
			yAxis: YAxis,
			series: Series,
			barGroup: BarGroup
		}
	})}
/>
