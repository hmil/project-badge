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

    Info.prototype.doMeasure = function(ctx) {
      var dimentions;
      dimentions = Info.__super__.doMeasure.call(this, ctx);
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
