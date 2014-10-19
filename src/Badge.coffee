
config = require('./config')
CanvasFactory = require('./CanvasFactory')

###
  # Badge
  
  Base class for any badge class. You may create a badge of type badge directly but
  it won't generally be of great use.

  It defines the badge public interface and handles the rendering pipeline. 

  ## Public API
  The public API is defined by the parent class Badge and should not be overriden.
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
  
  ## Rendering pipeline 
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

  To implement custom measurments, override `doMeasure`
  - `doMeasure(ctx: RenderingContext) -> Dimentions`  
    Actually performs the measure


  ## Parameters
  The following parameters are assumed to be necessary for any class implementing a badge
  - `text` (String): default text shown in the badge, left aligned

###
module.exports = class Badge
  constructor: (params) ->
    @[key] = val for key, val of params


  ### Public API ###

  renderTo: (ctx, x=0, y=0) ->
    ctx.save()

    ctx.font = config.get('font')

    ctx.translate(x, y)
    dimentions = @measure(ctx)

    @drawBorder(ctx, dimentions, config.get('border-radius'))
    ctx.clip()

    @drawBackground(ctx, dimentions)
    @drawBackgroundEffects(ctx, dimentions)

    @drawForeground(ctx, dimentions)
    @drawForegroundEffects(ctx, dimentions)

    ctx.restore()
    return

  asDOMNode: () ->
    canvas = CanvasFactory.createCanvas()
    ctx = canvas.getContext('2d')
    
    dim = @measure(ctx)

    canvas.width = dim.w
    canvas.height = dim.h
    this.renderTo(ctx)

    return canvas

  measure: (ctx) ->
    ctx.save()
    ctx.font = config.get('font')
    dim = @doMeasure(ctx)
    ctx.restore()
    return dim


  ### Rendering pipeline ###

  doMeasure: (ctx) ->
    textWidth = if @text then ctx.measureText(@text).width else config.get('width')
    return h: @getHeight(), w: textWidth + 2*config.get('padding')

  drawBorder: (ctx, {w, h}, radius) ->
    ctx.moveTo(radius,0)
    ctx.lineTo(w-radius, 0)
    ctx.arcTo(w, 0, w, radius, radius)
    ctx.lineTo(w, h-radius)
    ctx.arcTo(w, h, w-radius, h, radius)
    ctx.lineTo(radius, h)
    ctx.arcTo(0, h, 0, h-radius, radius)
    ctx.lineTo(0, radius)
    ctx.arcTo(0, 0, radius, 0, radius)

  drawBackground: (ctx, {w, h}) ->
    ctx.fillStyle = config.get('color-background')
    ctx.fillRect(0, 0, w, h)

  drawBackgroundEffects: (ctx, {w, h}) ->
    ctx.save()
    gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, '#fff')
    gradient.addColorStop(1, '#888')
    ctx.globalCompositeOperation = "multiply"
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    ctx.restore()

  drawForeground: (ctx, dimentions) ->
    @drawText(ctx, dimentions, @text)

  drawForegroundEffects: (ctx, {w, h}) -> return undefined


  ### Utility methods ###

  getHeight: () ->
    return config.get('height')

  drawText: (ctx, {w, h}, text, options = {}) ->
    ctx.fillStyle = config.get('color-text')
    if options.align is 'right'
      x = w - config.get('padding') - ctx.measureText(text).width
    else
      x = config.get('padding')
    ctx.fillText(text, x, config.get('text-height'))