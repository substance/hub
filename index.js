// var transport = require('./transport');
var http = require('http');
var WebSocketServer = require('ws').Server;
var hub = {};

// Here each realtime editing session gets registered
// It gets removed when no session is active anymore
// var activeSessions = {};

hub.connect = function(app, port) {
  var server = http.createServer();
  var wss = new WebSocketServer({ server: server });
  // wss.on('connection', transport.register);

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.send('hello');
  });

  server.on('request', app);
  server.listen(port, function () { console.log('Listening on ' + server.address().port); });
  return wss;
};

module.exports = hub;
