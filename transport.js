var store = require('./store');
var Transport = exports;

Transport.requestHandler = function(req, ws) {
	if(req.type == 'add') {
		store.addChange(req.set, req.data, req.user);
	} else if(req.type == 'get') {
		store.getChangeSet(req.set, function(err, data) {
			if(err) return ws.send(JSON.stringify(err));
			ws.send(data);
		}
	}
};

Transport.use = function(ws) {
  ws.on('message', function(msg) {
    var req = JSON.parse(msg);
    Transport.requestHandler(req, ws);
  });
});