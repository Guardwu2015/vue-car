import {
  TweenLite,
  Power2
} from 'gsap'
import { GOLDEN_RATIO } from 'car/constants'
import 'threes/CSS3DRenderer.js'
export default class Card {
  constructor (_scene) {
    this.prevSection = -1
    this.showing = false
    this.scene = _scene
    this.closeX = document.getElementById('closeX')
    this.stash = document.getElementById('dynamicContent')
    this.backgDOM = document.getElementById('cardBack')
    this.foregDOM = document.createElement('div')
    this.foregDOM.setAttribute('id', 'cardFore')
    this.foreg3D = new THREE.CSS3DObject(this.foregDOM)
    this.backg3D = new THREE.CSS3DObject(this.backgDOM)
    window['card'] = this.foreg3D
    window['rad'] = Math.PI / 180
    this.rot = new THREE.Euler()
    this.trans = new THREE.Vector3()
    this.contents = new Array(7)
  }

  /* ************************* PUBLIC METHODS *************************** */
  show (_id, _prop) {
    if (_id === 7) {
      return
    }
    if (this.showing) {
      this.hide()
    }
    TweenLite.killDelayedCallsTo(this.build)
    TweenLite.delayedCall(1.5, this.build, [_id, _prop], this)
  }

  hide () {
    if (!this.showing) {
      return
    }
    this.foregDOM.classList.remove('active')
    this.backgDOM.classList.remove('active')
    this.backgDOM.style.width = 0
    this.backgDOM.style.height = 0
  }

  setPosition (pos) {
    this.foreg3D.position.set(pos.x, pos.y, pos.z).multiplyScalar(GOLDEN_RATIO)
    this.backg3D.position.set(pos.x, pos.y, pos.z).multiplyScalar(GOLDEN_RATIO)
    // Push background back
    this.foreg3D.getWorldDirection(this.trans)
    this.backg3D.position.addScaledVector(this.trans, -100)
  }

  /* ************************* PRIVATE METHODS *************************** */
  build (_id, prop) {
    this.showing = true
    // Get contents from DOM
    if (this.contents[_id] === undefined) {
      this.contents[_id] = document.getElementById(`content-${prop.name}`)
    }
    // Stash previous content
    if (this.prevSection !== -1) {
      this.stash.appendChild(this.contents[this.prevSection])
    }
    // Replace with new content
    this.foregDOM.appendChild(this.contents[_id])
    this.foregDOM.appendChild(this.closeX)
    this.closeX.setAttribute('style', '')
    if (prop.inverted) {
      this.foregDOM.classList.add('inverted')
      this.backgDOM.classList.add('inverted')
    } else {
      this.foregDOM.classList.remove('inverted')
      this.backgDOM.classList.remove('inverted')
    }
    // Set rotation
    var rad = Math.PI / 180
    this.rot.set(prop.orientation.x * rad, prop.orientation.y * rad, prop.orientation.z * rad)
    this.foreg3D.rotation.copy(this.rot)
    this.backg3D.rotation.copy(this.rot)
    // Set position
    this.setPosition(prop.position)
    this.foregDOM.style.width = `${prop.size.w}px`
    this.foregDOM.style.height = `${prop.size.h}px`
    this.scene.add(this.foreg3D)
    this.scene.add(this.backg3D)
    // Animate in
    TweenLite.delayedCall(0.1, function () {
      this.foregDOM.classList.add('active')
      this.backgDOM.classList.add('active')
      this.backgDOM.style.width = `${prop.size.w + 40}px`
      this.backgDOM.style.height = `${prop.size.h + 40}px`
    }.bind(this))
    this.prevSection = _id
  }
}
