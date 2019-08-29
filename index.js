/**
 * Node.js' `require` function on steroids:
 * - Ability to search for a module in multiple paths
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
  const orignalModulePaths = module.paths
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
  } else {
    output = tryEachPath(moduleName, { paths })
    if (output === null) {
      output = loadAsLocalPath(moduleName, { paths })
    }
    if (output === null) {
      output = loadAsRegularRequire(moduleName, { paths })
    }
  }

  module.paths = orignalModulePaths

  if (output === null) {
    const err = new Error('unable to find ' + moduleName)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  } else {
    return output
  }
}

function loadAsLocalPath (moduleName, options) {
  const path = require('path')
  let output
  try {
    output = require(path.resolve(moduleName), options)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      output = null
    } else {
      throw err
    }
  }
  return output
}

function loadAsRegularRequire (moduleName, options) {
  let output
  try {
    /* workaround for node issue #28077 */
    if (options && options.paths) {
      output = require(require.resolve(moduleName, options))
    } else {
      output = require(require.resolve(moduleName))
    }
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      output = null
    } else {
      throw err
    }
  }
  return output
}

function tryEachPath (moduleName, options) {
  const path = require('path')
  let output = null
  for (const p of options.paths || []) {
    const fullPath = path.resolve(p, moduleName)
    output = loadAsRegularRequire(fullPath)
    if (output !== null) break
  }
  return output
}

module.exports = acquire
