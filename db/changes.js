var knex = require('./connect');
var _ = require('lodash');

var Changes = exports;

// changesets: 
// - id   'doc-15/master
// - parent: (not needed now that's for branching later)

// changes:
// - id 'doc-15/master/0'
// - changeset 'doc-15/master'
// - pos 0
// - data (json string)
// - 


// Then the following apis:

// store.addChange(changesetName, change)
// store.getChangeset(changesetName)


Changes.push = function(changes, set, user, cb) {
  var records = serializeChanges(changes, set, user);
  knex.table('changes').insert(records)
    .asCallback(function(err) {
      if(err) return cb(err);
      cb(null);
    });
};

Changes.get = function(changeSetName) {
  var query = knex('changes')
                .select('json timestamp')
                .where('id', changeSetName)
                .orderBy('pos', 'desc');

  query.asCallback(function(err, changes) {
    if(err) return cb(err);
    return cb(null, changes);
  });
};

// Changes serializaton
// ------------
// 
// Takes a changes array or object and turns it into SQL compatible
// representation.
//

var serializeChanges = function(changes, set, user) {
  var serialized = [];

  _.each(changes, function(change, pos){
    var record = {
      id: set + '/' + pos,
      changeset: set,
      pos: pos,
      data: JSON.stringify(change),
      timestamp: Date.now(),
      user: user
    };
    serialized.push(record);
  });

  return serialized;
};