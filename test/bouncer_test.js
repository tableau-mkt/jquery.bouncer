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

  module('jQuery#bouncer', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('returns Promise', function() {
    expect(1);
    strictEqual(typeof this.elems.bouncer().then, 'function', 'returns Promise');
  });

  // @TODO data plugin_bouncer exists with expected values and defaults upon initialization

  // @TODO clicking element adds activeClass and stops event propagation

  // @TODO passing options overrides defaults

  // @TODO bouncer:resolve calls original event

  // @TODO bouncer:reject rejects the deferred object and does not call event

}(jQuery));
