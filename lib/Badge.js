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
