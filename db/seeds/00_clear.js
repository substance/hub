exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('changes').del()
  );
};