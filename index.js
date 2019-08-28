/**
 * Node.js' `require` function on steroids:
 * - Ability to search for a module in multiple folders
 * - Ability to search using a prefix
 * @module acquire
 */

function acquire (moduleName, options) {
  if (typeof moduleName !== 'string') {
    throw new Error('fatal: module name expected')
  }
  options = options || {}
  const toArray = require('array-back')
  const prefix = options.prefix
  const paths = options.paths ? toArray(options.paths) : undefined
  // const orignalModulePaths = module.paths
  if (paths && paths.length) {
    module.paths = module.paths.concat(paths)
  }
  let output = null

  if (prefix) {
    try {
      output = acquire(`${prefix}${moduleName}`, { paths })
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        output = acquire(moduleName, { paths })
      } else {
        throw err
      }
    }
  }
  if (output === null) {
    const err = new Error('unable to find ' + moduleName)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  } else {
    return output
  }
}

module.exports = acquire
