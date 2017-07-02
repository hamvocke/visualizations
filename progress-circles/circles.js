if (SVG.supported) {
  var draw = SVG('drawing').size(800, 600)
  
  progressCircle(180, 20, 'Build').animate()
  progressCircle(180, 60, 'Test')
  progressCircle(180, 100, 'Deploy Staging')
  
  function progressCircle(x, y, description) {
  	const circle = draw.circle(20)
    .move(x, y)
    .fill('#1a535c')
    
    const text = draw
    .text(description)
    .font({family: 'Helvetica', size: 16})
    .fill('#1a535c')
    .x(x + 40)
    .y(y + 5)
    
    function animate() {
      const pulse = draw.circle(28)
      .move(x - 4, y - 4)
      .fill('#4ecdc4')
      .back();
    
      pulse
      .animate({duration: '0.5s', ease: '<'})
      .radius(17)
      .loop(10, true)
      .after(function(situation) {
        const tickStart = [x + 5, y + 10];
        const tickBottom = [x + 8, y + 14];
        const tickEnd = [x + 14, y + 5];
        draw.polyline([tickStart])
        .fill('none')
        .stroke({ width: 3, color: '#f7fff7'})
        .animate({duration: '0.1s'})
        .plot([tickStart, tickBottom])
        .animate({duration: '0.1s'})
        .plot([tickStart, tickBottom, tickEnd])
      })
    }
    
    return {animate: animate}
  }
} else {
  alert('SVG not supported')
}
