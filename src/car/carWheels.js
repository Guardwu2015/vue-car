import FF91 from 'car/constants'
import { normalize } from 'common/js/util'
export default class CarWheels {
  // Cap wheel rotation to avoid the "Wagon-wheel effect"
  constructor (_carWhole, _cargo) {
    this.maxWheelTurn = Math.PI / 9.69
    this.carWhole = _carWhole
    this.thread = _cargo.getTexture('thread')
    this.thread.minFilter = THREE.NearestFilter
    this.thread.magFilter = THREE.LinearFilter
    this.thread.format = THREE.RGBFormat
    this.ogMatrix = new THREE.Matrix4().set(0.000788, 0, 0, -0.3939, 0, 0, 0.000788, -0.3939, 0, -0.000788, 0, 0.15, 0, 0, 0, 1)
    this.ff91 = new FF91()
    this.wPosFr = this.ff91.WheelBase
    this.wPosBk = 0
    this.wPosLf = this.ff91.WheelTrack / -2
    this.wPosRt = this.ff91.WheelTrack / 2
    this.wPosY = this.ff91.WheelDiam / 2
    const wheelGeom = _cargo.getMesh('wheel')
    this.addWheels(wheelGeom.getObjectByName('Wheel'))
    this.addBrakes(wheelGeom.getObjectByName('Brake'))
  }

  /* **************************** BUILDING WHEELS ************************* */
  addWheels (_wheelGroup) {
    this.wheelFL = _wheelGroup
    const meshRubber = this.wheelFL.getObjectByName('Tire')
    const meshSilver = this.wheelFL.getObjectByName('RimsSilver')
    const meshBlack = this.wheelFL.getObjectByName('RimsBlack')
    const geomRubber = meshRubber.geometry
    const geomSilver = meshSilver.geometry
    const geomBlack = meshBlack.geometry
    geomRubber.applyMatrix(this.ogMatrix)
    geomSilver.applyMatrix(this.ogMatrix)
    geomBlack.applyMatrix(this.ogMatrix)
    // Compute normals in CPU to save JSON filesize
    geomRubber.computeVertexNormals()
    geomSilver.computeVertexNormals()
    geomBlack.computeVertexNormals()

    // Define materials
    const matRubber = new THREE.MeshLambertMaterial({
      color: 0x202020,
      map: this.thread,
      side: THREE.DoubleSide
    })
    const matSilver = new THREE.MeshPhongMaterial({
      color: 0x999999,
      shininess: 50,
      side: THREE.DoubleSide
    })
    const matBlack = new THREE.MeshPhongMaterial({
      color: 0x111111,
      shininess: 50,
      side: THREE.DoubleSide
    })

    meshRubber.material = matRubber
    meshSilver.material = matSilver
    meshBlack.material = matBlack

    // Front left
    this.wheelFL.position.set(this.wPosFr, this.wPosY, this.wPosLf)
    this.carWhole.add(this.wheelFL)
    // Back left
    this.wheelBL = this.wheelFL.clone()
    this.wheelBL.position.set(this.wPosBk, this.wPosY, this.wPosLf)
    this.carWhole.add(this.wheelBL)

    // Invert wheels to add on right side
    const iGeomRubber = geomRubber.clone().scale(1, 1, -1)
    const iGeomSilver = geomSilver.clone().scale(1, 1, -1)
    const iGeomBlack = geomBlack.clone().scale(1, 1, -1)
    // Compute new normals after matrix transform
    iGeomRubber.computeVertexNormals()
    iGeomSilver.computeVertexNormals()
    iGeomBlack.computeVertexNormals()
    const iMeshRubber = new THREE.Mesh(iGeomRubber, matRubber)
    const iMeshSilver = new THREE.Mesh(iGeomSilver, matSilver)
    const iMeshBlack = new THREE.Mesh(iGeomBlack, matBlack)

    // Front right
    this.wheelFR = new THREE.Group()
    this.wheelFR.add(iMeshRubber)
    this.wheelFR.add(iMeshSilver)
    this.wheelFR.add(iMeshBlack)
    this.wheelFR.position.set(this.wPosFr, this.wPosY, this.wPosRt)
    this.carWhole.add(this.wheelFR)
    // Back right
    this.wheelBR = this.wheelFR.clone()
    this.wheelBR.position.set(this.wPosBk, this.wPosY, this.wPosRt)
    this.carWhole.add(this.wheelBR)
  }

  /* *************************** BUILDING BRAKES **************************** */
  addBrakes (_brakeGroup) {
    this.brakeBL = _brakeGroup
    const brMeshDisc = this.brakeBL.getObjectByName('Disc')
    const brMeshPads = this.brakeBL.getObjectByName('Pad')
    brMeshDisc.geometry.applyMatrix(this.ogMatrix)
    brMeshPads.geometry.applyMatrix(this.ogMatrix)
    brMeshDisc.material = new THREE.MeshPhongMaterial({
      color: 0x555555,
      shininess: 100,
      flatShading: true
    })
    brMeshPads.material = new THREE.MeshPhongMaterial({
      color: 0x333333,
      shininess: 50,
      flatShading: true
    })

    this.brakeBL.position.set(this.wPosBk, this.wPosY, this.wPosLf)
    this.carWhole.add(this.brakeBL)
    this.brakeFL = this.brakeBL.clone()
    this.brakeFL.position.set(this.wPosFr, this.wPosY, this.wPosLf)
    this.brakeFL.rotation.set(0, 0, Math.PI)
    this.carWhole.add(this.brakeFL)
    this.brakeFR = this.brakeBL.clone()
    this.brakeFR.position.set(this.wPosFr, this.wPosY, this.wPosRt)
    this.brakeFR.rotation.set(Math.PI, 0, Math.PI)
    this.carWhole.add(this.brakeFR)
    this.brakeBR = this.brakeBL.clone()
    this.brakeBR.position.set(this.wPosBk, this.wPosY, this.wPosRt)
    this.brakeBR.rotation.set(Math.PI, 0, 0)
    this.carWhole.add(this.brakeBR)
  }

  /* ************************* CALCULATE ROTATIONS ************************** */
  turnByRadiusRatio (_props) {
    this.rotOverall = -_props.frameDist / this.ff91.WheelCirc * Math.PI * 2
    this.rotBR = Math.max(this.rotOverall, -this.maxWheelTurn)
    this.rotFL = this.rotBL = this.rotFR = this.rotBR

    if (_props.wAngleSign !== 0) {
      this.ratioFO = _props.radFrontOut / _props.radBackIn
      this.ratioBO = _props.radBackOut / _props.radBackIn
      this.ratioFI = _props.radFrontIn / _props.radBackIn
      this.ratioBI = 1.0
      if (_props.wAngleSign === 1) {
        this.rotFL *= this.ratioFI
        this.rotBL *= this.ratioBI
        this.rotFR *= this.ratioFO
        this.rotBR *= this.ratioBO
        this.wheelFL.rotation.y = _props.wAngleInner
        this.wheelFR.rotation.y = _props.wAngleOuter
        this.brakeFL.rotation.y = _props.wAngleInner
        this.brakeFR.rotation.y = -_props.wAngleOuter
      } else {
        this.rotFL *= this.ratioFO
        this.rotBL *= this.ratioBO
        this.rotFR *= this.ratioFI
        this.rotBR *= this.ratioBI
        this.wheelFL.rotation.y = _props.wAngleOuter
        this.wheelFR.rotation.y = _props.wAngleInner
        this.brakeFL.rotation.y = _props.wAngleOuter
        this.brakeFR.rotation.y = -_props.wAngleInner
      }
      this.brakeBL.rotation.y =
        this.wheelBR.rotation.y =
        this.wheelBL.rotation.y = normalize(_props.speed, 22.2, 0) * _props.wAngleInner * -0.09
      this.brakeBR.rotation.y = -this.wheelBL.rotation.y
    }
    this.wheelFL.rotateZ(this.rotFL)
    this.wheelBL.rotateZ(this.rotBL)
    this.wheelFR.rotateZ(this.rotFR)
    this.wheelBR.rotateZ(this.rotBR)
  }

  /* *************************** EVENT LISTENERS **************************** */
  update (_props) {
    this.turnByRadiusRatio(_props)
  }
}
