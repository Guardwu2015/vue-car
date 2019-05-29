export default class Cargo {
  constructor () {
    console.log('cargo constructor')
  }

  /* *********** SETTERS ************* */
  addAsset (name, asset) {
    if (this[name] === undefined) {
      this[name] = asset
      return true
    }
    return false
  }

  /* ************** GETTERS ************* */
  getMesh (name) {
    return (this[name] !== undefined) ? this[name] : null
  }
  getTexture (name) {
    return (this[name] !== undefined) ? this[name] : null
  }
  getCubeTexture (name) {
    return (this[name] !== undefined) ? this[name] : null
  }
}
