export default class Time {
  constructor (timeFactor) {
    this.fallBackRates = [60, 40, 30, 20, 15]
    this.prev = 0
    this.prevBreak = 0
    this.delta = 0
    this.timeFact = (typeof timeFactor === 'undefined') ? 1 : timeFactor
    this.frameCount = 0
    this.fallBackIndex = 0
    this.setFPS(60)
  }

  update (_newTime) {
    this.deltaBreak = Math.min(_newTime - this.prevBreak, 1.0)
    if (this.deltaBreak > this.spf) {
      this.delta = Math.min(_newTime - this.prev, 1.0)
      this.prev = _newTime
      this.prevBreak = _newTime - (this.deltaBreak % this.spf)
      // this.checkFPS();
      // Returns true to render frame
      return true
    } else {
      return false
    }
  }

  checkFPS () {
    if (this.delta > this.spf * 2) {
      this.frameCount++
      if (this.frameCount > 30) {
        this.frameCount = 0
        this.fallBackIndex++
        this.setFPS(this.fallBackRates[this.fallBackIndex])
      }
    }
  }

  setFPS (_newVal) {
    this.fps = _newVal
    this.spf = 1 / this.fps
  }
}
