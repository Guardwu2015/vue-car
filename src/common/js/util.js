/**
 * util function
 */

/**
 * Converts a value to 0 - 1 from its min - max bounds
 * @param {*} val
 * @param {*} min
 * @param {*} max
 */
export function normalize (val, min, max) {
  return Math.max(0, Math.min(1, (val - min) / (max - min)))
}

/**
 * Converts a value to 0 - 1 from its min - max bounds in quadratic in form
 * @param {*} val
 * @param {*} min
 * @param {*} max
 */
export function normalizeQuadIn (val, min, max) {
  return Math.pow(normalize(val, min, max), 2.0)
}

/**
 * Converts a value to 0 - 1 from its min - max bounds in quadratic out form
 * If distance between _val & _target is very small, return _target
 * @param {*} val
 * @param {*} min
 * @param {*} max
 */
export function normalizeQuadOut (val, min, max) {
  let x = normalize(val, min, max)
  return x * (2.0 - x)
}

/**
 * Tween to target using Zeno 's Paradox
 * @param {*} _val
 * @param {*} _target
 * @param {*} _ratio
 */
export function zTween (_val, _target, _ratio) {
  return Math.abs(_target - _val) < 1e-5 ? _target : _val + (_target - _val) * Math.min(_ratio, 1.0)
}

/**
 * Fisher - Yates Shuffle
 * @param {*} array
 */
export function shuffle (array) {
  let m = array.length
  let t, i

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element
    i = Math.floor(Math.random() * m--)
    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

/**
 * @param {*} n
 * @param {*} m
 */
export function mod (n, m) {
  return ((n % m) + m) % m
}

/**
 * Scales and centers _geometry
 * _bounds defines the bounding box to fit
 * _center defines whether to center on x, y, or z
 * @param {*} _geometry
 * @param {*} _bounds
 * @param {*} _center
 */
export function scaleAndCenter (_geometry, _bounds, _center) {
  if (_center === void 0) {
    _center = 'xyz'
  }
  if (_bounds.x === undefined) {
    _bounds.x = Infinity
  }
  if (_bounds.y === undefined) {
    _bounds.y = Infinity
  }
  if (_bounds.z === undefined) {
    _bounds.z = Infinity
  }
  if (_bounds.x === _bounds.y && _bounds.y === _bounds.z && _bounds.z === Infinity) {
    return null
  }

  // Get bounds
  _geometry.computeBoundingBox()
  const geomMin = _geometry.boundingBox.min
  const geomMax = _geometry.boundingBox.max
  const width = geomMax.x - geomMin.x
  const height = geomMax.z - geomMin.z // Switch Y-Z because
  const depth = geomMax.y - geomMin.y // Blender is z-up, Three is y-up

  // Translate origin to center
  const avgX = _center.indexOf('x') > -1 ? (geomMax.x + geomMin.x) / 2 : 0
  const avgY = _center.indexOf('y') > -1 ? (geomMax.y + geomMin.y) / 2 : 0
  const avgZ = _center.indexOf('z') > -1 ? (geomMax.z + geomMin.z) / 2 : 0
  _geometry.translate(-avgX, -avgY, -avgZ)
  // Scale to fit within smallest side length
  const xDiff = _bounds.x / width
  const yDiff = _bounds.y / height
  const zDiff = _bounds.z / depth
  const geoScale = Math.min(xDiff, yDiff, zDiff)
  _geometry.scale(geoScale, geoScale, geoScale)
}
