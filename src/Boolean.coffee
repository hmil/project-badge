Badge = require('./Badge')

module.exports = class Boolean extends Badge
  
  measure: (ctx) ->
    dimentions = super(ctx)
    dimentions.w += @measureStatus(ctx)
    return dimentions

  drawForeground: (ctx, dimentions) ->
    super(ctx, dimentions)
    @drawText(ctx, dimentions, @getText(),
      align: 'right'
      margin: 5
    )

  getText: () ->
    text = if @getStatus() then @successText else @failureText
    return text if text?
    return @statusText

  getStatus: () -> return if @inverse then !@status else @status

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    ctx.fillStyle = if @getStatus() then '#0a0' else '#a00'
    statusWidth = @measureStatus(ctx)
    unused = 1

    ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h)

  measureStatus: (ctx) ->
    textWidth = if @getText() then ctx.measureText(@getText()).width else 20
    return textWidth + 2*5
