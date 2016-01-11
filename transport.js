var store = require('./store');
var Transport = exports;

// Currently relies on web sockets but this could work with other
// transport implementations too.

Transport.requestHandler = function(req, hub) {
  if(req.type == 'add') {
    store.addChange(hub.db, req.set, req.data, req.user, function(err, data) {
      if(err) return hub.send(JSON.stringify(err));
      hub.send('{"status":"ok"}');
    });
  } else if(req.type == 'get') {
    store.getChangeSet(hub.db, req.set, function(err, data) {
      if(err) return hub.send(JSON.stringify(err));
      hub.send(data);
    });
  }
};

Transport.register = function(hub) {
  hub.on('message', function(msg) {
    try {
      var req = JSON.parse(msg);
      Transport.requestHandler(req, hub);
    }
    catch (err) {
      console.log(err);
    }
  });
};