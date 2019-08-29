const should = require('should')
const acquire = require('../')

describe('no module information provided', function () {
  it('throws an error', function () {
    try {
      acquire()
    } catch (e) {
      e.message.should.be.exactly('fatal: module name expected')
    }
  })
})

describe('unknown request throws', function () {
  it('throws an error', function () {
    try {
      acquire('./test-node-modules/broken-module.js')
    } catch (e) {
      e.code.should.be.exactly('MODULE_NOT_FOUND')
    }
  })
})

describe('testing broken module', function () {
  it('throws an error', function () {
    try {
      acquire('./some/wrong/name')
    } catch (e) {
      e.code.should.be.exactly('MODULE_NOT_FOUND')
    }
  })
})

describe('unknown request with path provided', function () {
  it('throws an error', function () {
    try {
      acquire('./some/wrong/name', {
        paths: 'some/place/that/does/not/exist'
      })
    } catch (e) {
      e.code.should.be.exactly('MODULE_NOT_FOUND')
    }
  })
})
