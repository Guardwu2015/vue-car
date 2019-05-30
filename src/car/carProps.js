import Time from 'common/js/time'
import FF91 from 'car/constants'
import { normalizeQuadIn, zTween } from 'common/js/util'
import { Math as threeMath } from 'three'
export default class CarProps {
  constructor () {
    this.time = new Time()
    this.velocity = new THREE.Vector2()
    this.speed = 1
    this.accel = 0
    this.pos = new THREE.Vector2()
    // Momentum
    this.longitMomentum = 0
    this.lateralMomentum = 0
    this.wAngleInner = 0
    this.wAngleOuter = 0
    this.wAngleTarg = 0
    this.joyVec = new THREE.Vector2()
    this.keys = []
    this.braking = false
    this.headLights = 2
    this.omega = 0
    this.theta = 0
    this.ff91 = new FF91()
  }

  onKeyDown (evt) {
    // Add key to list if they don't exist yet
    if (this.keys.indexOf(evt.keyCode) === -1) {
      this.keys.push(evt.keyCode)
    }
  }

  onKeyUp (evt) {
    // Otherwise, remove from keys list
    this.keys.splice(this.keys.indexOf(evt.keyCode), 1)
  }

  readKeyboardInput () {
    for (var i = 0; i < this.keys.length; i++) {
      switch (this.keys[i]) {
        case 38: // Up
          this.accel += this.ff91.Accel
          // Simulate wind resistance as we reach top speed
          this.accel *= normalizeQuadIn(this.speed, this.ff91.MaxVel, this.ff91.MaxVel - 10)
          break
        case 40: // Down
          this.accel += this.ff91.Decel
          break
        case 37: // Left
          this.wAngleTarg += this.ff91.MaxTurn
          break
        case 39: // Right
          this.wAngleTarg -= this.ff91.MaxTurn
          break
      }
    }
  }

  /* **************** JOYSTICK EVENTS ******************** */
  // When joystick is moved on screen
  onJoystickMove (_vec) {
    this.joyVec.x = _vec.x / -40
    this.joyVec.y = _vec.y / -40
    if (Math.abs(this.joyVec.x) > 0.85) {
      this.joyVec.y = 0
    }
    if (Math.abs(this.joyVec.y) > 0.95) {
      this.joyVec.x = 0
    }
  }

  // When knob is moved in a card
  onKnobMove (_vec, _section) {
    this.joyVec.x = _vec.x / -150
    this.joyVec.y = _vec.y / -150
    if (_section === 5 && Math.abs(this.joyVec.x) < 0.1) {
      this.joyVec.x = 0
    }
  }

  readJoyStickInput () {
    this.wAngleTarg = this.joyVec.x * this.ff91.MaxTurn
    // Accelerating
    if (this.joyVec.y >= 0) {
      this.accel = this.joyVec.y * this.ff91.Accel
      // Simulate wind resistance as we reach top speed
      this.accel *= normalizeQuadIn(this.speed, this.ff91.MaxVel, this.ff91.MaxVel - 10)
    } else { // Braking
      this.accel = this.joyVec.y * -this.ff91.Decel
    }
  }

  changeHeadlights (_new) {
    this.headLights = threeMath.clamp(Math.round(_new), 0, 4)
  }

  update (_time) {
    // Update time, skips according to FPS
    if (this.time.update(_time) === false) {
      return false
    }
    this.accel = 0
    this.wAngleTarg = 0
    if (this.keys.length > 0) {
      this.readKeyboardInput()
    } else if (this.joyVec.x !== 0 || this.joyVec.y !== 0) {
      this.readJoyStickInput()
    }
    /* ****************** PHYSICS, YO *************************/
    this.accel *= this.time.delta
    this.speed += this.accel
    this.braking = (this.accel < 0)
    if (this.speed < 0) {
      this.speed = 0
      this.accel = 0
    }
    this.frameDist = this.speed * this.time.delta
    // Limit turn angle as speed increases
    this.wAngleTarg *= normalizeQuadIn(this.speed, this.ff91.MaxVel + 10.0, 3.0)
    this.wAngleInner = zTween(this.wAngleInner, this.wAngleTarg, this.time.delta * 2)
    this.wAngleSign = this.wAngleInner > 0.001 ? 1 : this.wAngleInner < -0.001 ? -1 : 0
    // Theta is based on speed, wheelbase & wheel angle
    this.omega = this.wAngleInner * this.speed / this.ff91.WheelBase
    this.theta += this.omega * this.time.delta
    // Calc this frame's XY velocity
    this.velocity.set(Math.cos(this.theta) * this.frameDist, -Math.sin(this.theta) * this.frameDist)
    // Add velocity to total position
    this.pos.add(this.velocity)
    // Fake some momentum
    this.longitMomentum = zTween(this.longitMomentum, this.accel / this.time.delta, this.time.delta * 6)
    this.lateralMomentum = this.omega * this.speed
    if (this.wAngleSign) {
      // Calculate 4 wheel turning radius if angle
      this.radFrontIn = this.ff91.WheelBase / Math.sin(this.wAngleInner)
      this.radBackIn = this.ff91.WheelBase / Math.tan(this.wAngleInner)
      this.radBackOut = this.radBackIn + (this.ff91.WheelTrack * this.wAngleSign)
      this.wAngleOuter = Math.atan(this.ff91.WheelBase / this.radBackOut)
      this.radFrontOut = this.ff91.WheelBase / Math.sin(this.wAngleOuter)
    } else {
      // Otherwise, just assign a very large radius.
      this.radFrontOut = 100
      this.radBackOut = 100
      this.radBackIn = 100
      this.radFrontIn = 100
      this.wAngleOuter = 0
    }
    return true
  }
}
