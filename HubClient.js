'use strict';

var EventEmitter = require('substance/util/EventEmitter');

function HubClient(config) {
  EventEmitter.apply(this, arguments);
  this.config = config;

  // Start the websocket connection
  var host = "ws://localhost:5000";
  this.ws = new WebSocket(host);

  // websocket onopen corresponds to connected event
  this.ws.onopen = function() {
    console.log('connected to websocket server');
    this.emit('connected');
  }.bind(this);

  this.ws.onmessage = function (event) {
    console.log('onmessage', event);

    // var msg = JSON.parse(event.data);
    // console.log(msg);
  };
}

HubClient.Prototype = function() {
  // Serializes arguments (arguments must be primitive objects)
  this._send = function() {
    this.ws.send(JSON.stringify(arguments));
  }

  // Open session
  this.open = function(documentId, cb) {
    if (this._opening) throw new Error('Opening already in progress...');
    // this.ws.send('open', documentId);

    this._send('open', documentId);
    this._opening = true;
    setTimeout(function() {
      if (this._opening) cb('Open failed. Timeout.');
      this.opening = false;
    }.bind(this), 3000);
  };

  this.
};

EventEmitter.extend(HubClient);

module.exports = HubClient;
