if (SVG.supported) {
  var draw = SVG('drawing').size(800, 600)
  
  const box = draw
  .rect(150, 100)
  .radius(10)
  .fill('#1a535c')
  
  const progress = draw
  .rect(0, 100)
  .radius(10)
  .fill('#4ecdc4')
  
  const buildText = draw
  .text('Build')
  .font({family: 'Helvetica', size: 24})
  .fill('#f7fff7')
  .center(75, 50)
 
  progress
  .animate({duration: '5s', ease: '<>' })
  .attr({'width': 150})
  .animate({duration: '0.3s', ease: '<>'})
  .attr({'fill': '#ff6b6b'})
} else {
  alert('SVG not supported')
}
