
height = 20
width = 50
radius = 5
font = '11px Verdana';
margin_x = 5

module.exports = class Badge
  constructor: (params) ->
    @[key] = val for key, val of params

  getHeight: () ->
    return height

  renderTo: (ctx, x=0, y=0) ->
    ctx.save()

    ctx.font = font

    ctx.translate(x, y)
    dimentions = @measure(ctx)

    @drawBorder(ctx, dimentions, radius)
    ctx.clip()

    @drawBackground(ctx, dimentions)
    @drawBackgroundEffects(ctx, dimentions)

    @drawForeground(ctx, dimentions)
    @drawForegroundEffects(ctx, dimentions)

    ctx.restore()
    return

  measure: (ctx) ->
    textWidth = if @text then ctx.measureText(@text).width else width
    return h: @getHeight(), w: textWidth + 2*margin_x

  drawBackground: (ctx, {w, h}) ->
    ctx.fillStyle = '#444'
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

  drawForegroundEffects: (ctx, {w, h}) ->
    return


  drawText: (ctx, {w, h}, text, options = {}) ->
    ctx.fillStyle = '#fff'
    if options.align is 'right'
      x = w - (if options.margin then options.margin else 5) - ctx.measureText(text).width
    else
      x = if options.margin then options.margin else 5
    ctx.fillText(text, x, 14)

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