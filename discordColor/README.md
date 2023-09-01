# <center> SenkaDiscordColorizer</center>

## Usage

```js
import { colorizer } from "@senka/discord-colorizer";
client.channels.get("<channel_id>").send(
  colorizer.build(`${colorizer.blue("Hello")}
 ${colorizer.red("World")}`)
);
```

<div style="background:rgba(22,27,34,255); border-radius:5px;padding:10px" >
<span style="color:blue;">Hello</span>
<span style="color:red;">World</span></div>

<div><a href="https://discord.com/users/812347817602842624">Discord</a></div>
