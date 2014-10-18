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
