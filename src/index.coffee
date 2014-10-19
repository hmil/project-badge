config = require('./config')

module.exports = 
  Badge: require('./Badge')
  Boolean: require('./Boolean')
  Progress: require('./Progress')
  Info: require('./Info')

  config: (conf) ->
    config.set(conf)