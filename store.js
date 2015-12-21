var Changes = require('./db').models.Changes;
var Store = exports;

Store.addChange = function(changeSetName, change, user) {
  user = user || 'anonymous';
  if(!changeSetName) return new Error("You should provide set name");
  Change.push(change, changeSetName, user, function(err) {
    if(err) return err;
  });
};

Store.getChangeSet = function(changeSetName, cb) {
  if(!changeSetName) return new Error("You should provide set name");
  Change.get(changeSetName, function(err, result) {
    if(err) return cb(err);
    cb(null, JSON.stringify(result));
  });
};