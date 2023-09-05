# @senka/discord.js-canvas

## Usage

```js
import { welcomeMessageImage } from "@senka/discord.js-canvas";
const { welcomeMessageImage } = require("@senka/discord.js-canvas");
```

```js
const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

client.login("<bot_token>");
client.on("guildMemberAdd", async (member) => {
  const image = await new welcomeMessageImage(member, true).create();
  const channel = member.client.channels.get("<channel_id>");

  channel.send({
    files: [
      new AttachmentBuilder(image, {
        name: "welcomeImage.png",
        description: "@senka/discord.js-canvas",
      }),
    ],
  });
});
```

## Options

```js
const image =await new welcomeMessageImage(member, /*Auto? boolean*/ false)
.setUsername({
    position: Position;
    fontSize: FontSize;
    color: string;
} | "auto")
.setAvatar({
    size: number | "auto";
    position: Position;
    round: boolean | "auto";
    border: {
        size: number | "auto";
        color: string;
    } | false;
} | "auto")
.setCard({
    size: {
        width: number | "auto";
        height: number | "auto";
    };
    backgroundUrl: string;
} | "auto")
.setTransparentLayer({
    size: {
        width: number | "auto";
        height: number | "auto";
    };
    alpha: number | "auto";
    position: Position;
    round: Array<number> | "auto";
    color: string | "auto";
} | "auto")
.addText({
    text: string;
    position: Position;
    fontSize: FontSize;
    color: string;
    textAlign: "Left" | "Right" | "Center";
} | "auto")
.create()//await

```
