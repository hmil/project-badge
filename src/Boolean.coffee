Badge = require('./Badge')

module.exports = class Boolean extends Badge

  measure: (ctx) ->
    dimentions = super(ctx)
    dimentions.w += @measureStatus(ctx)
    return dimentions

  drawForeground: (ctx, dimentions) ->
    super(ctx, dimentions)
    @drawText(ctx, dimentions, @statusText, 
      align: 'right'
      margin: 5
    )

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    ctx.fillStyle = if @status then '#0a0' else '#a00'
    statusWidth = @measureStatus(ctx)
    unused = 1

    ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h)

  measureStatus: (ctx) ->
    textWidth = if @statusText then ctx.measureText(@statusText).width else 20
    return textWidth + 2*5
