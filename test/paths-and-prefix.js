const should = require('should')
const acquire = require('../')
const path = require('path')

describe('partial module name along with multiple paths and a prefix', function() {
  it('should locate the package', function() {
    const result = acquire('another-module', {
      paths: [
        './test/test-node-modules/m1',
        './test/test-node-modules/m2'
      ]
    }).name.should.be.exactly('validModule')
  })
})

describe('partial module name along with different types of paths and a prefix', function() {
  it('should locate the package', function() {
    const result = acquire('module', {
      paths: [
        './test-node-modules/m1',
        path.resolve('test', 'test-node-modules', 'm2')
      ],
      prefix: 'another-'
    }).name.should.be.exactly('validModule')
  })
})
