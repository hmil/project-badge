!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.badge=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Badge, font, height, margin_x, radius, width;

  height = 20;

  width = 50;

  radius = 5;

  font = '11px Verdana';

  margin_x = 5;

  module.exports = Badge = (function() {
    function Badge(params) {
      var key, val;
      for (key in params) {
        val = params[key];
        this[key] = val;
      }
    }

    Badge.prototype.getHeight = function() {
      return height;
    };

    Badge.prototype.renderTo = function(ctx, x, y) {
      var dimentions;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      ctx.save();
      ctx.font = font;
      ctx.translate(x, y);
      dimentions = this.measure(ctx);
      this.drawBorder(ctx, dimentions, radius);
      ctx.clip();
      this.drawBackground(ctx, dimentions);
      this.drawBackgroundEffects(ctx, dimentions);
      this.drawForeground(ctx, dimentions);
      this.drawForegroundEffects(ctx, dimentions);
      ctx.restore();
    };

    Badge.prototype.measure = function(ctx) {
      var textWidth;
      textWidth = this.text ? ctx.measureText(this.text).width : width;
      return {
        h: this.getHeight(),
        w: textWidth + 2 * margin_x
      };
    };

    Badge.prototype.drawBackground = function(ctx, _arg) {
      var h, w;
      w = _arg.w, h = _arg.h;
      ctx.fillStyle = '#444';
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
    };

    Badge.prototype.drawText = function(ctx, _arg, text, options) {
      var h, w, x;
      w = _arg.w, h = _arg.h;
      if (options == null) {
        options = {};
      }
      ctx.fillStyle = '#fff';
      if (options.align === 'right') {
        x = w - (options.margin ? options.margin : 5) - ctx.measureText(text).width;
      } else {
        x = options.margin ? options.margin : 5;
      }
      return ctx.fillText(text, x, 14);
    };

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

    return Badge;

  })();

}).call(this);

},{}],2:[function(require,module,exports){
(function() {
  var Badge, Boolean,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Badge = require('./Badge');

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
      return this.drawText(ctx, dimentions, this.statusText, {
        align: 'right',
        margin: 5
      });
    };

    Boolean.prototype.drawBackground = function(ctx, dimentions) {
      var statusWidth;
      Boolean.__super__.drawBackground.call(this, ctx, dimentions);
      ctx.fillStyle = this.status ? '#0a0' : '#a00';
      statusWidth = this.measureStatus(ctx);
      return ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h);
    };

    Boolean.prototype.measureStatus = function(ctx) {
      var textWidth;
      textWidth = this.statusText ? ctx.measureText(this.statusText).width : 20;
      return textWidth + 2 * 5;
    };

    return Boolean;

  })(Badge);

}).call(this);

},{"./Badge":1}],3:[function(require,module,exports){
(function() {
  var Badge, Progress,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Badge = require('./Badge');

  module.exports = Progress = (function(_super) {
    __extends(Progress, _super);

    function Progress(params) {
      params.text += ':';
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
        margin: 5
      });
    };

    Progress.prototype.drawBackground = function(ctx, dimentions) {
      Progress.__super__.drawBackground.call(this, ctx, dimentions);
      if (this.progress < this.bounds[0]) {
        ctx.fillStyle = '#a00';
      } else if (this.progress < this.bounds[1]) {
        ctx.fillStyle = '#880';
      } else {
        ctx.fillStyle = '#0a0';
      }
      return ctx.fillRect(0, 0, this.progress / 100 * dimentions.w, dimentions.h);
    };

    Progress.prototype.progressText = function(ctx) {
      return '' + this.progress + this.unit;
    };

    Progress.prototype.measureProgress = function(ctx) {
      var textWidth;
      textWidth = ctx.measureText(this.progressText()).width;
      return textWidth + 5;
    };

    return Progress;

  })(Badge);

}).call(this);

},{"./Badge":1}],4:[function(require,module,exports){
(function() {
  module.exports = {
    Badge: require('./Badge'),
    Boolean: require('./Boolean'),
    Progress: require('./Progress')
  };

}).call(this);

},{"./Badge":1,"./Boolean":2,"./Progress":3}]},{},[4])(4)
});