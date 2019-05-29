import {
  TweenLite,
  Power2
} from 'gsap'

import {
  scaleAndCenter
} from 'common/js/util'
import FF91 from 'car/constants'

export default class Batts {
  constructor (_parent, _object) {
    this.showing = false
    this.parent = _parent
    // Set up singleGeom for cloning
    this.singleBatt = _object.getObjectByName('Batt')
    this.singleGeom = this.singleBatt.geometry
    scaleAndCenter(this.singleGeom, {
      x: new FF91().WheelBase * 0.65 / 6
    })
    this.singleGeom.computeVertexNormals()
    this.cloneBatts()
  }

  cloneBatts () {
    // Clone stringGeom attributes from singleGeom
    this.stringGeom = new THREE.InstancedBufferGeometry()
    this.stringGeom.index = this.singleGeom.index
    this.stringGeom.attributes.position = this.singleGeom.attributes.position
    this.stringGeom.attributes.normal = this.singleGeom.attributes.normal

    // Make new stringGeom attributes
    let offsets = []
    let battID = []
    const ff91 = new FF91()
    let xSpacing = ff91.WheelBase * 0.7 / 6
    let zSpacing = ff91.WheelTrack * 0.7 / 6
    for (let x = 0, i = 0; x < 6; x++) {
      for (let z = 0; z < 6; z++, i++) {
        // offsets
        offsets.push(-x * xSpacing, z * zSpacing, 0)
        battID.push(i)
      }
    }
    this.stringGeom.addAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
    this.stringGeom.addAttribute('battID', new THREE.InstancedBufferAttribute(new Float32Array(battID), 1))

    // Declare material
    this.stringMat = new THREE.RawShaderMaterial({
      uniforms: {
        progress: { value: 0 }
      },
      // vertexShader: battVert,
      // fragmentShader: battFrag,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      side: THREE.BackSide
    })
    this.progUniform = this.stringMat.uniforms['progress']

    // Build mesh
    this.stringMesh = new THREE.Mesh(this.stringGeom, this.stringMat)
    this.stringMesh.position.set(0.65, 0.35, -0.5)
    this.stringMesh.visible = false
    this.parent.add(this.stringMesh)
  }

  show () {
    if (!this.showing) {
      this.showing = true
      this.stringMesh.visible = true
      TweenLite.killTweensOf(this)
      TweenLite.to(this.progUniform, 1, {
        value: 36 + 4,
        ease: Power2.easeInOut
      })
    }
  }

  hide () {
    if (this.showing) {
      this.showing = false
      TweenLite.killTweensOf(this)
      TweenLite.to(this.progUniform, 1, {
        value: 0,
        ease: Power2.easeInOut,
        onComplete: function () {
          this.stringMesh.visible = false
        }.bind(this) })
    }
  }
}
