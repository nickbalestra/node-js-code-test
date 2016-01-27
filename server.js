var http = require('http');
var router = require('./router');

var port = 3000;
var ip = '127.0.0.1';

var server = http.createServer(router);
server.listen(port, ip);
