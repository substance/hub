'use strict';

var EventEmitter = require('substance/util/EventEmitter');
var oo = require('substance/util/oo');

function HubClient(config) {
  EventEmitter.apply(this, arguments);
  this.config = config;

  // Start the websocket connection
  var host = "ws://localhost:5000";
  this.ws = new WebSocket(host);

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
  
  // Open session
  this.open = function(documentId) {
    this.ws.send('open', documentId);
  };
};

EventEmitter.extend(HubClient);

module.exports = HubClient;


