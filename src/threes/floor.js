import vShader from 'shaders/20_vert.glsl'
import fShader from 'shaders/19_frag.glsl'
export default class Floor {
  constructor (_scene, _pos, _cargo) {
    this.scene = _scene
    this.pos = _pos
    this.led = _cargo.getTexture('led')
    this.led.minFilter = THREE.LinearFilter
    this.led.format = THREE.AlphaFormat
    const planeGeom = new THREE.PlaneGeometry(10, 10, 30, 30)
    const planeMat = new THREE.RawShaderMaterial({
      uniforms: {
        led: { value: this.led },
        origin: { value: this.pos }
      },
      vertexShader: vShader,
      fragmentShader: fShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.MultiplyBlending
    })
    this.plane = new THREE.Mesh(planeGeom, planeMat)
    this.plane.position.setY(0.01)
    this.plane.rotateX(-Math.PI / 2)
    this.scene.add(this.plane)
    // this.addEdge()
  }

  addEdge () {
    const edgeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    })
    const edgeGeom = new THREE.PlaneGeometry(10, 10, 10, 10)
    const edge = new THREE.Mesh(edgeGeom, edgeMat)
    edge.rotateX(-Math.PI / 2)
    this.scene.add(edge)
  }
}
