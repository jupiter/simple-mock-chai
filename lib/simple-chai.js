(function (simpleChai) {
  'use strict'

  // Module systems magic dance.

  /* istanbul ignore else */
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // NodeJS
    module.exports = simpleChai
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {
      return simpleChai
    })
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(simpleChai)
  }
}(function simpleChai (chai, utils) {
  'use strict'

  var slice = Array.prototype.slice

  function isSpy (putativeSpy) {
    return typeof putativeSpy === 'function' &&
         typeof putativeSpy.calls === 'object' &&
         typeof putativeSpy.callCount === 'number'
  }

  function timesInWords (count) {
    return count === 1 ? 'once'
     : count === 2 ? 'twice'
     : count === 3 ? 'thrice'
     : (count || 0) + ' times'
  }

  function isCall (putativeCall) {
    return putativeCall && isSpy(putativeCall.proxy)
  }

  function assertCanWorkWith (assertion) {
    if (!isSpy(assertion._obj) && !isCall(assertion._obj)) {
      throw new TypeError(utils.inspect(assertion._obj) + ' is not a spy or a call to a spy!')
    }
  }

  function getMessages (spy, action, nonNegatedSuffix, always, args) {
    var verbPhrase = always ? 'always have ' : 'have '
    nonNegatedSuffix = nonNegatedSuffix || ''
    if (isSpy(spy.proxy)) {
      spy = spy.proxy
    }

    return {
      affirmative: function () {
        return ['expected spy to ' + verbPhrase + action + nonNegatedSuffix].concat(args).join()
      },
      negative: function () {
        return ['expected spy to not ' + verbPhrase + action].concat(args).join()
      }
    }
  }

  function simpleProperty (name, action, nonNegatedSuffix) {
    utils.addProperty(chai.Assertion.prototype, name, function () {
      assertCanWorkWith(this)

      var messages = getMessages(this._obj, action, nonNegatedSuffix, false)
      this.assert(this._obj[name], messages.affirmative, messages.negative)
    })
  }

  function simplePropertyEquals (name, key, value, action, nonNegatedSuffix) {
    utils.addProperty(chai.Assertion.prototype, name, function () {
      assertCanWorkWith(this)

      var messages = getMessages(this._obj, action, nonNegatedSuffix, false)
      this.assert(this._obj[key] === value, messages.affirmative, messages.negative)
    })
  }

  function simplePropertyAsBooleanMethod (name, action, nonNegatedSuffix) {
    utils.addMethod(chai.Assertion.prototype, name, function (arg) {
      assertCanWorkWith(this)

      var messages = getMessages(this._obj, action, nonNegatedSuffix, false, [timesInWords(arg)])
      this.assert(this._obj[name] === arg, messages.affirmative, messages.negative)
    })
  }

  function createSimpleMethodHandler (simpleName, action, nonNegatedSuffix) {
    return function () {
      assertCanWorkWith(this)

      var alwaysSimpleMethod = 'always' + simpleName[0].toUpperCase() + simpleName.substring(1)
      var shouldBeAlways = utils.flag(this, 'always') && typeof this._obj[alwaysSimpleMethod] === 'function'
      var simpleMethod = shouldBeAlways ? alwaysSimpleMethod : simpleName

      var messages = getMessages(this._obj, action, nonNegatedSuffix, shouldBeAlways, slice.call(arguments))
      this.assert(this._obj[simpleMethod].apply(this._obj, arguments), messages.affirmative, messages.negative)
    }
  }

  function simpleMethodAsProperty (name, action, nonNegatedSuffix) {
    var handler = createSimpleMethodHandler(name, action, nonNegatedSuffix)
    utils.addProperty(chai.Assertion.prototype, name, handler)
  }

  function exceptionalSimpleMethod (chaiName, simpleName, action, nonNegatedSuffix) {
    var handler = createSimpleMethodHandler(simpleName, action, nonNegatedSuffix)
    utils.addMethod(chai.Assertion.prototype, chaiName, handler)
  }

  function simpleMethod (name, action, nonNegatedSuffix) {
    exceptionalSimpleMethod(name, name, action, nonNegatedSuffix)
  }

  utils.addProperty(chai.Assertion.prototype, 'always', function () {
    utils.flag(this, 'always', true)
  })

  simpleProperty('called', 'been called', ' at least once, but it was never called')
  simplePropertyAsBooleanMethod('callCount', 'been called exactly %1', ', but it was called %c%C')
  simplePropertyEquals('calledOnce', 'callCount', 1, 'been called exactly once', ', but it was called %c%C')
  simplePropertyEquals('calledTwice', 'callCount', 2, 'been called exactly twice', ', but it was called %c%C')
  simplePropertyEquals('calledThrice', 'callCount', 3, 'been called exactly thrice', ', but it was called %c%C')
  simpleMethodAsProperty('calledWithNew', 'been called with new')
  simpleMethod('calledBefore', 'been called before %1')
  simpleMethod('calledAfter', 'been called after %1')
  simpleMethod('calledOn', 'been called with %1 as this', ', but it was called with %t instead')
  simpleMethod('calledWith', 'been called with arguments %*', '%C')
  simpleMethod('calledWithExactly', 'been called with exact arguments %*', '%C')
  simpleMethod('calledWithMatch', 'been called with arguments matching %*', '%C')
  simpleMethod('returned', 'returned %1')
  exceptionalSimpleMethod('thrown', 'threw', 'thrown %1')
}))
