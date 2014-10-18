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
      return this.drawText(ctx, dimentions, this.getText(), {
        align: 'right',
        margin: 5
      });
    };

    Boolean.prototype.getText = function() {
      var text;
      text = this.getStatus() ? this.successText : this.failureText;
      if (text != null) {
        return text;
      }
      return this.statusText;
    };

    Boolean.prototype.getStatus = function() {
      if (this.inverse) {
        return !this.status;
      } else {
        return this.status;
      }
    };

    Boolean.prototype.drawBackground = function(ctx, dimentions) {
      var statusWidth, unused;
      Boolean.__super__.drawBackground.call(this, ctx, dimentions);
      ctx.fillStyle = this.getStatus() ? '#0a0' : '#a00';
      statusWidth = this.measureStatus(ctx);
      unused = 1;
      return ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h);
    };

    Boolean.prototype.measureStatus = function(ctx) {
      var textWidth;
      textWidth = this.getText() ? ctx.measureText(this.getText()).width : 20;
      return textWidth + 2 * 5;
    };

    return Boolean;

  })(Badge);

}).call(this);
