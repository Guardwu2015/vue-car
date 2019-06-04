import motorVert from 'shaders/12_vert.glsl'
import motorFrag from 'shaders/11_frag.glsl'

import {
  TweenLite,
  Power2
} from 'gsap'
import { scaleAndCenter } from 'common/js/util'
import FF91 from 'car/constants'
export default class motors {
  constructor (_parent, _object) {
    this.showing = false
    this.parent = _parent
    // Get Geometry data
    this.motorFrontSm = _object.getObjectByName('MotorFront')
    this.geomFront = this.motorFrontSm.geometry
    this.motorBackR = _object.getObjectByName('MotorBack')
    this.geomBack = this.motorBackR.geometry
    this.buildMotors()
  }

  buildMotors () {
    // Scale and positioning
    const ff91 = new FF91()
    scaleAndCenter(this.geomFront, { z: ff91.WheelTrack / 6 }, 'xz')
    scaleAndCenter(this.geomBack, { z: ff91.WheelTrack / 4 }, 'xz')
    const wPosY = ff91.WheelDiam / 2
    const wPosF = ff91.WheelBase / 2

    this.motorBackL = this.motorBackR.clone(true)
    this.motorBackL.scale.x = -1
    this.motorBackL.rotateZ(Math.PI)
    this.motorBackL.position.set(-wPosF, wPosY, 0)
    this.motorBackR.position.set(-wPosF, wPosY, 0)
    this.motorFrontLg = this.motorBackR.clone(true)
    this.motorFrontLg.scale.y = -1
    this.motorFrontLg.scale.x = -1
    this.motorFrontLg.position.set(wPosF, wPosY, 0)
    this.motorFrontSm.position.set(wPosF, wPosY, -0.1)

    // Declare material
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        progress: {
          value: 0
        }
      },
      vertexShader: motorVert,
      fragmentShader: motorFrag,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    })
    this.progUniform = this.material.uniforms['progress']
    this.motorFrontSm.material =
      this.motorFrontLg.material =
      this.motorBackR.material =
      this.motorBackL.material = this.material
    this.group = new THREE.Group()
    this.group.visible = false
    this.group.add(this.motorBackR)
    this.group.add(this.motorBackL)
    this.group.add(this.motorFrontSm)
    this.group.add(this.motorFrontLg)
    this.group.scale.set(2000, 2000, 2000)
    this.group.position.setX(wPosF)
    this.parent.add(this.group)
  }

  /* *********************** SHOW/HIDE ************************** */
  show () {
    if (!this.showing) {
      this.showing = true
      this.group.visible = true
      TweenLite.killTweensOf(this)
      TweenLite.to(this.progUniform, 2.0, {
        value: 1.0,
        ease: Power2.easeOut
      })
    }
  }
  hide () {
    if (this.showing) {
      this.showing = false
      TweenLite.killTweensOf(this)
      TweenLite.to(this.progUniform, 1.0, {
        value: 0,
        ease: Power2.easeInOut,
        onComplete: function () {
          this.group.visible = false
        }.bind(this)
      })
    }
  };
}
