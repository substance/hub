var knex = require('./connect');
var async = require("async");

// Initialize knex connection
// --------------

// Expose models
// --------------

var models = {
  Changes: require("./changes")
};

// export connection
module.exports = {
  models: models,
  knex: knex
};