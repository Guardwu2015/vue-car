import { TweenLite, Power2 } from 'gsap'
import Card from 'threes/card'
import CarProps from 'car/carProps'
import Skybox from 'threes/skybox'
import { GOLDEN_RATIO } from 'car/constants'
import Mobile from 'car/mobile'
import Desktop from 'car/desktop'
import CarBody from 'car/carBody'
import Floor from 'threes/floor'
import 'threes/CSS3DRenderer.js'
export default class ViewTour {
  constructor (_scene, _renderer, _cam, _vp) {
    this.sceneWGL = _scene
    this.rendererWGL = _renderer
    // CSS Scene setup
    this.sceneCSS = new THREE.Scene()
    this.rendererCSS = new THREE.CSS3DRenderer()
    this.rendererCSS.setSize(_vp.x, _vp.y)
    document.getElementById('CSSCanvas').appendChild(this.rendererCSS.domElement)
    let camOptions = {
      distance: 6,
      focusPos: {
        x: 0,
        y: 1.0,
        z: 0
      },
      rotation: {
        x: -90,
        y: 0
      },
      distRange: {
        max: 7,
        min: 5
      },
      rotRange: {
        xMax: Number.POSITIVE_INFINITY,
        xMin: Number.NEGATIVE_INFINITY,
        yMax: 90,
        yMin: 0
      },
      smartUpdates: true
    }
    this.cam = _cam
    this.cam.readOptions(camOptions)
    this.sectionPrev = this.sectionActive = -1
    this.card = new Card(this.sceneCSS)
    this.carProps = new CarProps()
    this.dirLight = new THREE.DirectionalLight(0x000000, 0.7)
    this.dirLight.position.set(0, 1, 1)
    this.sceneWGL.add(this.dirLight)
    this.ambLight = new THREE.AmbientLight(0x000000, 0.5)
    this.sceneWGL.add(this.ambLight)
    this.skybox = new Skybox(this.sceneWGL, this.dirLight.color)
  }

  /* *********************** PRIVATE EVENTS ************************ */
  // Changes camera properties to those outlined in sectProps
  moveCamera (_cardProps) {
    if (this.sectionActive === -1) {
      return
    }
    var targetAX = this.cam.rotActual.x
    var targetAY = Math.max(this.cam.rotActual.y, 0)
    var minY = 0
    // Change target angles if defined
    if (_cardProps.camRot !== undefined) {
      targetAY = _cardProps.camRot.y
      minY = targetAY < 0 ? targetAY : 0
      var angleXDist = THREE.Math.euclideanModulo(_cardProps.camRot.x - this.cam.rotActual.x + 180, 360) - 180
      targetAX += (angleXDist < -180) ? angleXDist + 360 : angleXDist
    }
    // Animate angles if changed
    if (targetAX !== this.cam.rotActual.x || targetAY !== this.cam.rotActual.y) {
      TweenLite.to(this.cam.rotTarget, 2, {
        x: targetAX,
        y: targetAY
      })
    }
    let range = _cardProps.camRotRange
    // Limit range when defined
    if (range !== undefined) {
      this.cam.setRotRange(targetAX + range.x, targetAX - range.x, Math.min(targetAY + range.y, 90), Math.max(targetAY - range.y, minY))
    } else { // Otherwise, free range
      this.cam.setRotRange(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 90, 0)
    }
    // Set camera origin position
    TweenLite.to(this.cam.focusTarget, 2, _cardProps.camPos)
    TweenLite.to(this.cam, 2, {
      distTarget: _cardProps.camDist,
      onComplete: function () {
        this.cam.setDistRange(_cardProps.camDist + 1, _cardProps.camDist - 1)
      }.bind(this)
    })
  }
  /* *********************** PUBLIC EVENTS ************************ */
  // Initialize car and intro animation
  initMeshes (_cargo) {
    // const xrayMesh = _cargo.getMesh('xrays')
    this.car = new CarBody(this.sceneWGL, _cargo)
    this.floor = new Floor(this.sceneWGL, this.carProps.pos, _cargo)
    this.skybox.setCubeTexture(_cargo.getCubeTexture('envSkybox'))
    var freeProps = this.mobileView ? Mobile[7] : Desktop[7]
    TweenLite.to(this.dirLight.color, 3, { r: 1, g: 1, b: 1 })
    TweenLite.to(this.ambLight.color, 3, { r: 1, g: 1, b: 1 })
    TweenLite.to(this.cam.rotTarget, 3, { x: -125, y: 5 })
    TweenLite.to(this.cam.focusTarget, 3, { y: freeProps.camPos.y })
    TweenLite.to(this.cam, 3, { distTarget: freeProps.camDist })
    this.cam.setDistRange(freeProps.camDist + 1, freeProps.camDist - 1)
  }

  // All actions to go to new section
  goToSection (index) {
    let sectProps = this.mobileView ? Mobile[index] : Desktop[index]
    this.sectionPrev = this.sectionActive
    this.sectionActive = index
    if (sectProps.inverted === true) {
      TweenLite.to(this.dirLight.color, 1, { r: 0.063, g: 0.075, b: 0.094 })
      TweenLite.to(this.ambLight.color, 1, { r: 0.063, g: 0.075, b: 0.094 })
    } else {
      TweenLite.to(this.dirLight.color, 1, { r: 1, g: 1, b: 1 })
      TweenLite.to(this.ambLight.color, 1, { r: 1, g: 1, b: 1 })
    }
    if (this.sectionPrev === 1) {
      this.car.carBatts.hide()
    } else if (this.sectionPrev === 2) {
      this.car.carMotors.hide()
    }
    switch (index) {
      case 0: // Dimensions
        break
      case 1: // Battery
        this.car.carBatts.show()
        break
      case 2: // Powertrain
        this.car.carMotors.show()
        break
      case 3: // 4-wheel steering
      case 4: // Front
      case 5: // Rear
        TweenLite.to(this.carProps, 3, { speed: 0, ease: Power2.easeOut })
        break
      case 6: // Aerodynamics
        break
      case 7: // Free viewing
        this.card.hide()
        break
    }
    this.card.show(index, sectProps)
    this.moveCamera(sectProps)
  }

  enterFreeDriving (sectProps) {
    // this.cam.distTarget = sectProps.camDist
    TweenLite.to(this.cam.focusTarget, 1, sectProps.camPos)
    // TweenLite.to(this.cam, 1, {distTarget: sectProps.camDist})
    this.cam.setRotRange(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 90, 0)
  }

  knobMoved (_knobPos) {
    this.cam.forceUpdate = true
    this.carProps.onKnobMove(_knobPos, this.sectionActive)
  }

  frontLightsClicked (_index) {
    this.cam.forceUpdate = true
    this.carProps.changeHeadlights(_index)
  }

  onWindowResize (_vp) {
    this.rendererCSS.setSize(_vp.x, _vp.y)
    if (this.sectionActive === -1) {
      return
    }
    // Update view props if needed
    if (_vp.x <= _vp.y * 1.2 && this.mobileView !== true) {
      this.mobileView = true
      this.moveCamera(Mobile[this.sectionActive])
      this.card.setPosition(Mobile[this.sectionActive].position)
    } else if (_vp.x > _vp.y * 1.2 && this.mobileView !== false) {
      this.mobileView = false
      this.moveCamera(Desktop[this.sectionActive])
      this.card.setPosition(Desktop[this.sectionActive].position)
    }
  }

  update (t) {
    if (this.carProps.speed > 0 || this.carProps.wAngleInner !== 0 || this.carProps.longitMomentum !== 0) {
      this.cam.forceUpdate = true
    }
    if (this.cam.update() === false) {
      return false
    }
    this.carProps.update(t)
    this.car.update(this.carProps)
    this.dirLight.position.copy(this.cam.camera.position)
    this.dirLight.position.multiplyScalar(0.5)
    this.dirLight.position.y += 1
    this.rendererWGL.render(this.sceneWGL, this.cam.camera)
    this.cam.camera.position.multiplyScalar(GOLDEN_RATIO)
    this.rendererCSS.render(this.sceneCSS, this.cam.camera)
    return true
  }
}
