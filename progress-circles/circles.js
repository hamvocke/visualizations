const pipeline = ((g, x, pipelineName, stageNames) => {
  let steps = {};
  let y = 20;
  let xSteps = x + 20;
  let ySteps = y + 60;

  const draw = () => {
    g.text(pipelineName)
      .font({family: 'Open Sans', size: 28, style: 'italic'})
      .fill('#333333')
      .x(x)
      .y(y);

    for(stage of stageNames) {
      steps[stage] = circle(g, xSteps, ySteps, stage);
      steps[stage].draw();
      ySteps += 40;
    }
  }

  return {
    steps: steps,
    draw: draw
  }
});

const circle = ((g, x, y, description) => {
  const size = 20;
  let circle;
  let text;
  let pulse;

  const draw = () => {
    circle = g.circle(size)
      .move(x, y)
      .fill('#1a535c');

    text = g.text(description)
      .font({family: 'Open Sans', size: 16})
      .fill('#333333')
      .x(x + size + 10)
      .cy(y + size / 2);

    pulse = g.circle(size + size * 0.4)
      .move(x - size * 0.2, y - size * 0.2)
      .fill('#4ecdc4')
      .back();
  }

  const animate = () => {draw
    return new Promise((resolve, reject) => {
      let duration = Math.floor(Math.random() * (10 - 4)) + 3;
      duration = duration % 2 != 0 ? duration + 1 : duration;

      pulse
        .animate({duration: '0.5s', ease: '<'})
        .radius(17)
        .loop(duration, true)
        .after((situation) => {
          check();
          resolve();
        })
    })
  }

  const check = () => {
    const tickStart = [x + size / 4, y + size / 2];
    const tickBottom = [x + size / 2, y + size / 4 * 3];
    const tickEnd = [x + size / 4 * 3, y + size / 4];
    g.polyline([tickStart])
      .fill('none')
      .stroke({ width: 3, color: '#f7fff7'})
      .animate({duration: '0.1s'})
      .plot([tickStart, tickBottom])
      .animate({duration: '0.1s'})
      .plot([tickStart, tickBottom, tickEnd]);
  }

  return {
    draw: draw,
    animate: animate
  };
});

const drawing = ((g) => {
  const stages = [
    'Build',
    'Unit Test',
    'Integration Test',
    'CDC Test',
    'Deploy Staging',
    'Acceptance Test',
    'Deploy Production'
  ]
  let pipelineElement = pipeline(g, 210, "Order Service", stages);
  let commitElement = commit(g)

  const draw = () => {
    g.clear();
    commitElement.draw();
    pipelineElement.draw();
  }

  const animate = () => {
    commitElement.animate()
       .then(() => pipelineElement.steps['Build'].animate())
       .then(() => pipelineElement.steps['Unit Test'].animate())
       .then(() => pipelineElement.steps['Integration Test'].animate())
       .then(() => pipelineElement.steps['CDC Test'].animate())
       .then(() => pipelineElement.steps['Deploy Staging'].animate())
       .then(() => pipelineElement.steps['Acceptance Test'].animate())
       .then(() => pipelineElement.steps['Deploy Production'].animate())
       .then(() => setTimeout(animation, 2000));
  }

  return {
    draw: draw,
    animate: animate
  }
});

const commit = (g) => {
  let commitElement;

  const draw = () => {
    commitElement = g.rect(50, 50)
      .fill('#333333')
      .move(10, 150);
  }

  const animate = () => {
    return new Promise((resolve, reject) => {
      commitElement.animate({duration: '0.6s', ease: '<>'})
        .move(150, 150)
        .after((situation) => {
          resolve();
        });
    })
  }

  return {
    draw: draw,
    animate: animate
  }
}

if (SVG.supported) {
  const g = SVG('drawing').size(1000, 600);
  const d = drawing(g);
  d.draw();
  d.animate();
} else {
  alert('SVG not supported');
}
