var change = {
  ops: [
    {
      type: "create",
      path: ["p1"],
      val: {
        id: "p1",
        type: "paragraph",
        content: "Substance is a JavaScript library for web-based content editing. Build simple text editors or full-featured publishing systems. Substance provides you building blocks for your very custom editor.",      
      }
    },
    {
      type: "create",
      path: ["t1"],
      val: {
        id: "t1",
        type: "todo",
        done: false,
        content: "Water the plants"
      }
    },
    {
      type: "set",
      path: ['body', 'nodes'],
      original: [],
      val: ["p1", "t1"],
    }
  ]
};

var records = [
  {
    id: "test-note/master/0",
    changeset: "test-note/master",
    pos: 0,
    data: JSON.stringify(change),
    timestamp: 1450636440163,
    user: "user-1"
  }
];

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('changes').insert(records)
  );
};