import {
  Container,
  Row,
  Column,
  StatefulWidget,
  State,
  AnimationController,
  CurvedAnimation,
  Curves,
  ConstraintsTransformBox,
  Alignment,
  FractionallySizedBox,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
  SizedBox,
  Tween,
} from "@meursyphus/flitter";

function IgnoreChildWidth({ child, isEdge = false }) {
  return Container({
    width: 0,
    child: ConstraintsTransformBox({
      constraintsTransform: ConstraintsTransformBox.unconstrained,
      alignment: isEdge ? Alignment.centerRight : Alignment.center,
      child,
    }),
  });
}

class XAxis extends StatefulWidget {
  constructor({ line, labels, tick }) {
    super();
    this.line = line;
    this.labels = labels;
    this.tick = tick;
  }

  createState() {
    return new XAxisState();
  }
}

class XAxisState extends State {
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

    const HorizontalLine = () => line;

    const Labels = () =>
      FractionallySizedBox({
        widthFactor: this.tweenAnimation.value,
        alignment: Alignment.centerRight,
        child: Row({
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: labels.map((label) =>
            IgnoreChildWidth({ child: label })
          ),
        }),
      });

    const Ticks = () =>
      FractionallySizedBox({
        widthFactor: this.tweenAnimation.value,
        alignment: Alignment.centerRight,
        child: Row({
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: Array(labels.length).fill(0).map(() => tick),
        }),
      });

    return Column({
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HorizontalLine(),
        Ticks(),
        SizedBox({ height: 8 }),
        Labels(),
      ],
    });
  }
}

export default XAxis;
