(function() {
  var spawn;
  spawn = require('child_process').spawn;
  exports.run = function(kwargs) {
    var traceroute;
    traceroute = spawn('traceroute', ['-m 25', '-w 3', '-f 4', kwargs.host]);
    traceroute.stdout.on('data', kwargs.onData);
    traceroute.stderr.on('data', kwargs.onError);
    return traceroute.on('exit', kwargs.onExit);
  };
}).call(this);
