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
    - `unknownText` (String): text shown on the right side of the badge in case the status is unknown
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

    Boolean.prototype.doMeasure = function(ctx) {
      var dimentions;
      dimentions = Boolean.__super__.doMeasure.call(this, ctx);
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
      if (this.getStatus() == null) {
        return this.unknownText;
      }
      if (this.getStatus()) {
        return this.successText;
      } else {
        return this.failureText;
      }
    };

    Boolean.prototype.getStatus = function() {
      if (this.status == null) {
        return this.status;
      }
      if (this.inverse) {
        return !this.status;
      } else {
        return this.status;
      }
    };

    Boolean.prototype.drawBackground = function(ctx, dimentions) {
      var statusWidth;
      Boolean.__super__.drawBackground.call(this, ctx, dimentions);
      if (this.getStatus() == null) {
        ctx.fillStyle = config.get('color-unknown');
      } else if (this.getStatus()) {
        ctx.fillStyle = config.get('color-success');
      } else {
        ctx.fillStyle = config.get('color-failure');
      }
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
