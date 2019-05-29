import Cargo from 'threes/cargo'
export default class AssetLoader {
  constructor (_path, _manifesto, _callback) {
    this.path = _path
    this.manifesto = _manifesto
    this.callback = _callback
    this.cargo = new Cargo()
    this.assetCount = 0
    this.assetTotal = _manifesto.length
    this.loaderText = new THREE.TextureLoader()
    this.loaderMesh = new THREE.ObjectLoader()
    this.loaderCube = new THREE.CubeTextureLoader()
    this.container = document.getElementById('preloader')
    this.progBar = document.getElementById('preProg')
    this.detailBox = document.getElementById('preDetail')
  }

  start () {
    this.container.className = 'visible'
    this.detailBox.innerHTML = 'Loading assets'
    let ext
    let loop = function (i) {
      ext = '.' + self.manifesto[i].ext
      switch (self.manifesto[i].type) {
        case 'texture':
          self.loaderText.load(self.path + 'textures/' + self.manifesto[i].name + ext, function (_obj) {
            this.assetAquired(_obj, this.manifesto[i].name)
          }.bind(self), undefined, function (_err) {
            this.assetFailed(_err, this.manifesto[i].name)
          }.bind(self))
          break
        case 'mesh':
          self.loaderMesh.load(self.path + 'meshes/' + self.manifesto[i].name + '.json', function (_obj) {
            this.assetAquired(_obj, this.manifesto[i].name)
          }.bind(self), undefined, function (_err) {
            this.assetFailed(_err, this.manifesto[i].name)
          }.bind(self))
          break
        case 'cubetexture':
          self.loaderCube.setPath(self.path + 'textures/' + self.manifesto[i].name + '/')
          self.loaderCube.load(['xp' + ext, 'xn' + ext, 'yp' + ext, 'yn' + ext, 'zp' + ext, 'zn' + ext], function (_obj) {
            this.assetAquired(_obj, this.manifesto[i].name)
          }.bind(self), undefined, function (_err) {
            this.assetFailed(_err, this.manifesto[i].name)
          }.bind(self))
          break
      }
    }
    const self = this
    for (var i = 0; i < this.assetTotal; i++) {
      loop(i)
    }
  }

  remove () {
    this.container.className = ''
  }

  // 02. When asset is successfully loaded
  assetAquired (_obj, _name) {
    this.cargo.addAsset(_name, _obj)
    this.assetCount++
    this.pct = this.assetCount / this.assetTotal
    this.progBar.style.width = (this.pct * 100) + '%'
    if (this.assetCount === this.assetTotal) {
      this.complete()
    }
  }

  // 03. When asset fails loading
  assetFailed (_err, _name) {
    this.assetCount++
    this.pct = this.assetCount / this.assetTotal
    if (this.assetCount === this.assetTotal) {
      this.complete()
    }
  }

  // 04. When all assets are loaded.
  complete () {
    this.detailBox.innerHTML = 'Click to begin'
    this.container.addEventListener('click', this.begin.bind(this))
  }

  // 05. Upon user interaction
  begin () {
    this.container.classList.remove('visible')
    this.callback(this.cargo)
  }
}
