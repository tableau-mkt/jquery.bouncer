(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#bouncer plugin behavior', {
    // This will run before each test in this module.
    setup: function() {
      var $fixture = $('#qunit-fixture');
      this.$fooLink = $fixture.find('#foo');
      this.$barLink = $fixture.find('#bar');
    }
  });

  test('returns Promise', function () {
    strictEqual(typeof this.$fooLink.bouncer().then, 'function', 'returns Promise');
    expect(1);
  });

  test('initializes with expected state', function (assert) {
    var data;

    this.$fooLink.bouncer();
    data = this.$fooLink.data('plugin_bouncer');

    assert.strictEqual(typeof data, 'object', 'has data object');
    assert.ok(data.$element instanceof $, 'data has $element jQuery instance');
    assert.ok(data.$element.length, 'data has $element property is non-zero length');
    assert.strictEqual(typeof data._defaults, 'object', 'data has _defaults object');
    assert.strictEqual(data._name, 'bouncer', 'data has _name');
    assert.strictEqual(typeof data.deferred, 'object', 'data has deferred object');
    assert.strictEqual(typeof data.initTime, 'number', 'data has initTime number');
    assert.ok(data.initTime > 0, 'data has initTime > 0');
    assert.ok(data.element instanceof Node, 'data has element Node instance');
    assert.strictEqual(typeof data.options, 'object', 'data has options object');

    expect(10);
  });

  test('clicking adds activeClass and prevents other handlers', function (assert) {
    var done = assert.async(),
        _this = this,
        data,
        isFired;

    this.$fooLink.bouncer({wait: 250});
    data = this.$fooLink.data('plugin_bouncer');
    this.$fooLink.on('click.qunit', function () {
      isFired = true;
    });
    this.$fooLink.click();

    assert.ok(this.$fooLink.hasClass(data.options.activeClass), 'has activeClass');
    assert.strictEqual(typeof isFired, 'undefined', 'other handler not fired');
    setTimeout(function () {
      assert.ok(!_this.$fooLink.hasClass(data.options.activeClass), 'has no activeClass');
      done();
    }, data.options.wait);

    expect(3);
  });

  test('passing options overrides defaults', function (assert) {
    var options = {
      wait: 1234,
      events: 'keydown.foo',
      activeClass: 'is-foobar',
      resolveEvent: 'foobar:resolve',
      rejectEvent: 'foobar:reject'
    },
    data;

    this.$fooLink.bouncer(options);
    data = this.$fooLink.data('plugin_bouncer');

    assert.notDeepEqual(data.options, data._defaults, 'differs from defaults');
    assert.deepEqual(data.options, options, 'has overridden defaults');

    expect(2);
  });

  test('triggering resolve event calls original event', function (assert) {
    var done = assert.async(),
        _this = this,
        isFired,
        data;

    this.$fooLink.bouncer({wait: 250});
    data = this.$fooLink.data('plugin_bouncer');
    this.$fooLink.on('click', function (e) {
      isFired = e.bouncerTest;
    });
    this.$fooLink.trigger($.Event('click', {bouncerTest: true}));

    setTimeout(function () {
      _this.$fooLink.trigger(data.options.resolveEvent);
      assert.ok(!_this.$fooLink.hasClass(data.options.activeClass), 'has no activeClass');
      assert.strictEqual(data.deferred.state(), 'resolved', 'deferred is resolved');
      assert.ok(isFired, 'original event was fired');
      done();
    }, data.options.wait * 0.5);

    expect(3);
  });

  // @TODO bouncer:reject rejects the deferred object and does not call event

}(jQuery));
