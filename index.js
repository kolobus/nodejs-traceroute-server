var http = require('http');
var traceroute = require('./traceroute');

// Need a lot of refactoring away from lasagna
// Will make it public to make myself force doing this...

http.createServer(function (req, res) {

	var query = require('url').parse(req.url);
	var response = '';

	if (typeof query['query'] != 'undefined') {
		var queryparams = require('querystring').parse(query['query']);

		if (typeof queryparams['host'] != undefined) {
			var target = queryparams['host'];
			var ipa = target.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
		} else {
			var ipa = null;
		}
	} else {
		var ipa = null;
	}

	if (null != ipa) {

		traceroute.run({
			host: target,
			skip: 4,
			onData: function(data) {
				response = response + data;
			},
			onError: function(data) {
        	                response = response + data;
			},
			onExit: function(code) {
                        	res.writeHead(200, {'Content-Type': 'text/plain'});
                        	res.write(String(response));
				res.end();
			}
		});
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('Hi there!');
		res.end();
	}

}).listen(80);
