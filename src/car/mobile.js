import Desktop from './desktop'
const Mobile = JSON.parse(JSON.stringify(Desktop))
// Dimensions
Mobile[1].camDist = 6.5
// Powertrain
Mobile[2].position = {
  x: 0,
  y: 2.8,
  z: 0.9
}
Mobile[2].camPos = {
  x: -1,
  y: 1.5,
  z: 1
}
// Steering
Mobile[3].position = {
  x: 2,
  y: 2.8,
  z: -1.5
}
Mobile[3].camRot = {
  x: 95,
  y: 0
}
Mobile[3].camPos = {
  x: -1,
  y: 1.5,
  z: -1.5
}
// Rear Lighting
Mobile[5].position = {
  x: 0,
  y: 3,
  z: 0
}
Mobile[5].camDist = 5
// Aerodynamics
Mobile[6].position = {
  x: 0,
  y: 3,
  z: 3
}
Mobile[6].camPos = {
  x: 0,
  y: 2,
  z: 0
}
Mobile[6].camDist = 9
Mobile[7].camDist = 8

export default Mobile
