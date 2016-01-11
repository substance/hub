var _ = require('lodash');

var Changes = exports;

Changes.push = function(db, changes, set, user, cb) {
  serializeChanges(db, changes, set, user, function(err, records) {
    if(err) return cb(err);
    db.table('changes').insert(records)
    .asCallback(function(err) {
      if(err) return cb(err);
      cb(null);
    });
  });
};

Changes.get = function(db, changeSetName, cb) {
  var query = db('changes')
                .select('data', 'id')
                .where('changeset', changeSetName)
                .orderBy('pos', 'desc');

  query.asCallback(function(err, changes) {
    if(err) return cb(err);
    return cb(null, changes);
  });
};

Changes.getSize = function(db, changeSetName, cb) {
  var query = db('changes')
                .where('changeset', changeSetName)
                .count();
  query.asCallback(function(err, count) {
    if(err) return cb(err);
    return cb(null, count[0]['count(*)']);
  });
};

// Changes serializaton
// ------------
// 
// Takes a changes array or object and turns it into SQL compatible
// representation.
//
var serializeChanges = function(db, changes, set, user, cb) {
  changes = _.isArray(changes) ? changes : [changes];
  var serialized = [];

  Changes.getSize(db, set, function(err, counter) {
    if(err) return cb(err);
    _.each(changes, function(change, pos){
      var record = {
        id: set + '/' + (counter + pos),
        changeset: set,
        pos: counter + pos,
        data: JSON.stringify(change),
        timestamp: Date.now(),
        user: user
      };
      serialized.push(record);
    });
    cb(null, serialized);
  });
};