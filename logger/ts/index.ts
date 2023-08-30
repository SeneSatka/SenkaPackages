import Colorizer, { Styles } from "string-colorizer";

interface loggerOptions {
  discordColor?: string;
  defaultColor?: string;
  defaultErrorColor?: string;
  defaultWarningColor?: string;
  discordTextColor?: string;
  defaultTextColor?: string;
  defaultTextErrorColor?: string;
  defaultTextWarningColor?: string;
  time?: boolean;
}
type loadingProps = {
  time: number;
  changeTime: number;
  loadArr?: any;
  repeat?: boolean;
  before?: string | number;
  after?: string | number;
};
export class Logger {
  private discordColor: string;
  private defaultColor: string;
  private defaultErrorColor: string;
  private defaultWarningColor: string;
  private discordTextColor: string;
  private defaultTextColor: string;
  private defaultTextErrorColor: string;
  private defaultTextWarningColor: string;
  private time: boolean;
  private colorizer: Colorizer;
  private styles: Styles;
  constructor(options?: loggerOptions) {
    this.discordColor = options?.discordColor ?? "#645cff";
    this.defaultColor = options?.defaultColor ?? "#0f0";
    this.defaultErrorColor = options?.defaultErrorColor ?? "#f00";
    this.defaultWarningColor = options?.defaultWarningColor ?? "#ff0";
    this.discordTextColor = options?.discordTextColor ?? "#625cff";
    this.defaultTextColor = options?.defaultTextColor ?? "#0f5";
    this.defaultTextErrorColor = options?.defaultTextErrorColor ?? "#f05";
    this.defaultTextWarningColor = options?.defaultTextWarningColor ?? "#ff5";
    this.time = options?.time ?? false;

    this.colorizer = new Colorizer();
    this.colorizer.addCustomHexColor("discord", false, this.discordColor);
    this.colorizer.addCustomHexColor(
      "discordtext",
      false,
      this.discordTextColor
    );
    this.colorizer.addCustomHexColor("default", false, this.defaultColor);
    this.colorizer.addCustomHexColor(
      "defaultText",
      false,
      this.defaultTextColor
    );
    this.colorizer.addCustomHexColor("error", false, this.defaultErrorColor);
    this.colorizer.addCustomHexColor(
      "errorText",
      false,
      this.defaultTextErrorColor
    );
    this.colorizer.addCustomHexColor("warn", false, this.defaultWarningColor);
    this.colorizer.addCustomHexColor(
      "warnText",
      false,
      this.defaultTextWarningColor
    );
    this.colorizer.addCustomHexColor("timeColor", false, "#FFA500");
    this.styles = this.colorizer.styles;
  }

  private header(type: "Warn" | "Error" | "Discord" | "Log"): string {
    function colorText(loggerColorizer: Colorizer, text: string): string {
      if (type == "Warn") return `${loggerColorizer.customColors.warn(text)}`;
      if (type == "Error") return `${loggerColorizer.customColors.error(text)}`;
      if (type == "Discord")
        return `${loggerColorizer.customColors.discord(text)}`;
      if (type == "Log") return `${loggerColorizer.customColors.default(text)}`;

      return "";
    }

    return `${this.colorizer.customColors.timeColor(
      `${this.time ? `[${new Date(Date.now()).toLocaleTimeString()}]> ` : ""}`
    )}${this.styles.underScore(
      colorText(this.colorizer, `[${type}]`)
    )} ${colorText(this.colorizer, ":")}`;
  }
  warn(...msg: string[]) {
    console.log(
      this.header("Warn"),
      this.colorizer.customColors.warnText(...msg)
    );
  }
  log(...msg: string[]) {
    console.log(
      this.header("Log"),
      this.colorizer.customColors.defaultText(...msg)
    );
  }
  error(...msg: string[]) {
    console.log(
      this.header("Error"),
      this.colorizer.customColors.errorText(...msg)
    );
  }
  discord(...msg: string[]) {
    console.log(
      this.header("Discord"),
      this.colorizer.customColors.discordtext(...msg)
    );
  }

  loading(props: loadingProps) {
    let arr =
      typeof props.loadArr == "string"
        ? [props.loadArr]
        : props.loadArr ?? ["\\", "|", "/", "-"];
    let i = 0;

    const interval = setInterval(() => {
      if (props.repeat && typeof props.loadArr == "string") {
        arr.push(arr[arr.length - 1] + arr[0]);
      }
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(
        `\r${props.before ?? ""}${arr[i]}${props.after ?? ""}`
      );
      if (i == arr.length - 1) i = 0;
      else i++;
    }, props.changeTime);
    setTimeout(() => {
      clearInterval(interval);
    }, props.time + props.changeTime);
  }
}
