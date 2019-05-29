export default class CamControl {
  constructor (_options) {
    this.forceUpdate = true
    // Default options
    this.options = {
      distance: 90,
      focusPos: new THREE.Vector3(),
      rotation: new THREE.Vector3(),
      rotRange: {
        xMax: Number.POSITIVE_INFINITY,
        xMin: Number.NEGATIVE_INFINITY,
        yMax: 90,
        yMin: -90
      },
      distRange: {
        max: Number.POSITIVE_INFINITY,
        min: Number.NEGATIVE_INFINITY
      },
      fov: 45,
      eyeSeparation: 1.5,
      smartUpdates: false
    }
    this.readOptions(_options)
    this.vpW = window.innerWidth
    this.vpH = window.innerHeight
    // Helpers to calculate rotations
    this.quatX = new THREE.Quaternion()
    this.quatY = new THREE.Quaternion()
    this.camHolder = new THREE.Object3D()
    this.gyro = {
      orient: 0
    }
    // Set default orientation for accelerator rotations
    if (window.orientation !== undefined) {
      this.defaultEuler = new THREE.Euler(90 * CamControl.RADIANS, 180 * CamControl.RADIANS, (180 + parseInt(window.orientation.toString(), 10)) * CamControl.RADIANS)
    } else {
      this.defaultEuler = new THREE.Euler(0, 0, 0)
    }

    // Constants
    this.RADIANS = Math.PI / 180
    this.AXIS_X = new THREE.Vector3(1, 0, 0)
    this.AXIS_Y = new THREE.Vector3(0, 1, 0)
  }

  readOptions (_options) {
    // Replace defaults with custom options
    const opt = this.options
    for (let key in _options) {
      if (key === 'rotRange') {
        for (let index in _options.rotRange) {
          opt.rotRange[index] = _options.rotRange[index]
        }
      } else if (key === 'distRange') {
        for (let index in _options.distRange) {
          opt.distRange[index] = _options.distRange[index]
        }
      } else if (key === 'focusPos') {
        for (let index in _options.focusPos) {
          opt.focusPos[index] = _options.focusPos[index]
        }
      } else if (key === 'rotation') {
        for (let index in _options.rotation) {
          opt.rotation[index] = _options.rotation[index]
        }
      } else {
        opt[key] = _options[key]
      }
    }
    // Set attributes from options
    this.distActual = opt.distance
    this.distTarget = opt.distance
    this.focusActual = new THREE.Vector3(opt.focusPos.x, opt.focusPos.y, opt.focusPos.z)
    this.focusTarget = this.focusActual.clone()
    this.rotActual = new THREE.Vector3(opt.rotation.x, opt.rotation.y, opt.rotation.z)
    this.rotTarget = this.rotActual.clone()
  }

  /* ****************** SETTERS ***************** */
  // Sets distance from focusPos
  setDistance (dist) {
    this.distTarget = dist
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max)
    this.forceUpdate = true
  }
  setDistRange (max, min) {
    this.options.distRange.max = max
    this.options.distRange.min = min
  }

  // Sets angle of rotation
  setRotation (_rotX, _rotY, _rotZ) {
    if (_rotX === void 0) {
      _rotX = 0
    }
    if (_rotY === void 0) {
      _rotY = 0
    }
    if (_rotZ === void 0) {
      _rotZ = 0
    }
    this.rotActual.set(_rotX, _rotY, _rotZ)
    this.rotTarget.set(_rotX, _rotY, _rotZ)
    this.gyro.alpha = undefined
    this.gyro.beta = undefined
    this.gyro.gamma = undefined
    this.forceUpdate = true
  }

  // Sets max and min angles of orbit
  setRotRange (xMax, xMin, yMax, yMin) {
    this.options.rotRange.xMax = (xMax !== undefined) ? xMax : this.options.rotRange.xMax
    this.options.rotRange.xMin = (xMin !== undefined) ? xMin : this.options.rotRange.xMin
    this.options.rotRange.yMax = (yMax !== undefined) ? yMax : this.options.rotRange.yMax
    this.options.rotRange.yMin = (yMin !== undefined) ? yMin : this.options.rotRange.yMin
  }

  // Clears rotation range restrictions
  clearRotRange () {
    this.options.rotRange.xMax = Number.POSITIVE_INFINITY
    this.options.rotRange.xMin = Number.NEGATIVE_INFINITY
    this.options.rotRange.yMax = Number.POSITIVE_INFINITY
    this.options.rotRange.yMin = Number.NEGATIVE_INFINITY
  }

  // Sets focus position
  setFocusPos (_posX, _posY, _posZ) {
    if (_posX === void 0) {
      _posX = 0
    }
    if (_posY === void 0) {
      _posY = 0
    }
    if (_posZ === void 0) {
      _posZ = 0
    }
    this.focusActual.set(_posX, _posY, _posZ)
    this.focusTarget.set(_posX, _posY, _posZ)
    this.forceUpdate = true
  }

  // Get distance
  getDistance () {
    return this.distTarget
  }

  /* ******************** MOTION *********************** */
  // Camera travels away or toward focusPos
  dolly (distance) {
    this.distTarget += distance
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max)
  }

  // Camera orbits by an angle amount
  orbitBy (angleX, angleY) {
    this.rotTarget.x += angleX
    this.rotTarget.y += angleY
    this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax)
    this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax)
  }

  // Camera orbits to an angle
  orbitTo (angleX, angleY) {
    this.rotTarget.x = angleX
    this.rotTarget.y = angleY
    this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax)
    this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax)
  }

  // FocusPos moves along the XY axis
  pan (distX, distY) {
    this.focusTarget.x -= distX
    this.focusTarget.y += distY
  }

  /* **************** DOM EVENTS ******************** */
  // Window resize triggered
  onWindowResize (vpW, vpH) {
    this.vpW = vpW
    this.vpH = vpH
    this.forceUpdate = true
  }

  // Landscape-portrait change on mobile devices
  onDeviceReorientation (orientation) {
    this.gyro.orient = orientation * CamControl.RADIANS
    this.forceUpdate = true
  }

  // Set accelerometer data on motion
  onGyroMove (alpha, beta, gamma) {
    let acc = this.gyro
    // Alpha = z axis [0 ,360]
    // Beta = x axis [-180 , 180]
    // Gamma = y axis [-90 , 90]
    acc.alpha = alpha
    acc.beta = beta
    acc.gamma = gamma
  }

  /* ********************* UPDATES ************************** */
  follow (target) {
    // Place camera on focus position
    this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max)
    this.distActual += (this.distTarget - this.distActual) * 0.01
    this.focusTarget.set(target.x, target.y + 1.0, target.z + this.distActual)
    this.focusActual.lerp(this.focusTarget, 0.01)
    this.camHolder.position.copy(this.focusActual)
    this.camHolder.lookAt(target)
  }

  // Checks if significant changes have taken place
  changesOccurred () {
    if (this.options.smartUpdates &&
      this.rotActual.manhattanDistanceTo(this.rotTarget) < 0.01 &&
      Math.abs(this.distActual - this.distTarget) < 0.01 &&
      this.focusActual.manhattanDistanceTo(this.focusTarget) < 0.01) {
      // No changes
      return false
    }
    return true
  }
}
