// Original made by 0101
// https://github.com/0101/traceroute/

(function() {
  var spawn;
  spawn = require('child_process').spawn;
  exports.run = function(kwargs) {
    var traceroute;
    traceroute = spawn('traceroute', ['-m 25', '-w 3', '-f '+kwargs.skip, kwargs.host]);
    traceroute.stdout.on('data', kwargs.onData);
    traceroute.stderr.on('data', kwargs.onError);
    return traceroute.on('exit', kwargs.onExit);
  };
}).call(this);
