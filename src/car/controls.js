/*
This class is in charge of all event listeners,
preloads assets
manages views
*/
import Analytics from 'common/js/analytics'
import Monoc from 'threes/monoc'
import ViewPreload from 'threes/viewPreload'
import CardControls from 'threes/cardControls'
import AssetLoader from 'threes/assetLoader'
import Desktop from 'car/desktop'
import ViewTour from 'threes/viewTour'
import Nav from 'ui/nav'

const Hammer = require('hammerjs')

export default class Controls {
  constructor () {
    // Device features
    this.devMode = false
    this.zoom = 1
    this.disableHammer = false
    this.disableRender = false
    this.gAActive = -1 // Tracks active section
    this.gAKnob = false // Tracks first knob move

    // Scene setup
    this.gA = new Analytics('UA-63053901-2')
    this.vp = new THREE.Vector2(window.innerWidth, window.innerHeight)
    this.sceneWGL = new THREE.Scene()
    this.sceneWGL.background = new THREE.Color(0x000000)
    this.rendererWGL = new THREE.WebGLRenderer({
      antialias: true
    })
    this.rendererWGL.setSize(this.vp.x, this.vp.y)
    // if (this.devMode) {
    //   this.stats = new Stats()
    //   this.stats.showPanel(1)
    //   document.body.appendChild(this.stats.dom)
    // }
    document.getElementById('GLCanvas').appendChild(this.rendererWGL.domElement)
    this.backBtn = document.getElementById('backBtn')
    this.backBtn.addEventListener('click', this.backToFF.bind(this), false)

    // Camera setup
    const camOptions = {
      distance: this.vp.y > 550 ? 8 : 6,
      rotRange: {
        xMin: -30,
        xMax: 30,
        yMin: -30,
        yMax: 30
      },
      distRange: {
        max: 20,
        min: 3
      }
    }
    this.cam = new Monoc(camOptions)
    this.cam.rotTarget.x = THREE.Math.randFloatSpread(30)
    this.cam.rotTarget.y = THREE.Math.randFloatSpread(30)
    this.viewPreload = new ViewPreload(this.sceneWGL, this.rendererWGL, this.cam, this.vp)
    this.viewActive = this.viewPreload
    this.mousePrev = new THREE.Vector2()
    this.cardControls = new CardControls(this)
    this.mouseMoveRef = this.onMouseMove.bind(this)
    this.firstZoomRef = this.hammerFirstZoom.bind(this)
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
    window.addEventListener('wheel', this.gestureWheel.bind(this), false)
    window.addEventListener('mousemove', this.mouseMoveRef, false)
    this.initPreloader()
    this.initHammer()
  }

  initHammer () {
    this.hammer = new Hammer(document.getElementById('CSSCanvas'))
    this.hammer.get('pan').set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 1
    })
    this.hammer.get('pinch').set({
      enable: true
    })
    this.hammer.on('pan', this.hammerPan.bind(this))
    this.hammer.on('pan', this.hammerFirstPan.bind(this))
    this.hammer.on('panstart', this.hammerPanStart.bind(this))
    this.hammer.on('panend', this.hammerPanEnd.bind(this))
    this.hammer.on('pinch', this.hammerPinch.bind(this))
    this.hammer.on('pinchstart', this.hammerPinchStart.bind(this))
  }

  // 01. Preload assets
  initPreloader () {
    const manifesto = [
      // Cube textures
      { name: 'envReflection', type: 'cubetexture', ext: 'jpg' },
      { name: 'envSkybox', type: 'cubetexture', ext: 'jpg' },
      // Car lights
      { name: 'flareHead', type: 'texture', ext: 'jpg' },
      { name: 'flareTurn', type: 'texture', ext: 'jpg' },
      { name: 'lightTurn', type: 'texture', ext: 'jpg' },
      { name: 'lightStop', type: 'texture', ext: 'jpg' },
      // Car geometry
      { name: 'body', type: 'mesh', ext: 'json' },
      { name: 'wheel', type: 'mesh', ext: 'json' },
      { name: 'xrays', type: 'mesh', ext: 'json' },
      // Car textures
      { name: 'thread', type: 'texture', ext: 'jpg' },
      { name: 'shadow', type: 'texture', ext: 'jpg' },
      { name: 'led', type: 'texture', ext: 'png' }
    ]
    const path = '../assets/'
    this.assetLoader = new AssetLoader(path, manifesto, this.preloadComplete.bind(this))
    this.assetLoader.start()
  }

  // 02. Preloading has completed
  preloadComplete (_cargo) {
    this.gA.uiEvent('click-begin', '3DTour')
    window.removeEventListener('mousemove', this.mouseMoveRef, false)
    this.viewPreload.exitAnimation(this.initTourView.bind(this))
  }

  // 03. Initialize tour view
  initTourView = function () {
    this.gA.pageView(Desktop[7].name)
    this.backBtn.classList.remove('inverted')
    this.nav = new Nav(this)
    this.viewTour = new ViewTour(this.sceneWGL, this.rendererWGL, this.cam, this.vp)
    this.viewActive = this.viewTour
    this.viewActive.initMeshes(this.assetLoader.cargo)
    this.viewPreload = null
    // Tracks first zoom interaction
    window.addEventListener('wheel', this.firstZoomRef, false)
    this.hammer.on('pinch', this.firstZoomRef)
  }

  /* ****************************** TOUCH LISTENERS ******************************** */
  hammerPan (event) {
    if (!this.disableHammer) {
      // Orbit camera
      this.cam.orbitBy((event.center.x - this.mousePrev.x) / this.vp.x * 90, (event.center.y - this.mousePrev.y) / this.vp.y * 90)
      this.mousePrev.set(event.center.x, event.center.y)
    } else {
      // Move knob
      this.cardControls.knobMoved(event.center.x - this.mousePrev.x, event.center.y - this.mousePrev.y)
    }
  }

  hammerPanEnd (event) {
    this.disableHammer = false
    this.cardControls.knobReleased()
  }

  hammerPinchStart (event) {
    this.zoom = this.cam.getDistance()
  }

  hammerPinch (event) {
    // this.cam.distTarget = ;
    this.cam.setDistance(this.zoom / event.scale)
  }

  hammerPanStart (event) {
    this.mousePrev.set(event.center.x, event.center.y)
  }

  // Analytics team wants to record first zoom interaction
  hammerFirstZoom (event) {
    this.gA.uiEvent('vehicle-zoom', '3DTour')
    this.hammer.off('pinch', this.firstZoomRef)
    window.removeEventListener('wheel', this.firstZoomRef, false)
  }

  // Analytics team wants to record first pan interaction
  hammerFirstPan (event) {
    this.gA.uiEvent('vehicle-move', '3DTour')
    this.hammer.off('pan', this.hammerFirstPan.bind(this))
  }

  /* ***************************** NAV ********************************* */
  // Clicked on nav item
  navClicked (_index) {
    // Send section name pageview to analytics
    this.gAActive = _index
    this.gA.pageView(Desktop[this.gAActive].name)
    this.viewTour.goToSection(_index)
    if (_index === 4 || _index === 5) {
      this.backBtn.classList.add('inverted')
    } else {
      this.backBtn.classList.remove('inverted')
    }
    // Reset knob event
    this.gAKnob = false
  }

  backToFF () {
    this.outboundGA('back to ff')
    window.location.href = 'https://www.ff.com/'
  }

  outboundGA (label) {
    this.gA.uiEvent(label)
  }

  mobileNavOpened () {
    this.disableRender = true
  }

  mobileNavClosed () {
    this.disableRender = false
  }

  /* **************************** CARD EVENTS ********************************* */
  knobMouseDown () {
    this.disableHammer = true
  }

  knobMouseMoved (_knobPos) {
    this.viewTour.knobMoved(_knobPos)
    // Trigger knob event only once
    if (this.gAKnob === false) {
      var eventName = ''
      switch (this.gAActive) {
        case 2:
          eventName = 'powertrain-interaction'
          break
        case 3:
          eventName = 'steering-interaction'
          break
        case 5:
          eventName = 'rear-light-interaction'
          break
      }
      // this.gA.uiEvent(eventName, '3DTour')
      this.gAKnob = true
    }
  }

  knobMouseUp () {
    this.disableHammer = false
  }

  frontLightsChanged (_index) {
    this.viewTour.frontLightsClicked(_index)
    var eventName = ''
    switch (_index) {
      case 0:
        eventName = 'frontlights-off'
        break
      case 1:
        eventName = 'frontlights-daytime'
        break
      case 2:
        eventName = 'frontlights-lowbeams'
        break
      case 3:
        eventName = 'frontlights-hibeams'
        break
      case 4:
        eventName = 'frontlights-foglamps'
        break
    }
    this.gA.uiEvent(eventName, '3DTour')
  }

  // Click on CloseX button
  exitSection () {
    // Tell nav to enter free driving
    this.nav.navClick(7, null)
  }

  /* *************************** WINDOW LISTENERS ********************************** */
  // User scrolls down
  gestureWheel (event) {
    // Dolly cam
    switch (event.deltaMode) {
      case WheelEvent.DOM_DELTA_PIXEL:
        this.cam.dolly(event.deltaY * 0.002)
        break
      case WheelEvent.DOM_DELTA_LINE:
        this.cam.dolly(event.deltaY * 0.2)
        break
      case WheelEvent.DOM_DELTA_PAGE:
        this.cam.dolly(event.deltaY * 0.4)
        break
    }
  }

  // When mouse is moved
  onMouseMove (_ev) {
    this.viewPreload.onMouseMove(_ev)
  }

  // Browser window resize
  onWindowResize () {
    if (this.disableRender) {
      this.nav.mobileNavHide()
      this.disableRender = false
    }
    this.vp.x = window.innerWidth
    this.vp.y = window.innerHeight
    this.rendererWGL.setSize(this.vp.x, this.vp.y)
    this.cam.onWindowResize(this.vp.x, this.vp.y)
    this.viewActive.onWindowResize(this.vp)
  }
  update (t) {
    if (!this.disableRender && this.viewActive.update(t) && this.devMode) {
      this.stats.update()
    }
  }
}
