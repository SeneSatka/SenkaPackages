import { DataBase as SenkaDb } from "@senka/db";
import { Logger } from "@senka/logger";
import { logSystemLogoAndInfo } from "@senka/systeminfo";
import {
  Client as DjsClient,
  ClientOptions as DjsClientOptions,
} from "discord.js";

export interface ClientOptions extends DjsClientOptions {
  database?: "@sebka/db" /* | "MongoDb" | "orio.db" */;
  logger?: "@senka/logger" | false;
  loadingScreen?: false | { text: string; time: number };
  systemInfo?: boolean;
}

export class Client extends DjsClient {
  public logger: Logger | Object;
  public db: SenkaDb | "Db not Found";
  constructor(options: ClientOptions) {
    super(options);
    this.logger = new Logger();

    this.db =
      options.database == "@sebka/db"
        ? new SenkaDb({ name: "senka.db" })
        : "Db not Found";
    this.on("ready", async (c) => {
      if (options?.systemInfo) {
        await logSystemLogoAndInfo();
      }
    });
  }
}
