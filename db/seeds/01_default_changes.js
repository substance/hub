var records = [
  {
    id: "doc-15/master/0",
    changeset: "doc-15/master",
    pos: 0,
    data: '{"a":"b","b":"c"}',
    timestamp: 1450636440163,
    user: "user-1"
  },
  {
    id: "doc-15/master/1",
    changeset: "doc-15/master",
    pos: 1,
    data: '{"a":"b","b":"c"}',
    timestamp: 1450636442328,
    user: "user-1"
  }
];

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('changes').insert(records)
  );
};