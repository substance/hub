var transport = require('./transport');
var http = require('http');
var WebSocketServer = require('ws').Server;
var hub = {};

hub.connect = function(expressApp, port) {
  var server = http.createServer();
  var wss = new WebSocketServer({ server: server });  

  wss.on('connection', transport.register);
  server.on('request', expressApp);
  server.listen(port, function () { console.log('Listening on ' + server.address().port) });

  return wss;
};

module.exports = hub;
