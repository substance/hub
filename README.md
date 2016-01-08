# hub

Experimental server for realtime collab.

On server:

run ```npm run seed``` and then ```npm run start```

On client:

```js
var host = "ws://localhost:8080";
var ws = new WebSocket(host);

ws.onmessage = function (event) {
  var msg = JSON.parse(event.data);
  console.log(msg);
}

ws.send('{"type":"add","set":"doc-15/master","data":{"a":"b","b":"c"}}');
```

will print `{status: 'ok'}`.

```js
ws.send('{"type":"get","set":"doc-15/master"}');
```


will print array of objects `{id:'doc-15/master', data: {...}}`.