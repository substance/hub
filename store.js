var Changes = require('./db').models.Changes;
var Store = exports;

Store.addChange = function(changeSetName, change, user, cb) {
  user = user || 'anonymous';
  if(!changeSetName) return new Error("You should provide set name");
  Changes.push(change, changeSetName, user, cb);
};

Store.getChangeSet = function(changeSetName, cb) {
  if(!changeSetName) return new Error("You should provide set name");
  Changes.get(changeSetName, function(err, result) {
    if(err) return cb(err);
    cb(null, JSON.stringify(result));
  });
};