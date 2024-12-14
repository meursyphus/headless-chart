// Series.js
import {
  Stack,
  Positioned,
  StatefulWidget,
  State,
  AnimationController,
  Tween,
  CurvedAnimation,
  ClipRect,
  Rect,
  Curves,
} from "@meursyphus/flitter";

export default class Series extends StatefulWidget {
  constructor({ areas }) {
    super();
    this.areas = areas;
  }

  createState() {
    return new SeriesState();
  }
}

class SeriesState extends State {
  animationController;
  tweenAnimation;

  initState(context) {
    // 0.5초(500ms)짜리 애니메이션
    this.animationController = new AnimationController({ duration: 500 });
    this.animationController.addListener(() => this.setState());

    const tween = new Tween({ begin: 0, end: 1 });
    this.tweenAnimation = tween.animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeInOut,
      })
    );

    this.animationController.forward();
  }

  build(context) {
    const { areas } = this.widget;

    // ClipRect로 width * tweenAnimation.value만큼만 보이게 자른다.
    return ClipRect({
      clipped: true,
      clipper: ({ width, height }) =>
        Rect.fromLTWH({
          left: 0,
          top: 0,
          width: width * this.tweenAnimation.value,
          height,
        }),
      child: Stack({
        children: areas.map((area) =>
          Positioned.fill({
            child: area,
          })
        ),
      }),
    });
  }
}
