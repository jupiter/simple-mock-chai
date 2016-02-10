"use strict"

var simple = require('simple-mock')

describe('Call count', function () {
  var spy

  beforeEach(function () {
    spy = simple.spy()
  })

  describe('called', function () {
    it('should throw an assertion error when the spy is undefined', function () {
      expect(function () {
        expect(undefined).to.have.been.called
      }).to.throw(TypeError)
    })

    it('should throw an assertion error when the spy is not called', function () {
      expect(function () {
        spy.should.have.been.called
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once', function () {
      spy()

      expect(function () {
        spy.should.have.been.called
      }).to.not.throw()
    })

    it('should not throw when the spy is called twice', function () {
      spy()
      spy()

      expect(function () {
        spy.should.have.been.called
      }).to.not.throw()
    })
  })

  describe('not called', function () {
    it('should not throw when the spy is not called', function () {
      expect(function () {
        spy.should.not.have.been.called
      }).to.not.throw()
    })

    it('should throw an assertion error when the spy is called once', function () {
      spy()

      expect(function () {
        spy.should.not.have.been.called
      }).to.throw(AssertionError)
    })
  })

  describe('calledOnce', function () {
    it('should throw an assertion error when the spy is not called', function () {
      expect(function () {
        spy.should.have.been.calledOnce
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called once', function () {
      spy()

      expect(function () {
        spy.should.have.been.calledOnce
      }).to.not.throw()
    })
  })

  describe('calledTwice', function () {
    it('should throw an assertion error when the spy is not called', function () {
      expect(function () {
        spy.should.have.been.calledTwice
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called once', function () {
      spy()

      expect(function () {
        spy.should.have.been.calledTwice
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called twice', function () {
      spy()
      spy()

      expect(function () {
        spy.should.have.been.calledTwice
      }).to.not.throw()
    })
  })

  describe('calledThrice', function () {
    it('should throw an assertion error when the spy is not called', function () {
      expect(function () {
        spy.should.have.been.calledThrice
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called once', function () {
      spy()

      expect(function () {
        spy.should.have.been.calledThrice
      }).to.throw(AssertionError)
    })

    it('should throw an assertion error when the spy is called twice', function () {
      spy()
      spy()

      expect(function () {
        spy.should.have.been.calledThrice
      }).to.throw(AssertionError)
    })

    it('should not throw when the spy is called thrice', function () {
      spy()
      spy()
      spy()

      expect(function () {
        spy.should.have.been.calledThrice
      }).to.not.throw()
    })
  })
})
