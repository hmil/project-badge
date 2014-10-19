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

    Progress.prototype.doMeasure = function(ctx) {
      var dimentions;
      dimentions = Progress.__super__.doMeasure.call(this, ctx);
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
