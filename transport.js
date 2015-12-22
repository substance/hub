var store = require('./store');
var Transport = exports;

Transport.requestHandler = function(req, ws) {
  if(req.type == 'add') {
    store.addChange(req.set, req.data, req.user, function(err, data){
      if(err) return ws.send(JSON.stringify(err));
      ws.send('{"status":"ok"}');
    });
  } else if(req.type == 'get') {
    store.getChangeSet(req.set, function(err, data) {
      if(err) return ws.send(JSON.stringify(err));
      ws.send(data);
    });
  }
};

Transport.register = function(ws) {
  ws.on('message', function(msg) {
    try {
      var req = JSON.parse(msg);
      Transport.requestHandler(req, ws);
    }
    catch (err) {
      console.log(err);
    }
  });
};