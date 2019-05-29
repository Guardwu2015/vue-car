#define DARK_BLUE vec3(0.063, 0.075, 0.094)

uniform samplerCube tCube;
uniform float tFlip;
uniform vec3 color;
varying vec3 vWorldPosition;
void main() {
  // float multiColor = DARK_BLUE * light;
  gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );
  gl_FragColor.rgb *= color;
}