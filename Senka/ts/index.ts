import { DataBase as SenkaDb } from "@senka/db";
import { Logger } from "@senka/logger";
import { logSystemLogoAndInfo } from "@senka/systeminfo";
import { ascii } from "@senka/text-to-ascii";
import { Collection } from "discord.js";
import {
  Client as DjsClient,
  ClientOptions as DjsClientOptions,
} from "discord.js";
import Colorizer from "string-colorizer";
import { readdirSync } from "fs";

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
