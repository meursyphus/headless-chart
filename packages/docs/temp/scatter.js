import { Transform, CustomPaint, Path, Rect, Offset, StatefulWidget, State,  Animation, AnimationController, CurvedAnimation, Curves, Tween } from "@meursyphus/flitter";
import defaultColors from "./colors";

const SHAPES = ["circle", "star", "square", "triangle"];

function Scatter({
  color,
  shape = "circle",
  size = 8,
}) {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => {
          return {
            scatter: context.createSvgEl("path"),
          };
        },
        paint: ({ scatter }) => {
          const path = createShapePath({ shape, size });
          scatter.setAttribute("fill", "none");
          scatter.setAttribute("stroke", color);
          scatter.setAttribute("stroke-width", "1");
          scatter.setAttribute("d", path.getD());
        },
      },
    },
  });
}

function createShapePath({
  shape,
  size,
}) {
  const path = new Path();
  const halfSize = size / 2;

  switch (shape) {
    case "circle": {
      path.addOval(Rect.fromCircle({ center: new Offset({ x: 0, y: 0 }), radius: halfSize }));
      break;
    }
    case "star": {
      const outerRadius = halfSize;
      const innerRadius = halfSize * 0.4;
      const points = 5;
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points;
        const px = radius * Math.sin(angle);
        const py = -radius * Math.cos(angle);
        
        if (i === 0) {
          path.moveTo({ x: px, y: py });
        } else {
          path.lineTo({ x: px, y: py });
        }
      }
      path.close();
      break;
    }
    case "square": {
      path.moveTo({ x: -halfSize, y: -halfSize });
      path.lineTo({ x: halfSize, y: -halfSize });
      path.lineTo({ x: halfSize, y: halfSize });
      path.lineTo({ x: -halfSize, y: halfSize });
      path.close();
      break;
    }
    case "triangle": {
      const height = size * Math.sqrt(3) / 2;
      path.moveTo({ x: 0, y: -halfSize });
      path.lineTo({ x: halfSize, y: height/2 });
      path.lineTo({ x: -halfSize, y: height/2 });
      path.close();
      break;
    }
  }

  return path;
}


class AnimatedScatter extends StatefulWidget {
  label;
  legend;
  index;
  scale;

  constructor({ label, legend, index, scale }) {
    super();
    this.label = label;
    this.legend = legend;
    this.index = index;
    this.scale = scale;
  }

  createState() {
    return new AnimatedScatterState();
  }
}

class AnimatedScatterState extends State {
  initState(context) {
    this.animationController = new AnimationController({ duration: 300 });
    this.animationController.addListener(() => {
      this.setState();
    });
    const tween = new Tween({ begin: 0, end: 1 });
    this.scaleAnimation = tween.animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeInOut,
      })
    );
    this.animationController.forward();
  }

  build(context) {
    const { index } = this.widget;
    const color = defaultColors[index % defaultColors.length];
    const shape = SHAPES[index % SHAPES.length];
    
    return Transform.scale({
      scale: this.scaleAnimation.value,
      child: Scatter({
        color,
        shape,
        size: 8,
      }),
    });
  }
}

export default AnimatedScatter;
