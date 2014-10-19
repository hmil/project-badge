Badge = require('./Badge')
config = require('./config')

###
  # Boolean

  A badge that can take two states (namely 'failure' and 'success') depending
  on the value of 'status'

  ## Parameters
  - `text` (String): the text shown on the left hand side of the badge
  - `status` (true/false): defines the state the badge is in
  - `successText` (String): text shown on the right side of the badge in case of success
  - `failureText` (String): text shown on the right side of the badge in case of failure
  - `statusText`: (String): text shown on the right side of the badge regardless of the state
  statusText has precedence over (failure|success)Text

  ## Typical use cases
  - Show the result of a build in a CI environment (*à la* Travis-ci)
###
module.exports = class Boolean extends Badge
  
  measure: (ctx) ->
    dimentions = super(ctx)
    dimentions.w += @measureStatus(ctx)
    return dimentions

  drawForeground: (ctx, dimentions) ->
    super(ctx, dimentions)
    @drawText(ctx, dimentions, @getText(),
      align: 'right'
      margin: config.get('padding')
    )

  getText: () ->
    return @statusText if @statusText?
    return if @getStatus() then @successText else @failureText

  getStatus: () -> return if @inverse then !@status else @status

  drawBackground: (ctx, dimentions) ->
    super(ctx, dimentions)
    ctx.fillStyle = if @getStatus() then config.get('color-success') else config.get('color-failure')
    statusWidth = @measureStatus(ctx)
    ctx.fillRect(dimentions.w - statusWidth, 0, statusWidth, dimentions.h)

  measureStatus: (ctx) ->
    textWidth = if @getText() then ctx.measureText(@getText()).width else 20
    return textWidth + 2*config.get('padding')
