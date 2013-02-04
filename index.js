var http = require('http');
var traceroute = require('./traceroute');

http.createServer(function (req, res) {

	var query = require('url').parse(req.url);
	var queryparams = require('querystring').parse(query['query']);
	var target = queryparams['host'];
	var ipa = target.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
	var response = '';



	if (null != ipa) {

		traceroute.run({
			host: target,
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
		res.write('Incorrect IP!');
		res.end();
	}

}).listen(80);
