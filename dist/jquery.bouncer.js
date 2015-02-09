/*! jQuery Bouncer - v1.0.0-alpha5 - 2015-02-08
* https://github.com/tableau-mkt/jquery.bouncer
* Copyright (c) 2015 Joel Walters; Licensed MIT */
/* jshint node:true */
/* global define:false */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  }
  else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory;
  }
  else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  'use strict';

  var pluginName = 'bouncer',
    defaults = {
      wait: 5000,
      events: 'click.bouncer',
      activeClass: 'is-processing',
      resolveEvent: 'bouncer:resolve',
      rejectEvent: 'bouncer:reject'
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    return this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.$element = $(this.element);
      this.initTime = new Date().getTime();
      this.deferred = $.Deferred();

      // Default done handler.
      this.deferred.done($.proxy(function (options) {
        options = options || {};
        if (!options.preserveActiveClass) {
          this.$element.removeClass(this.options.activeClass);
        }
        if (this.event) {
          this.$element.trigger(this.event.type, this.event);
        }
      }, this));

      // Attach events handlers.
      this.$element.on(this.options.events, $.proxy(this.eventHandler, this));
      this.$element.on(this.options.resolveEvent, $.proxy(this.resolveHandler, this));
      this.$element.on(this.options.rejectEvent, $.proxy(this.rejectHandler, this));

      // Return our deferred object.
      return this.deferred;
    },

    resolveHandler: function (e, data) {
      this.deferred.resolve(data);
    },

    rejectHandler: function (e, data) {
      this.deferred.reject(data);
    },

    eventHandler: function (e) {
      var _this = this,
          isResolved = this.deferred.state() === 'resolved',
          timeSinceReady,
          isExpired;

      timeSinceReady = new Date().getTime() - this.initTime;
      isExpired = timeSinceReady > this.options.wait;

      // Wait time lapsed or resolved — do not interfere.
      if (isExpired || isResolved) {
        return;
      }

      // Save the event for triggering later.
      this.event = e;

      // Prevent default handlers and cancel other click handlers.
      e.preventDefault();
      e.stopImmediatePropagation();

      // Set a timer to resolve our deferred object.
      if (!this.processingTimeoutId) {
        this.$element.addClass(this.options.activeClass);

        this.processingTimeoutId = setTimeout(function () {
          _this.deferred.resolve();
        }, this.options.wait - timeSinceReady);
      }
    }
  };

  $.fn[pluginName] = function (options) {
    var deferreds = [],
        instance;
    this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        instance = new Plugin(this, options);
        deferreds.push(instance);
        $.data(this, 'plugin_' + pluginName, instance);
      }
    });
    return $.when.apply(this, deferreds);
  };

}));
