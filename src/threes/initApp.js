import Constrols from 'car/controls'
let constrol
export default function initApp () {
  constrol = new Constrols()
  render(window.performance.now())
}

function render (t) {
  constrol.update(t * 0.001)
  requestAnimationFrame(render)
}
