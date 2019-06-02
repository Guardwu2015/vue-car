import CarWheels from 'car/carWheels'
import CarLights from 'car/carLights'
import Motors from 'car/motors'
import Batts from 'car/batts'
export default class CarBody {
  constructor (_scene, _cargo) {
    this.parent = _scene
    this.carWhole = new THREE.Group()
    this.carWhole.position.x = -1.56
    this.parent.add(this.carWhole)
    this.carChassis = this.buildCarChassis(_cargo.getMesh('body'), _cargo.getCubeTexture('envReflection'))
    this.carWhole.add(this.carChassis)
    this.addShadow(_cargo.getTexture('shadow'))
    this.carLights = new CarLights(this.carChassis, _cargo)
    this.carWheels = new CarWheels(this.carWhole, _cargo)
    this.carMotors = new Motors(this.carChassis, _cargo.getMesh('xrays'))
    this.carBatts = new Batts(this.carWhole, _cargo.getMesh('xrays'))
  }

  // Creates black part of body
  buildCarChassis (_bodyGeom, _cubeText) {
    _bodyGeom.scale.set(0.0005, 0.0005, 0.0005)
    _bodyGeom.position.set(1.56, 0, 0)
    this.envCube = _cubeText
    this.envCube.format = THREE.RGBFormat
    // Material Body Color
    this.matBodySilver = new THREE.MeshStandardMaterial({
      color: 0xbbbbbb,
      metalness: 0.7,
      roughness: 0.7
    })

    // Workaround for browsers without Texture LevelOfDetail support
    if (window['EXT_STLOD_SUPPORT'] === false) { // 好神奇
      this.envCube.minFilter = THREE.LinearFilter
      this.matBodySilver.metalness = 0.05
      this.matBodySilver.roughness = 0.8
      this.matBodySilver.color = new THREE.Color(0x777777)
    }

    // Material Body Black
    this.matBodyBlack = new THREE.MeshLambertMaterial({
      color: 0x222222,
      reflectivity: 0.8,
      envMap: this.envCube
    })
    // Tinted windows
    this.matGlassTinted = new THREE.MeshLambertMaterial({
      color: 0x666666,
      reflectivity: 1,
      envMap: this.envCube
    })
    this.matUndercarriage = new THREE.MeshBasicMaterial({
      color: 0x000000
    })
    // Transparent glass
    this.matGlassTransp = new THREE.MeshLambertMaterial({
      color: 0x666666,
      reflectivity: 1.0,
      envMap: this.envCube,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // Car bodymaterials
    _bodyGeom.getObjectByName('BodyBlack').material = this.matBodyBlack
    _bodyGeom.getObjectByName('BodySilver').material = this.matBodySilver
    _bodyGeom.getObjectByName('GlassTransparent').material = this.matGlassTransp
    _bodyGeom.getObjectByName('GlassTinted').material = this.matGlassTinted
    _bodyGeom.getObjectByName('Undercarriage').material = this.matUndercarriage
    return _bodyGeom
  }

  addShadow (_shadow) {
    const shadowPlane = new THREE.PlaneBufferGeometry(6.5, 6.5, 1, 1)
    shadowPlane.rotateX(-Math.PI / 2)
    shadowPlane.translate(1.56, 0, 0)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: _shadow,
      blending: THREE.MultiplyBlending,
      transparent: true
    })
    const shadowMesh = new THREE.Mesh(shadowPlane, shadowMat)
    this.carWhole.add(shadowMesh)
  }

  /* ********************* PUBLIC METHODS ************************** */
  onWindowResize (_vpH) {
    this.carLights.onWindowResize(_vpH)
  }
  // Called once per frame
  update (_props) {
    // Apply car physics
    this.carWhole.rotation.y = _props.theta
    if (_props.longitMomentum !== 0) {
      this.carChassis.rotation.z = _props.longitMomentum * 0.0015
    }
    this.carChassis.rotation.x = _props.lateralMomentum * 0.002
    this.carWheels.update(_props)
    this.carLights.update(_props)
  }
}
