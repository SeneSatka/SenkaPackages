import { DataBase as SenkaDb } from "@senka/db";
import { Logger } from "@senka/logger";
import { logSystemLogoAndInfo } from "@senka/systeminfo";
import { ascii } from "@senka/text-to-ascii";
import {
  AttachmentBuilder,
  Collection,
  GuildMember,
  TextBasedChannel,
  TextChannel,
} from "discord.js";
import {
  Client as DjsClient,
  ClientOptions as DjsClientOptions,
} from "discord.js";
import Colorizer from "string-colorizer";
import { readdirSync } from "fs";
import { createCanvas, loadImage } from "canvas";
export interface ClientOptions extends DjsClientOptions {
  database?: "@sebka/db" /* | "MongoDb" | "orio.db" */;
  logger?: "@senka/logger" | false;
  loadingScreen?:
    | false
    | {
        text: string;
        color:
          | "black"
          | "blue"
          | "gray"
          | "green"
          | "orange"
          | "purple"
          | "red"
          | "white"
          | "yellow";
      };
  systemInfo?: boolean;
}
const colorizer = new Colorizer();

export class Client extends DjsClient {
  public logger: Logger;
  public db: SenkaDb | "Db not Found";
  private loadingEvents: boolean = false;
  private clientOptions: ClientOptions;
  private eventsLoadPath: string;
  public events: Collection<string, object>;
  constructor(options: ClientOptions) {
    super(options);
    this.eventsLoadPath = "";
    this.clientOptions = options;
    console.clear();
    this.logger = new Logger({ time: true });
    this.events = new Collection();
    this.db =
      options.database == "@sebka/db"
        ? new SenkaDb({ name: "senka.db" })
        : "Db not Found";
    if (options?.loadingScreen) {
      console.log(
        eval(
          `colorizer.foregroundColors.${options?.loadingScreen.color}(\`${ascii(
            options?.loadingScreen.text
          )}\`)`
        )
      );

      this.logger.loading({
        repeat: true,
        loadArr: colorizer.foregroundColors.red("#"),
        time: 1000,
        changeTime: 10,
      });
    }
    this.on("ready", async (c) => {
      this.logger.log(`${this.user?.username} logged on`);
    });
  }
  private async _loadEvents() {
    let eventSize = 0;
    const fileLoad = async (path: string) => {
      for (const file of readdirSync(path)) {
        const event = await import(path + "/" + file).then((m) => m.default);
        this.events.set(file, event);
        event(this);
        eventSize++;
      }
    };
    this.loadingEvents = false;
    if (this.eventsLoadPath.includes("{category}")) {
      for (const category of readdirSync(
        this.eventsLoadPath.split("{category}")[0]
      )) {
        await fileLoad(this.eventsLoadPath.split("{category}")[0] + category);
      }
    } else await fileLoad(this.eventsLoadPath);
    this.logger.log(
      colorizer.foregroundColors.red(eventSize),
      colorizer.foregroundColors.green("event loaded")
    );
  }
  loadEvents(path: string) {
    path = process.cwd() + path.replaceAll("./", "/").trim();
    path = path.endsWith("/") ? path : path + "/";
    this.eventsLoadPath = path;
    if (this.isReady()) {
      this._loadEvents();
    } else this.loadingEvents = true;
  }
  public async login(token?: string | undefined): Promise<string> {
    await new Promise((r) => setTimeout(r, 1100));
    console.clear();
    if (this.clientOptions?.systemInfo) {
      await logSystemLogoAndInfo();
    }
    if (this.loadingEvents) {
      this._loadEvents();
    }
    super.login(token);
    return super.token ?? "";
  }
}
export type Position = {
  x: "auto" | number;
  y: "auto" | number;
};
export type Size = { width: number; height: number };
export type FontSize = string | "large" | "medium" | "small";
export type Username =
  | {
      position: Position;
      fontSize: FontSize;
      color: string;
    }
  | "auto";
export type Message =
  | { text: string; position: Position; fontSize: FontSize; color: string }
  | "auto";
export type Avatar =
  | {
      size: number;
      position: Position;
      round: boolean;
    }
  | "auto";
export interface welcomeMessageOptions {
  card?: {
    size?: Size;
    name?: string | "welcomeCard";
    description?: string | "welcomeMessage Image Card";
  };
  backgroundImageUrl?: string;
  avatar?: Avatar;

  welcomeText?: {
    username?: Username;
    message?: Message;
  };
  accountCreationDate?: { position?: Position; fontSize?: FontSize };
  currentMembersCount?: boolean;
}
/**
 *  @example options.welcomeText.text="{user} {username} {guildname} {memberCount}"
 * user={name:"Test"}
 * guild={name:"TestServer",memberCount:2}
 * Output= "Test Test TestServer 2"
 */

export const welcomeMessage = async (
  type: "Image" | "Text",
  member: GuildMember,
  channel_id: string,
  client: Client,
  options?: welcomeMessageOptions
): Promise<any> => {
  const width = options?.card?.size?.width ?? 1400;
  const height = options?.card?.size?.height ?? 500;
  const name = options?.card?.name ?? "welcomeCard";
  const description = options?.card?.description ?? "welcomeMessage Image Card";
  let username: boolean | Username = false;
  let avatar: boolean | Avatar = false;
  let message: boolean | Message = false;
  if (options?.welcomeText?.message) {
    if (options.welcomeText.message == "auto") {
      message = {
        position: { x: "auto", y: "auto" },
        fontSize: "50px",
        text: "Selamun aleyküm",
        color: "white",
      };
    } else message = options.welcomeText.message;
  }
  if (options?.avatar) {
    if (options.avatar == "auto") {
      avatar = {
        round: true,
        size: 330,
        position: { x: "auto", y: "auto" },
      };
    } else {
      avatar = options.avatar;
    }
  }
  if (options?.welcomeText?.username) {
    if (options.welcomeText.username == "auto") {
      username = {
        position: { x: "auto", y: "auto" },
        fontSize: "50px",
        color: "white",
      };
    } else {
      username = options.welcomeText.username;
    }
  }

  const backgroundUrl =
    options?.backgroundImageUrl ??
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-w0NaWJcFIxNmuYDexUlFAG554lwFv0jjWvTBW7s2WBWNqIEYItRPY9fqTxmJbIrnbW3LLjOB5IGqAiH9nRugP58VR2Gg=w1280-h679";

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, [50]);
  ctx.closePath();
  ctx.clip();
  const background = await loadImage(backgroundUrl);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(40, 40, width - 80, height - 80, [60]);
  ctx.closePath();
  ctx.clip();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#fff";

  ctx.fillRect(40, 40, width - 80, height - 80);
  ctx.restore();
  if (avatar) {
    const x =
      avatar.position.x == "auto"
        ? 85 + avatar.size / 2
        : avatar.position.x + avatar.size / 2;
    const y =
      avatar.position.y == "auto"
        ? 85 + avatar.size / 2
        : avatar.position.y + avatar.size / 2;
    ctx.save();
    const avatarImage = await loadImage(
      member.displayAvatarURL({ extension: "jpg", size: 1024 })
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(x, y, avatar.size / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      avatarImage,
      avatar.position.x == "auto" ? 85 : avatar.position.x,
      avatar.position.y == "auto" ? 85 : avatar.position.y,
      avatar.size,
      avatar.size
    );
    ctx.restore();
  }
  if (username) {
    ctx.font = `${username.fontSize} Sans Serif`;
    ctx.fillStyle = username.color;
    const avatarX = avatar
      ? avatar.position.x == "auto"
        ? 85
        : avatar.position.x
      : 85;
    const avatarY = avatar
      ? avatar.position.y == "auto"
        ? 85
        : avatar.position.y
      : 85;
    const avatarSize = avatar ? avatar.size : 330;
    const name =
      member.user.globalName != null
        ? member.user.globalName
        : member.user.username;
    const x =
      username.position.x == "auto"
        ? avatarSize +
          avatarX * 2 +
          (width - (avatarSize + avatarY * 2)) / 2 -
          ctx.measureText(name).width
        : username.position.x;
    ctx.fillText(
      name,
      x,
      username.position.y == "auto" ? 100 : username.position.y
    );
  }
  if (message) {
    const text = message.text
      .replaceAll(
        "{user}",
        `${
          member.user.globalName != null
            ? member.user.globalName
            : member.user.username
        }`
      )
      .replaceAll("{username}", member.user.username)
      .replaceAll("{guild}", member.guild.name)
      .replaceAll("{memberCount}", `${member.guild.memberCount}`);
    ctx.font = `${message.fontSize} Sans Serif`;
    ctx.fillStyle = message.color;
    const avatarX = avatar
      ? avatar.position.x == "auto"
        ? 85
        : avatar.position.x
      : 85;
    const avatarY = avatar
      ? avatar.position.y == "auto"
        ? 85
        : avatar.position.y
      : 85;
    const avatarSize = avatar ? avatar.size : 330;
    const x =
      message.position.x == "auto"
        ? avatarSize +
          avatarX * 2 +
          (width - (avatarSize + avatarY * 2)) / 2 -
          ctx.measureText(text).width +
          100
        : message.position.x;
    ctx.fillText(
      text,
      x,
      message.position.y == "auto" ? 175 : message.position.y
    );
  }
  const welcomeCard = new AttachmentBuilder(canvas.toBuffer(), {
    name: name + ".png",
    description,
  });
  const channel = await client.channels.fetch(channel_id);
  if (channel?.isTextBased()) {
    channel.send({ files: [welcomeCard] });
  }
};
