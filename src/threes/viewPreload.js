import {
  TweenLite,
  Power2
} from 'gsap/TweenMax'
import Grid from 'threes/grid'
import { normalize, zTween } from 'common/js/util'
export default class ViewPreload {
  constructor (_scene, _renderer, _cam, _vp) {
    this.sceneWGL = _scene
    this.rendererWGL = _renderer
    this.cam = _cam
    this.vp = _vp
    this.prog = 0
    this.progTarget = 1
    this.mouse = new THREE.Vector2()
    this.grid = new Grid(this.sceneWGL)
  }

  // user moves mouse
  onMouseMove (event) {
    this.mouse.x = normalize(event.clientX, 0, this.vp.x)
    this.mouse.y = normalize(event.clientY, 0, this.vp.y)
    this.grid.onMouseMove(this.mouse.x, this.mouse.y)
  }

  onWindowResize (_vp) {
    this.vp.copy(_vp)
    this.grid.onWindowResize(this.vp.x, this.vp.y)
  }

  exitAnimation (_callback) {
    TweenLite.to(this, 2.0, {
      progTarget: -0.2,
      ease: Power2.easeInOut,
      onComplete: function () {
        this.sceneWGL.children = []
        _callback()
      }.bind(this)
    })
  }

  update (_time) {
    this.prog = zTween(this.prog, this.progTarget, _time * 0.01)
    this.grid.update(_time, this.prog)
    this.cam.update()
    this.rendererWGL.render(this.sceneWGL, this.cam.camera)
    return true
  }
}
