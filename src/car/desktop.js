export default [
  {
    name: 'dimensions',
    size: {
      w: 930,
      h: 480
    },
    position: {
      x: 2,
      y: -1,
      z: 1
    },
    orientation: {
      x: -45,
      y: 35,
      z: 30
    },
    camDist: 6,
    camPos: {
      x: 2,
      y: 0,
      z: 1
    },
    camRot: {
      x: -45,
      y: 20
    },
    camRotRange: {
      x: 10,
      y: 10
    }
  },
  {
    name: 'battery',
    size: {
      w: 1000,
      h: 550
    },
    position: {
      x: 0,
      y: 0,
      z: 2.3
    },
    orientation: {
      x: -90,
      y: 0,
      z: 0
    },
    camDist: 5.7,
    camPos: {
      x: 0,
      y: 0.5,
      z: 1
    },
    camRot: {
      x: 0,
      y: 80
    },
    camRotRange: {
      x: 40,
      y: 50
    }
  },
  {
    name: 'powertrain',
    size: {
      w: 800,
      h: 540
    },
    position: {
      x: 2,
      y: 1.0,
      z: 2.8
    },
    orientation: {
      x: 0,
      y: -90,
      z: 0
    },
    camDist: 5,
    camPos: {
      x: -1,
      y: 1,
      z: 1.5
    },
    camRot: {
      x: 80,
      y: 0
    },
    camRotRange: {
      x: 10,
      y: 30
    }
  },
  {
    name: 'steering',
    size: {
      w: 900,
      h: 570
    },
    position: {
      x: 2,
      y: 1.0,
      z: -2.75
    },
    orientation: {
      x: 0,
      y: -90,
      z: 0
    },
    camDist: 5,
    camPos: {
      x: -1,
      y: 1,
      z: -1.5
    },
    camRot: {
      x: 100,
      y: 0
    },
    camRotRange: {
      x: 10,
      y: 10
    }
  },
  {
    name: 'front-lighting',
    size: {
      w: 930,
      h: 520
    },
    position: {
      x: 0,
      y: 2.8,
      z: 0
    },
    orientation: {
      x: 0,
      y: 90,
      z: 0
    },
    camDist: 5,
    camPos: {
      x: 1,
      y: 1.2,
      z: 0
    },
    camRot: {
      x: -90,
      y: -5
    },
    camRotRange: {
      x: 30,
      y: 0
    },
    inverted: true
  },
  {
    name: 'rear-lighting',
    size: {
      w: 900,
      h: 400
    },
    position: {
      x: 0,
      y: 2.8,
      z: 0
    },
    orientation: {
      x: 0,
      y: -90,
      z: 0
    },
    camDist: 4,
    camPos: {
      x: -1,
      y: 1.5,
      z: 0
    },
    camRot: {
      x: 90,
      y: -5
    },
    camRotRange: {
      x: 30,
      y: 10
    },
    inverted: true
  },
  {
    name: 'aerodynamics',
    size: {
      w: 930,
      h: 490
    },
    position: {
      x: 0,
      y: 3,
      z: -2
    },
    orientation: {
      x: 0,
      y: 0,
      z: 0
    },
    camDist: 5,
    camPos: {
      x: 0,
      y: 1.5,
      z: 0
    },
    camRot: {
      x: 0,
      y: 0
    },
    camRotRange: {
      x: 10,
      y: 10
    }
  },
  {
    name: 'free-viewing',
    size: {
      w: 465,
      h: 320
    },
    position: {
      x: 0,
      y: 0.0,
      z: 0
    },
    orientation: {
      x: 0,
      y: 0,
      z: 0
    },
    camDist: 6,
    camPos: {
      x: 0,
      y: 1.0,
      z: 0
    }
  }
]
