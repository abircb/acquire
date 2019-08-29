const should = require('should')
const acquire = require('../')

describe('partial module name specified', function () {
  it('should return the array-back package', function () {
    context('array-back is the only dependancy of this module so only valid test', function () {
      acquire('back', {prefix: 'array-'}).name.should.be.exactly('arrayify')
    })
  })
})

describe('module name with prefix specified', function () {
  it('should return the array-back package', function () {
    context('array-back is the only dependancy of this module so only valid test', function () {
      acquire('array-back', {prefix: 'array-'}).name.should.be.exactly('arrayify')
    })
  })
})

describe('wrong module prefix specified', function () {
  it('should throw an error - name of the package is array-back', function () {
    context('array-back is the only dependancy of this module so only valid test', function () {
      try {
        acquire('array-back', {prefix: 'back'})
      } catch(e) {
        e.code.should.be.exactly('MODULE_NOT_FOUND')
      }
    })
  })
})
