import CamControl from 'threes/camControl'
import { zTween } from 'common/js/util'

export default class Monoc extends CamControl {
  constructor (_options) {
    super(_options)
    this.camera = new THREE.PerspectiveCamera(_options.fov, super.vpW / super.vpH, 0.1, 100)
  }

  /* ******************** DOM EVENTS ****************** */
  onWindowResize (vpW, vpH) {
    super.onWindowResize.call(this, vpW, vpH)
    this.camera.aspect = this.vpW / this.vpH
    this.camera.updateProjectionMatrix()
  }

  // Called once per frame
  update () {
    if (!this.forceUpdate && !this.changesOccurred()) {
      return false
    }
    // Focus point
    this.focusActual.lerp(this.focusTarget, 0.05)
    this.camera.position.copy(this.focusActual)
    // Accelerometer orientation
    if (this.gyro.alpha && this.gyro.beta && this.gyro.gamma) {
      // Calculate camera rotations
      this.camera.setRotationFromEuler(this.defaultEuler)
      this.camera.rotateZ(this.gyro.alpha * super.RADIANS)
      this.camera.rotateX(this.gyro.beta * super.RADIANS)
      this.camera.rotateY(this.gyro.gamma * super.RADIANS)
      this.camera.rotation.z += this.gyro.orient
    } else { // If no accelerometer data
      // Rotation angles
      this.rotActual.lerp(this.rotTarget, 0.05)
      this.quatX.setFromAxisAngle(this.AXIS_X, -THREE.Math.degToRad(this.rotActual.y))
      this.quatY.setFromAxisAngle(this.AXIS_Y, -THREE.Math.degToRad(this.rotActual.x))
      this.quatY.multiply(this.quatX)
      this.camera.quaternion.copy(this.quatY)
    }
    // Set camera distance from focus position
    if (this.distActual !== this.distTarget) {
      this.distActual = zTween(this.distActual, this.distTarget, 0.05)
    }
    this.camera.translateZ(this.distActual)
    this.forceUpdate = false
    return true
  }
}
