(function() {
  module.exports = {
    data: {
      'color-success': '#0a0',
      'color-failure': '#a00',
      'color-warning': '#880',
      'color-info': '#3BC2EB',
      'color-background': '#444',
      'color-text': '#fff',
      'font': '11px Verdana',
      'border-radius': 5,
      'padding': 5,
      'text-height': 14,
      'width': 50,
      'height': 20
    },
    set: function(conf) {
      var key, val, _results;
      _results = [];
      for (key in conf) {
        val = conf[key];
        _results.push(this.data[key] = val);
      }
      return _results;
    },
    get: function(key) {
      return this.data[key];
    }
  };

}).call(this);
