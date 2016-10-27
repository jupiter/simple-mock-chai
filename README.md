# simple-mock Assertions for Chai

**INCOMPLETE: NOT READY FOR USE**

**Simple–Chai** provides a set of custom assertions for using the [simple-mock][] spy, stub, and mocking framework with the
[Chai][] assertion library. You get all the benefits of Chai with all the powerful tools of simple-mock.

Instead of using simple-mock's assertions:

```javascript
simple.assertCalledWith(mySpy, "foo");
```

or awkwardly trying to use Chai's `should` or `expect` interfaces on spy properties:

```javascript
mySpy.calledWith("foo").should.be.ok;
expect(mySpy.calledWith("foo")).to.be.ok;
```

you can say

```javascript
mySpy.should.have.been.calledWith("foo");
expect(mySpy).to.have.been.calledWith("foo");
```

## Assertions

All of your favorite simple-mock assertions made their way into Simple–Chai. We show the `should` syntax here; the `expect`
equivalent is also available.

<table>
    <thead>
        <tr>
            <th>simple-mock property/method</th>
            <th>Simple–Chai assertion</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>called</td>
            <td>spy.should.have.been.called</td>
        </tr>
        <tr>
            <td>callCount</td>
            <td>spy.should.have.callCount(n)</td>
        </tr>
        <tr>
            <td>calledOnce</td>
            <td>spy.should.have.been.calledOnce</td>
        </tr>
        <tr>
            <td>calledTwice</td>
            <td>spy.should.have.been.calledTwice</td>
        </tr>
        <tr>
            <td>calledThrice</td>
            <td>spy.should.have.been.calledThrice</td>
        </tr>
        <tr>
            <td>calledBefore</td>
            <td>spy1.should.have.been.calledBefore(spy2)</td>
        </tr>
        <tr>
            <td>calledAfter</td>
            <td>spy1.should.have.been.calledAfter(spy2)</td>
        </tr>
        <tr>
            <td>calledWithNew</td>
            <td>spy.should.have.been.calledWithNew</td>
        </tr>
        <tr>
            <td>alwaysCalledWithNew</td>
            <td>spy.should.always.have.been.calledWithNew</td>
        </tr>
        <tr>
            <td>calledOn</td>
            <td>spy.should.have.been.calledOn(context)</td>
        </tr>
        <tr>
            <td>alwaysCalledOn</td>
            <td>spy.should.always.have.been.calledOn(context)</td>
        </tr>
        <tr>
            <td>calledWith</td>
            <td>spy.should.have.been.calledWith(...args)</td>
        </tr>
        <tr>
            <td>alwaysCalledWith</td>
            <td>spy.should.always.have.been.calledWith(...args)</td>
        </tr>
        <tr>
            <td>calledWithExactly</td>
            <td>spy.should.have.been.calledWithExactly(...args)</td>
        </tr>
        <tr>
            <td>alwaysCalledWithExactly</td>
            <td>spy.should.always.have.been.calledWithExactly(...args)</td>
        </tr>
        <tr>
            <td>calledWithMatch</td>
            <td>spy.should.have.been.calledWithMatch(...args)</td>
        </tr>
        <tr>
            <td>alwaysCalledWithMatch</td>
            <td>spy.should.always.have.been.calledWithMatch(...args)</td>
        </tr>
        <tr>
            <td>returned</td>
            <td>spy.should.have.returned(returnVal)</td>
        </tr>
        <tr>
            <td>alwaysReturned</td>
            <td>spy.should.have.always.returned(returnVal)</td>
        </tr>
        <tr>
            <td>threw</td>
            <td>spy.should.have.thrown(errorObjOrErrorTypeStringOrNothing)</td>
        </tr>
        <tr>
            <td>alwaysThrew</td>
            <td>spy.should.have.always.thrown(errorObjOrErrorTypeStringOrNothing)</td>
        </tr>
    </tbody>
</table>

For more information on the behavior of each assertion, see
[the documentation for the corresponding spy methods][spymethods]. These of course work on not only spies, but
individual spy calls, stubs, and mocks as well.

Note that you can negate any assertion with Chai's `.not`. E. g. for `notCalled` use `spy.should.have.not.been.called`.

For `assert` interface there is no need for this library. You can install [simple-mock assertions][simpleassertions] right into Chai's `assert` object with `expose`:

```javascript
var chai = require("chai");
var simple = require("simple-mock");

simple.assert.expose(chai.assert, { prefix: "" });
```

## Examples

Using Chai's `should`:

```javascript
"use strict";
var chai = require("chai");
var simple = require("simple-mock");
var simpleChai = require("simple-chai");
chai.should();
chai.use(simpleChai);

function hello(name, cb) {
    cb("hello " + name);
}

describe("hello", function () {
    it("should call callback with correct greeting", function () {
        var cb = simple.spy();

        hello("foo", cb);

        cb.should.have.been.calledWith("hello foo");
    });
});
```

Using Chai's `expect`:

```javascript
"use strict";
var chai = require("chai");
var simple = require("simple-mock");
var simpleChai = require("simple-chai");
var expect = chai.expect;
chai.use(simpleChai);

function hello(name, cb) {
    cb("hello " + name);
}

describe("hello", function () {
    it("should call callback with correct greeting", function () {
        var cb = simple.spy();

        hello("foo", cb);

        expect(cb).to.have.been.calledWith("hello foo");
    });
});
```

## Installation and Usage

### Node

Do an `npm install simple-chai` to get up and running. Then:

```javascript
var chai = require("chai");
var simpleChai = require("simple-chai");

chai.use(simpleChai);
```

You can of course put this code in a common test fixture file; for an example using [Mocha][], see
[the Simple–Chai tests themselves][fixturedemo].

### AMD

Simple–Chai supports being used as an [AMD][] module, registering itself anonymously (just like Chai). So, assuming you
have configured your loader to map the Chai and Simple–Chai files to the respective module IDs `"chai"` and
`"simple-chai"`, you can use them as follows:

```javascript
define(function (require, exports, module) {
    var chai = require("chai");
    var simpleChai = require("simple-chai");

    chai.use(simpleChai);
});
```

### `<script>` tag

If you include Simple–Chai directly with a `<script>` tag, after the one for Chai itself, then it will automatically plug
in to Chai and be ready for use. Note that you'll want to get the latest browser build of simple-mock as well:

```html
<script src="chai.js"></script>
<script src="simple-chai.js"></script>
<script src="simple.js"></script>
```

### Ruby on Rails

Thanks to [Cymen Vig][], there's now [a Ruby gem][] of Simple–Chai that integrates it with the Rails asset pipeline!


[simple-mock]: http://simplejs.org/
[Chai]: http://chaijs.com/
[spymethods]: http://simplejs.org/docs/#spies-api
[simpleassertions]: http://simplejs.org/docs/#assertions
[Mocha]: http://visionmedia.github.com/mocha/
[fixturedemo]: https://github.com/domenic/simple-chai/tree/master/test/
[AMD]: https://github.com/amdjs/amdjs-api/wiki/AMD
[Cymen Vig]: https://github.com/cymen
[a Ruby gem]: https://github.com/cymen/simple-chai-rails
