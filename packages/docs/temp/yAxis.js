import {
  Container,
  Column,
  Row,
  Text,
  TextStyle,
  EdgeInsets,
  StatefulWidget,
  State,
  AnimationController,
  CurvedAnimation,
  Curves,
  Transform,
  Offset,
  Opacity,
  ConstraintsTransformBox,
  Alignment,
  FractionallySizedBox,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
  SizedBox,
  Tween,
  VerticalDirection,
} from "@meursyphus/flitter";

function IgnoreHeight({ child, isEdge = false }) {
  return Container({
    height: 0,
    child: ConstraintsTransformBox({
      constraintsTransform: ConstraintsTransformBox.unconstrained,
      alignment: isEdge ? Alignment.bottomCenter : Alignment.center,
      child,
    }),
  });
}

class YAxis extends StatefulWidget {
  constructor({ line, labels, tick }) {
    super();
    this.line = line;
    this.labels = labels;
    this.tick = tick;
  }

  createState() {
    return new YAxisState();
  }
}

class YAxisState extends State {
  initState(context) {
    this.animationController = new AnimationController({ duration: 300 });
    this.animationController.addListener(() => {
      this.setState();
    });
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
    const { line, labels, tick } = this.widget;

    const VerticalLine = () => line;

    const Labels = () =>
      FractionallySizedBox({
        heightFactor: this.tweenAnimation.value,
        alignment: Alignment.bottomCenter,
        child: Column({
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.end,
          verticalDirection: VerticalDirection.up,
          children: labels.map((label) =>
            IgnoreHeight({ child: label })
          ),
        }),
      });

    const Ticks = () =>
      FractionallySizedBox({
        heightFactor: this.tweenAnimation.value,
        alignment: Alignment.bottomCenter,
        child: Column({
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: Array(labels.length + 1).fill(0).map(() => tick),
        }),
      });

    return Row({
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Labels(),
        SizedBox({ width: 8 }),
        Ticks(),
        VerticalLine(),
      ],
    });
  }
}

export default YAxis;
