(function() {
  var config;

  config = require('./config');

  module.exports = {
    Badge: require('./Badge'),
    Boolean: require('./Boolean'),
    Progress: require('./Progress'),
    Info: require('./Info'),
    config: function(conf) {
      return config.set(conf);
    }
  };

}).call(this);
