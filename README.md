# jQuery Bouncer

Defers event handler until a duration has lapsed or

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/tableau-mkt/jquery.bouncer/master/dist/bouncer.min.js
[max]: https://raw.github.com/tableau-mkt/jquery.bouncer/master/dist/bouncer.js

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
    resolveEvent: 'bouncer:resolve', // trigger a resolve event to resolve immediatley
    rejectEvent: 'bouncer:reject' // trigger a reject event to reject immediately
  });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
- 1.0.0-alpha — first release to the public.
