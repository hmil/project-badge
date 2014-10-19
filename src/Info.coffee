config = require('./config')
Badge = require('./Badge')


###
  # Info

  A badge that shows a single information as a key-value pair

  ## Parameters
  - `text` (String): the text shown on the left hand side of the badge (key)
  - `info` (String): the text shown on the right hand side of the badge (value)

  ## Typical use cases
  - Show the current version of a package
  - Show the date of last build (useful when shown together with a build status badge)
###
module.exports = class Info extends Badge
  
  doMeasure: (ctx) ->
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
    ctx.fillStyle = config.get('color-info')
    infoWidth = @measureInfo(ctx)
    ctx.fillRect(dimentions.w - infoWidth, 0, infoWidth, dimentions.h)

  measureInfo: (ctx) ->
    textWidth = if @info then ctx.measureText(@info).width else 20
    return textWidth + 2*5
