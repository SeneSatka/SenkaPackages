# <center> SenkaLogger</center>

## Usage

```js
import {Database} from "@senka/db";
/**
 * Commonjs
 * const {Database} = require("@senka/db")
 */
const db = new Db({path?:string,name?:string});
db.set("a",0)//{"a":0}
db.add("a",6)//{"a":6}
db.subtract("a",2)//{"a":4}

db.get("a")//return 4
db.fetch("a")//return 4
db.all()//return {"a":4}

db.deleteAll()//{}
db.delete("a")//{}
db.has("a")//return false


```

## Emitter

```js
db.on("set", (oldData, newData) => {
  console.log(`${oldData} => ${newData}`);
});
db.on("delete", (deleteData) => {
  console.log(`${deleteData}`);
});
db.on("add", (oldData, newData) => {
  console.log(`${oldData} => ${newData}`);
});
db.on("subtract", (oldData, newData) => {
  console.log(`${oldData} => ${newData}`);
});
db.on("deleteAll", (data) => {
  console.log(`${data}`);
});
```

- <a href="https://discord.com/users/812347817602842624">Discord</a>
