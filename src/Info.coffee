Badge = require('./Badge')

module.exports = class Info extends Badge
  
  measure: (ctx) ->
    dimentions = super(ctx)
    dimentions.w += @measureInfo(ctx)
    return dimentions

  drawForeground: (ctx, dimentions) ->
    super(ctx, dimentions)
    @drawText(ctx, dimentions, @info,
      align: 'right'
      margin: 5
    )

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    ctx.fillStyle = '#3BC2EB'
    infoWidth = @measureInfo(ctx)
    ctx.fillRect(dimentions.w - infoWidth, 0, infoWidth, dimentions.h)

  measureInfo: (ctx) ->
    textWidth = if @info then ctx.measureText(@info).width else 20
    return textWidth + 2*5
