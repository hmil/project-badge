Badge = require('./Badge');

module.exports = class Progress extends Badge

  constructor: (params) ->
    params.text += ':'
    if (!params.bounds) then params.bounds = [40, 80]
    if (!params.unit) then params.unit = '%'
    super(params)

  measure: (ctx) ->
    dimentions = super(ctx)
    dimentions.w += @measureProgress(ctx)
    return dimentions

  drawForeground: (ctx, dimentions) ->
    super(ctx, dimentions)
    @drawText(ctx, dimentions, @progressText(), 
      align: 'right'
      margin: 5
    )

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    if (@progress < @bounds[0])
      ctx.fillStyle = '#a00'
    else if (@progress < @bounds[1])
      ctx.fillStyle = '#880'
    else
      ctx.fillStyle = '#0a0'

    ctx.fillRect(0, 0, @progress/100 * dimentions.w, dimentions.h)

  progressText: (ctx) -> ''+@progress+@unit

  measureProgress: (ctx) ->
    textWidth = ctx.measureText(@progressText()).width
    return textWidth + 5