export default class FF91 {
  constructor () {
    this.Accel = 5 // m/s^2
    this.Decel = -10 // m/s^2
    this.MaxVel = (70 * 1610) / 3600 // 70m/h ~= 31.3m/s
    this.MaxTurn = Math.PI * 0.20 // Max angle of wheel turn
    // Dimensions
    this.Length = 5.250 // From nose to tail
    this.Width = 2.283 // From L to R mirror
    this.WheelTrack = 1.72 // L to R wheels
    this.WheelBase = 3.200 // F to B wheels
    this.WheelDiam = 0.780 // Wheel diameter
    this.WheelCirc = this.WheelDiam * Math.PI
  }
}

export const GOLDEN_RATIO = 285
