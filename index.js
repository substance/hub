var Knex = require('knex');
var WebSocketServer = require('ws').Server;
var transport = require('./transport');

function createHub(app, config) {
  var environment = process.env.NODE_ENV || 'production';
  var hub = new WebSocketServer({server: app});
  var knexConfig = config.client ? config[environment] : config;
  hub.db = new Knex(knexConfig);
  hub.on('connection', transport.register);
  // wss.on('connection', function connection(ws) {
  //   ws.on('message', function incoming(message) {
  //     console.log('received: %s', message);
  //   });

  //   ws.send('hello');
  // });
  return hub;
}

exports = createHub;