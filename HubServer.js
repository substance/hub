'use strict';

var http = require('http');
var WebSocketServer = require('ws').Server;
var EventEmitter = require('substance/util/EventEmitter');
var JSONConverter = require('substance/model/JSONConverter');

function HubServer() {
  EventEmitter.apply(this, arguments);
}

HubServer.Prototype = function() {
  // Handlers
  this.open = function(docId) {

    // 1. get doc from changeset
    var changes = getChangeset(docId).changes;
    var doc = new this.config.articleClass();
    changes.forEach(function(change) {
      doc.apply(change);
    });

    var converter = new JSONConverter();
    var json = converter.exportDocument(doc);
    // send data to client
    this._send('opened', json);
  };

  this.handleMessage = function(evt) {
    console.log('received: ', evt.data);
    var args = JSON.parse(evt.data);
    var method = args.shift();
    // Call handler
    this[method].apply(this, args);
  };

  // Open session
  this.connect = function(expressApp, port) {
    var server = http.createServer();
    var wss = new WebSocketServer({ server: server });
    // wss.on('connection', transport.register);

    wss.on('connection', function connection(ws) {
      // this.registerClient();
      ws.on('message', this.handleMessage);
      // ws.send('hello');
    }.bind(this));

    server.on('request', expressApp);
    server.listen(port, function () { console.log('Listening on ' + server.address().port); });
    return wss;
  };
};

EventEmitter.extend(HubServer);

module.exports = HubServer;
