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
