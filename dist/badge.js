!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.badge=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Badge, config;

  config = require('./config');


  /*
     * Badge
    
    Base class for any badge class. You may create a badge of type badge directly but
    it won't generally be of great use.
  
    It defines the badge public interface and handles the rendering pipeline. 
  
     *# Public API
    - `constructor(params: {key: value})` 
      Constructs a badge and applies all parameters to this instance
    - `badge.[param]`
      All parameters are directly accessible on the badge's instance. For instance:
      ```javascript
      // All badges drawn with this instance will now use the text 'build'
      badge.text = 'build';
      ```
    - `renderTo(ctx: RenderingContext [, x: Number] [, y: Number]) -> void`  
      Renders the badge on the provided rendering context at position (x, y).
      Is rendered at (0,0) by default.
    - `measure(ctx: RenderingContext) -> Dimentions`  
      measures the width and height the badge will occupy. Base implementation measures
      the width taken by `text` and two margins and returns the configured height
    - `Dimentions = {w: Number, h: Number}`  
      Format used to represent badge dimentions
    
     *# Rendering pipeline 
    The following methods are called in this order and may be overriden to implement custom graphics:
  
    - `drawBorder(ctx: RenderingContext, dimentions: Dimentions) -> void`  
      begins and constructs a path that defines the badge's borders (does not close nor draw it)
    - `drawBackground(ctx: DrawingContext, dimentions: Dimentions) -> void`
      draws the badge's background
    - `drawBackgroundEffects(ctx: DrawingContext, dimentions: Dimentions) -> void`
      applies effects once the background was drawn
    - `drawForeground(ctx: DrawingContext, dimentions: Dimentions) -> void`
      draws the badge's foreground
    - `drawForegroundEffects(ctx: DrawingContext, dimentions: Dimentions) -> void`
      applies effects once the foreground was drawn
  
     *# Parameters
    The following parameters are assumed to be necessary for any class implementing a badge
    - `text` (String): default text shown in the badge, left aligned
   */

  module.exports = Badge = (function() {
    function Badge(params) {
      var key, val;
      for (key in params) {
        val = params[key];
        this[key] = val;
      }
    }


    /* Public API */

    Badge.prototype.renderTo = function(ctx, x, y) {
      var dimentions;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      ctx.save();
      ctx.font = config.get('font');
      ctx.translate(x, y);
      dimentions = this.measure(ctx);
      this.drawBorder(ctx, dimentions, config.get('border-radius'));
      ctx.clip();
      this.drawBackground(ctx, dimentions);
      this.drawBackgroundEffects(ctx, dimentions);
      this.drawForeground(ctx, dimentions);
      this.drawForegroundEffects(ctx, dimentions);
      ctx.restore();
    };

    Badge.prototype.measure = function(ctx) {
      var dim, textWidth;
      ctx.save();
      ctx.font = config.get('font');
      textWidth = this.text ? ctx.measureText(this.text).width : config.get('width');
      dim = {
        h: this.getHeight(),
        w: textWidth + 2 * config.get('padding')
      };
      ctx.restore();
      return dim;
    };


    /* Rendering pipeline */

    Badge.prototype.drawBorder = function(ctx, _arg, radius) {
      var h, w;
      w = _arg.w, h = _arg.h;
      ctx.moveTo(radius, 0);
      ctx.lineTo(w - radius, 0);
      ctx.arcTo(w, 0, w, radius, radius);
      ctx.lineTo(w, h - radius);
      ctx.arcTo(w, h, w - radius, h, radius);
      ctx.lineTo(radius, h);
      ctx.arcTo(0, h, 0, h - radius, radius);
      ctx.lineTo(0, radius);
      return ctx.arcTo(0, 0, radius, 0, radius);
    };

    Badge.prototype.drawBackground = function(ctx, _arg) {
      var h, w;
      w = _arg.w, h = _arg.h;
      ctx.fillStyle = config.get('color-background');
      return ctx.fillRect(0, 0, w, h);
    };

    Badge.prototype.drawBackgroundEffects = function(ctx, _arg) {
      var gradient, h, w;
      w = _arg.w, h = _arg.h;
      ctx.save();
      gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(1, '#888');
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      return ctx.restore();
    };

    Badge.prototype.drawForeground = function(ctx, dimentions) {
      return this.drawText(ctx, dimentions, this.text);
    };

    Badge.prototype.drawForegroundEffects = function(ctx, _arg) {
      var h, w;
      w = _arg.w, h = _arg.h;
      return void 0;
    };


    /* Utility methods */

    Badge.prototype.getHeight = function() {
      return config.get('height');
    };

    Badge.prototype.drawText = function(ctx, _arg, text, options) {
      var h, w, x;
      w = _arg.w, h = _arg.h;
      if (options == null) {
        options = {};
      }
      ctx.fillStyle = config.get('color-text');
      if (options.align === 'right') {
        x = w - config.get('padding') - ctx.measureText(text).width;
      } else {
        x = config.get('padding');
      }
      return ctx.fillText(text, x, config.get('text-height'));
    };

    return Badge;

  })();

}).call(this);

},{"./config":5}],2:[function(require,module,exports){
(function() {
  var Badge, Boolean, config,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Badge = require('./Badge');

  config = require('./config');


  /*
     * Boolean
  
    A badge that can take two states (namely 'failure' and 'success') depending
    on the value of 'status'
  
     *# Parameters
    - `text` (String): the text shown on the left hand side of the badge
    - `status` (true/false): defines the state the badge is in
    - `successText` (String): text shown on the right side of the badge in case of success
    - `failureText` (String): text shown on the right side of the badge in case of failure
    - `statusText`: (String): text shown on the right side of the badge regardless of the state
    statusText has precedence over (failure|success)Text
  
     *# Typical use cases
    - Show the result of a build in a CI environment (*à la* Travis-ci)
   */

  module.exports = Boolean = (function(_super) {
    __extends(Boolean, _super);

    function Boolean() {
      return Boolean.__super__.constructor.apply(this, arguments);
    }

    Boolean.prototype.measure = function(ctx) {
      var dimentions;
      dimentions = Boolean.__super__.measure.call(this, ctx);
      dimentions.w += this.measureStatus(ctx);
      return dimentions;
    };

    Boolean.prototype.drawForeground = function(ctx, dimentions) {
      Boolean.__super__.drawForeground.call(this, ctx, dimentions);
      return this.drawText(ctx, dimentions, this.getText(), {
        align: 'right',
        margin: config.get('padding')
      });
    };

    Boolean.prototype.getText = function() {
      if (this.statusText != null) {
        return this.statusText;
      }
      if (this.getStatus()) {
        return this.successText;
      } else {
        return this.failureText;
      }
    };

    Boolean.prototype.getStatus = function() {
      if (this.inverse) {
        return !this.status;
      } else {
        return this.status;
      }
    };

    Boolean.prototype.drawBackground = function(ctx, dimentions) {
      var statusWidth;
      Boolean.__super__.drawBackground.call(this, ctx, dimentions);
      ctx.fillStyle = this.getStatus() ? config.get('color-success') : config.get('color-failure');
      statusWidth = this.measureStatus(ctx);
      return ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h);
    };

    Boolean.prototype.measureStatus = function(ctx) {
      var textWidth;
      textWidth = this.getText() ? ctx.measureText(this.getText()).width : 20;
      return textWidth + 2 * config.get('padding');
    };

    return Boolean;

  })(Badge);

}).call(this);

},{"./Badge":1,"./config":5}],3:[function(require,module,exports){
(function() {
  var Badge, Info, config,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  config = require('./config');

  Badge = require('./Badge');


  /*
     * Info
  
    A badge that shows a single information as a key-value pair
  
     *# Parameters
    - `text` (String): the text shown on the left hand side of the badge (key)
    - `info` (String): the text shown on the right hand side of the badge (value)
  
     *# Typical use cases
    - Show the current version of a package
    - Show the date of last build (useful when shown together with a build status badge)
   */

  module.exports = Info = (function(_super) {
    __extends(Info, _super);

    function Info() {
      return Info.__super__.constructor.apply(this, arguments);
    }

    Info.prototype.measure = function(ctx) {
      var dimentions;
      dimentions = Info.__super__.measure.call(this, ctx);
      dimentions.w += this.measureInfo(ctx);
      return dimentions;
    };

    Info.prototype.drawForeground = function(ctx, dimentions) {
      Info.__super__.drawForeground.call(this, ctx, dimentions);
      return this.drawText(ctx, dimentions, this.info, {
        align: 'right',
        margin: 5
      });
    };

    Info.prototype.drawBackground = function(ctx, dimentions) {
      var infoWidth;
      Info.__super__.drawBackground.call(this, ctx, dimentions);
      ctx.fillStyle = config.get('color-info');
      infoWidth = this.measureInfo(ctx);
      return ctx.fillRect(dimentions.w - infoWidth, 0, infoWidth, dimentions.h);
    };

    Info.prototype.measureInfo = function(ctx) {
      var textWidth;
      textWidth = this.info ? ctx.measureText(this.info).width : 20;
      return textWidth + 2 * 5;
    };

    return Info;

  })(Badge);

}).call(this);

},{"./Badge":1,"./config":5}],4:[function(require,module,exports){
(function() {
  var Badge, Progress, config,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  config = require('./config');

  Badge = require('./Badge');


  /*
     * Progress
  
    A badge that shows a real value bounded between a minimum and a maximum.
    The badge is color coded to indicate wether the value is in the "bad", "warning"
    or "good" interval (defined by the `bounds` parameter).
  
     *# Parameters
    - `text` (String): the text shown on the left hand side of the badge (key)
    - `progress` (Number): the real value to show ranging from 0 to 100
    - `progressText` (String): the text shown on the right hand side of the badge (value)
    - `unit` (String): a string appended to the progressText (default: '%')
    - `bounds` (Array): two values that delimit the bad, warning and good zones (default: [40, 80])
  
     *# Typical use cases
    - Show code coverage (it was designed specifically for this use).
    - Show any bounded continuous value.
   */

  module.exports = Progress = (function(_super) {
    __extends(Progress, _super);

    function Progress(params) {
      params.text += ':';
      if (!params.bounds) {
        params.bounds = [40, 80];
      }
      if (!params.unit) {
        params.unit = '%';
      }
      Progress.__super__.constructor.call(this, params);
    }

    Progress.prototype.measure = function(ctx) {
      var dimentions;
      dimentions = Progress.__super__.measure.call(this, ctx);
      dimentions.w += this.measureProgress(ctx);
      return dimentions;
    };

    Progress.prototype.drawForeground = function(ctx, dimentions) {
      Progress.__super__.drawForeground.call(this, ctx, dimentions);
      return this.drawText(ctx, dimentions, this.progressText(), {
        align: 'right',
        margin: config.get('padding')
      });
    };

    Progress.prototype.drawBackground = function(ctx, dimentions) {
      Progress.__super__.drawBackground.call(this, ctx, dimentions);
      if (this.progress < this.bounds[0]) {
        ctx.fillStyle = config.get('color-failure');
      } else if (this.progress < this.bounds[1]) {
        ctx.fillStyle = config.get('color-warning');
      } else {
        ctx.fillStyle = config.get('color-success');
      }
      return ctx.fillRect(0, 0, this.progress / 100 * dimentions.w, dimentions.h);
    };

    Progress.prototype.progressText = function(ctx) {
      return '' + this.progress + this.unit;
    };

    Progress.prototype.measureProgress = function(ctx) {
      var textWidth;
      textWidth = ctx.measureText(this.progressText()).width;
      return textWidth + config.get('padding');
    };

    return Progress;

  })(Badge);

}).call(this);

},{"./Badge":1,"./config":5}],5:[function(require,module,exports){
(function() {
  module.exports = {
    data: {
      'color-success': '#0a0',
      'color-failure': '#a00',
      'color-warning': '#880',
      'color-info': '#3BC2EB',
      'color-background': '#444',
      'color-text': '#fff',
      'font': '11px Verdana',
      'border-radius': 5,
      'padding': 5,
      'text-height': 14,
      'width': 50,
      'height': 20
    },
    set: function(conf) {
      var key, val, _results;
      _results = [];
      for (key in conf) {
        val = conf[key];
        _results.push(this.data[key] = val);
      }
      return _results;
    },
    get: function(key) {
      return this.data[key];
    }
  };

}).call(this);

},{}],6:[function(require,module,exports){
(function() {
  var config;

  config = require('./config');

  module.exports = {
    Badge: require('./Badge'),
    Boolean: require('./Boolean'),
    Progress: require('./Progress'),
    Info: require('./Info'),
    config: function(conf) {
      return config.set(conf);
    }
  };

}).call(this);

},{"./Badge":1,"./Boolean":2,"./Info":3,"./Progress":4,"./config":5}]},{},[6])(6)
});