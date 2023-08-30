import { DataBase } from "@senka/db";
import { Logger } from "@senka/logger";
import { logSystemLogoAndInfo } from "@senka/systeminfo";
import { Client as DClient, ClientOptions as DClientOptions } from "discord.js";
import Colorizer from "string-colorizer";

const colorizer = new Colorizer();
const botTokenDb = new DataBase({ name: "tokens", path: "database" });
async function start(client: Client) {
  const red = "\x1b[31m";
  const blue = "\x1b[34m";
  console.clear();
  console.log(
    `                                                              
  ${blue}####       ##   ####  ${red}                                       ##               
 ${blue}###        ###     ###  ${red}            #####    ####    #####    ##        ####   
${blue}##         ###        ##  ${red}          ##       ##  ##   ##  ##   ## ##        ##  
${blue}##        ###         ##  ${red}           ####    ######   ##  ##   ####      #####  
 ${blue}###     ###        ###  ${red}               ##   ##       ##  ##   ## ##    ##  ##  
  ${blue}####   ##       ####  ${red}            #####     ####    ##  ##   ##  ##    #####  
`,
    colorizer.ansiCodes.foreground.white
  );
  let load = "#";

  for (let i = 0; i < 78; i++) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(colorizer.ansiCodes.foreground.blue);
    process.stdout.write(load + colorizer.ansiCodes.foreground.white);
    if (i < 27) load += "#";
    else load += colorizer.ansiCodes.foreground.red + "#";
    await new Promise((r) => setTimeout(r, 25));
  }
  console.clear();
  await logSystemLogoAndInfo();
  console.log('"help" Shows descriptions of commands ');
  process.stdout.write("> ");
  const stdin = process.openStdin();

  stdin.addListener("data", async (data: Buffer) => {
    const args = data
      .toString()
      .split(/ +/)
      .map((s) =>
        s.replaceAll("\r", "").replaceAll("\n", "").replaceAll("\t", "")
      );
    const command = args.shift()?.toLowerCase().trim();
    let commands: Array<{
      name: string;
      description: string;
      exec: Function;
    }> = [
      {
        name: "help",
        description: "Shows descriptions of commands",
        exec: (args: Array<string>) => {
          if (args[0] && commands.find((c) => c.name == args[0])) {
            let command = commands.find((c) => c.name == args[0]);
            console.log(
              `${colorizer.foregroundColors.green(
                command?.name
              )}  ${colorizer.foregroundColors.blue(command?.description)}`
            );
          } else {
            commands.forEach((c) =>
              console.log(
                `${colorizer.foregroundColors.green(
                  c?.name
                )}  ${colorizer.foregroundColors.blue(c?.description)}`
              )
            );
          }
        },
      },
      {
        name: "clear",
        description: "Clear the console",
        exec: () => {
          console.clear();
          console.log('"help" Shows descriptions of commands ');
        },
      },
      {
        name: "quit",
        description: "Closes the application",
        exec: () => {
          process.exit(0);
        },
      },
      {
        name: "login",
        description:
          "<db_token_name>\n login list bots  - Shows registered bot tokens",
        exec: async (args: Array<string>) => {
          if (args[0] == "list" && args[1] == "bots") {
            for (const key of Object.keys(botTokenDb.all())) {
              console.log(
                colorizer.foregroundColors.blue(key),
                colorizer.foregroundColors.red(
                  botTokenDb.get(key).slice(0, 40) + "...."
                )
              );
            }
          } else if (botTokenDb.has(args[0])) {
            client.login(botTokenDb.get(args[0]));
            await new Promise<void>((r, rj) => {
              const interval = setInterval(() => {
                if (client.readyAt) {
                  clearInterval(interval);
                  r();
                }
              }, 100);
            });
          }
        },
      },
      {
        name: "addToken",
        description: "<db_name> <bot_token>",
        exec: async (args: Array<string>) => {
          if (args.length < 2) return console.log("Missing property");
          const valid = await fetch("https://discord.com/api/v10/users/@me", {
            method: "GET",
            headers: { Authorization: `Bot ${args[1]}` },
          });

          if (valid.status === 200) {
            botTokenDb.set(args[0], args[1]);
            console.log("Token is saved");
          } else {
            console.log("Invalid token");
          }
        },
      },
    ];

    await commands
      .find((c) => c.name.toLocaleLowerCase() == command)
      ?.exec(args);
    process.stdout.write("> ");
  });
}
interface botLogs {
  startLog?: boolean;
}
interface loggerOptions {
  time?: boolean;
}
interface ClientOptions extends DClientOptions {
  botLogs?: botLogs;
  loggerOptions?: loggerOptions;
}
export class Client extends DClient {
  logger: Logger;
  constructor(options: ClientOptions) {
    super(options);
    this.logger = new Logger(options.loggerOptions);
    start(this);

    this.once("ready", async () => {
      console.log("\n");
      this.logger.log(`${this.user?.username} logged on`);
    });
  }
  login(token: string): Promise<string> {
    return super.login(token);
  }
}
