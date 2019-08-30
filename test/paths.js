const should = require('should')
const acquire = require('../')
const path = require('path')

describe('relative file path', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/lib/some-main-file.js', {
      paths: '.'
    }).name.should.be.exactly('validModule')
  })
})

describe('relative file path with absolute cwd', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/lib/some-main-file.js', {
      paths: process.cwd()
    }).name.should.be.exactly('validModule')
  })
})

describe('relative dir', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/', {
      paths: '.'
    }).name.should.be.exactly('validModule')
  })
})

describe('relative dir with absolute cwd', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/', {
      paths: process.cwd()
    }).name.should.be.exactly('validModule')
  })
})

describe('relative dir with right and wrong paths (respectively)', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/', {
      paths: ['.', './some/where/wrong']
    }).name.should.be.exactly('validModule')
  })
})

describe('relative dir with wrong and right paths (respectively)', function() {
  it('should locate the package', function() {
    acquire('./test/test-node-modules/m1/a-node-module/', {
      paths: ['./some/place', '.']
    }).name.should.be.exactly('validModule')
  })
})

describe('name with dir path', function() {
  it('should locate the package', function() {
    acquire('another-module', {
      paths: path.resolve('./test/test-node-modules/m2')
    }).name.should.be.exactly('validModule')
  })
})

describe('name with good and bad absolute paths', function() {
  it('should locate the package', function() {
    acquire('another-module', {
      paths: [path.resolve('test', 'test-node-modules', 'm1'), path.resolve('test', 'test-node-modules', 'm2')]
    }).name.should.be.exactly('validModule')
  })
})

describe('name with right and wrong absolute paths (respectively)', function() {
  it('should locate the package', function() {
    acquire('a-node-module', {
      paths: [path.resolve('test', 'test-node-modules', 'm1'), path.resolve('test', 'test-node-modules', 'm2')]
    }).name.should.be.exactly('validModule')
  })
})

describe('name with wrong and right absolute paths (respectively)', function() {
  it('should locate the package', function() {
    acquire('another-module', {
      paths: [path.resolve('test', 'test-node-modules', 'm1'), path.resolve('test', 'test-node-modules', 'm2')]
    }).name.should.be.exactly('validModule')
  })
})

describe('main-file as module name with the right absolute path', function() {
  it('should locate the package', function() {
    acquire('some-main-file', {
      paths: [path.resolve('test', 'test-node-modules', 'm2', 'another-module', 'lib')]
    }).name.should.be.exactly('validModule')
  })
})
