var WebSocketServer = require('ws').Server;
var transport = require('./transport');
var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', transport.register);