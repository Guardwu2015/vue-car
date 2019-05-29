import shaderVert from 'shaders/24_vert.glsl'
import shaderFrag from 'shaders/23_frag.glsl'
export default class Skybox {
  constructor (_scene, _color) {
    const boxGeom = new THREE.BoxBufferGeometry(1, 1, 1)
    this.boxMat = new THREE.ShaderMaterial({
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        color: {
          value: _color
        }
      },
      vertexShader: shaderVert,
      fragmentShader: shaderFrag,
      side: THREE.BackSide,
      depthTest: true,
      depthWrite: false,
      fog: false
    })
    var boxMesh = new THREE.Mesh(boxGeom, this.boxMat)
    boxGeom.removeAttribute('normal')
    boxGeom.removeAttribute('uv')
    _scene.add(boxMesh)
    boxMesh.onBeforeRender = function (renderer, scene, camera) {
      this.matrixWorld.copyPosition(camera.matrixWorld)
    }
  }

  updateLight (_newVal) {
    this.boxMat.uniforms.light.value = _newVal
  }

  setCubeTexture (_cubeTex) {
    this.boxMat.uniforms.tCube.value = _cubeTex
  }
}
