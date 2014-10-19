config = require('./config')
Badge = require('./Badge');

###
  # Progress

  A badge that shows a real value bounded between a minimum and a maximum.
  The badge is color coded to indicate wether the value is in the "bad", "warning"
  or "good" interval (defined by the `bounds` parameter).

  ## Parameters
  - `text` (String): the text shown on the left hand side of the badge (key)
  - `progress` (Number): the real value to show ranging from 0 to 100
  - `progressText` (String): the text shown on the right hand side of the badge (value)
  - `unit` (String): a string appended to the progressText (default: '%')
  - `bounds` (Array): two values that delimit the bad, warning and good zones (default: [40, 80])

  ## Typical use cases
  - Show code coverage (it was designed specifically for this use).
  - Show any bounded continuous value.
###
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
      margin: config.get('padding')
    )

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    if (@progress < @bounds[0])
      ctx.fillStyle = config.get('color-failure')
    else if (@progress < @bounds[1])
      ctx.fillStyle = config.get('color-warning')
    else
      ctx.fillStyle = config.get('color-success')

    ctx.fillRect(0, 0, @progress/100 * dimentions.w, dimentions.h)

  progressText: (ctx) -> ''+@progress+@unit

  measureProgress: (ctx) ->
    textWidth = ctx.measureText(@progressText()).width
    return textWidth + config.get('padding')