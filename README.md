# jQuery Bouncer

Defers event handler until a duration has lapsed or a given event has occurred.

## Getting Started
Download the latest release on the [release page](https://github.com/tableau-mkt/jquery.bouncer/releases).

### Basic Usage

```html
<script src="jquery.js"></script>
<script src="dist/jquery.bouncer.min.js"></script>
<script>
jQuery(function($) {
  $('.selector').bouncer({
    // Options object. All optional. Defaults described below.
    wait: 5000, // wait up to X milliseconds
    events: 'click.bouncer', // e.g. defer click event with bouncer namespace
    activeClass: 'is-processing', // add .is-processing class while pending
    resolveEvent: 'bouncer:resolve', // trigger a resolve event to resolve immediately
    rejectEvent: 'bouncer:reject' // trigger a reject event to reject immediately
  });
});
</script>
```

## Documentation
Provides an AMD and CommonJS/Browserify module loader along with a standard script include loader.

### Browserify

```js
// Returns a function which you can pass a reference to your jQuery to.
var $ = require('jquery');
require('jquery.bouncer')($);
```

_(More soon)_

## Examples
_(Coming soon)_

## Release History
- 1.0.0-alpha — first release to the public.
