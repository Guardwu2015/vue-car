import {
  TweenLite,
  Power2
} from 'gsap'
import {
  Math as threeMath
} from 'three'
export default class CardControls {
  constructor (_parent) {
    this.parent = _parent
    this.closeX = document.getElementById('closeX')
    this.frontButtons = document.getElementsByClassName('frontLightBut')
    this.powerKnob = document.getElementById('powerKnob')
    this.steerKnob = document.getElementById('steerKnob')
    this.rearKnob = document.getElementById('rearKnob')
    this.activeKnob = null
    this.knobPos = new THREE.Vector2()
    for (let i = 0; i < this.frontButtons.length; i++) {
      this.frontButtons[i].addEventListener('click', this.frontLightClick.bind(this, i), false)
    }
    this.closeX.addEventListener('click', this.closeXClick.bind(this), false)
    this.powerKnob.addEventListener('mousedown', this.mousedownKnob.bind(this, 0), true)
    this.powerKnob.addEventListener('touchstart', this.mousedownKnob.bind(this, 0), true)
    this.steerKnob.addEventListener('mousedown', this.mousedownKnob.bind(this, 1), true)
    this.steerKnob.addEventListener('touchstart', this.mousedownKnob.bind(this, 1), true)
    this.rearKnob.addEventListener('mousedown', this.mousedownKnob.bind(this, 2), true)
    this.rearKnob.addEventListener('touchstart', this.mousedownKnob.bind(this, 2), true)
  }

  /* ******************************* TOUCHY THE KNOB ******************************* */
  mousedownKnob (index, event) {
    switch (index) {
      case 0:
        this.activeKnob = this.powerKnob
        break
      case 1:
        this.activeKnob = this.steerKnob
        break
      case 2:
        this.activeKnob = this.rearKnob
        break
      default:
        this.activeKnob = this.powerKnob
        break
    }
    this.parent.knobMouseDown()
  }

  knobMoved (xDisp, yDisp) {
    switch (this.activeKnob) {
      case this.powerKnob:
        this.knobPos.set(0, threeMath.clamp(yDisp, -150, 150))
        this.renderKnobPos()
        break
      case this.steerKnob:
        this.knobPos.set(threeMath.clamp(xDisp, -150, 150), 0)
        this.renderKnobPos()
        break
      case this.rearKnob:
        this.knobPos.set(threeMath.clamp(xDisp, -150, 150), threeMath.clamp(yDisp, 0, 10))
        this.renderKnobPos()
        break
    }
  }

  knobReleased () {
    TweenLite.to(this.knobPos, 0.5, {
      x: 0,
      y: 0,
      onUpdate: this.renderKnobPos.bind(this)
    })
  }

  renderKnobPos () {
    if (this.activeKnob !== null) {
      this.activeKnob.setAttribute('transform', `translate(${this.knobPos.x}, ${this.knobPos.y})`)
      this.parent.knobMouseMoved(this.knobPos)
    }
  }

  /* ******************************** BUTTON CLICKS ***************************** */
  // Front Lighting controls
  frontLightClick (_index, _evt) {
    if (this.frontButtons[_index].classList.contains('active')) {
      for (let i = _index; i < this.frontButtons.length; i++) {
        this.frontButtons[i].classList.remove('active')
      }
      this.parent.frontLightsChanged(_index)
    } else {
      for (let i = 0; i < this.frontButtons.length; i++) {
        if (i <= _index) {
          this.frontButtons[i].classList.add('active')
        } else {
          this.frontButtons[i].classList.remove('active')
        }
      }
      this.parent.frontLightsChanged(_index + 1)
    }
  }

  closeXClick (e) {
    this.parent.exitSection()
  }
}
