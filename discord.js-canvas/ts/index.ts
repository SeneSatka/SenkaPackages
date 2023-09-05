import { Canvas, createCanvas, loadImage } from "canvas";
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
export type Text =
  | {
      text: string;
      position: Position;
      fontSize: FontSize;
      color: string;
      textAlign: "Left" | "Right" | "Center";
    }
  | "auto";
export type Avatar =
  | {
      size: number | "auto";
      position: Position;
      round: boolean | "auto";
      border: { size: number | "auto"; color: string } | false;
    }
  | "auto";
export type Card =
  | {
      size: { width: number | "auto"; height: number | "auto" };
      backgroundUrl: string;
    }
  | "auto";
export type TransparentLayer =
  | {
      size: {
        width: number | "auto";
        height: number | "auto";
      };
      alpha: number | "auto";
      position: Position;
      round: Array<number> | "auto";
      color: string | "auto";
    }
  | "auto";

export class welcomeMessageImage {
  private member: any;
  public username: Username | false;
  public avatar: Avatar | false;
  public card: Card | false;
  public transparentLayer: TransparentLayer | false;
  public texts: Text[];
  constructor(member: any, auto?: boolean) {
    this.member = member;
    this.username = false;
    this.avatar = false;
    this.texts = [];
    this.card = false;
    this.transparentLayer = false;
    if (auto) {
      this.setUsername("auto");
      this.setAvatar("auto");
      this.setCard("auto");
      this.setTransparentLayer("auto");
      this.addText("auto");
    }
  }
  setUsername(options: Username): this {
    if (options == "auto") {
      this.username = {
        color: "white",
        fontSize: "50px",
        position: { x: "auto", y: "auto" },
      };
    } else {
      this.username = {
        color: options.color ?? "white",
        fontSize: options.fontSize ?? "50px",
        position: options.position ?? { x: "auto", y: "auto" },
      };
    }
    return this;
  }
  setAvatar(options: Avatar): this {
    if (options == "auto") {
      this.avatar = {
        round: true,
        size: 330,
        position: { x: "auto", y: "auto" },
        border: { color: "auto", size: 2 },
      };
    } else {
      this.avatar = {
        round: options.round ?? true,
        size: options.size ?? 330,
        position: options.position ?? { x: "auto", y: "auto" },
        border: options.border
          ? {
              color: options.border.color ?? "auto",
              size: options.border.size ?? "auto",
            }
          : false,
      };
    }
    return this;
  }
  setCard(options: Card) {
    if (options == "auto") {
      this.card = {
        backgroundUrl:
          "https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-w0NaWJcFIxNmuYDexUlFAG554lwFv0jjWvTBW7s2WBWNqIEYItRPY9fqTxmJbIrnbW3LLjOB5IGqAiH9nRugP58VR2Gg=w1280-h679",
        size: { width: 1400, height: 500 },
      };
    } else {
      this.card = {
        backgroundUrl:
          options.backgroundUrl ??
          "https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-w0NaWJcFIxNmuYDexUlFAG554lwFv0jjWvTBW7s2WBWNqIEYItRPY9fqTxmJbIrnbW3LLjOB5IGqAiH9nRugP58VR2Gg=w1280-h679",
        size: options.size ?? { height: 500, width: 1400 },
      };
    }
    return this;
  }
  setTransparentLayer(options: TransparentLayer) {
    if (options == "auto") {
      this.transparentLayer = {
        size: { width: "auto", height: "auto" },
        alpha: "auto",
        position: { x: "auto", y: "auto" },
        round: "auto",
        color: "auto",
      };
    } else {
      this.transparentLayer = {
        size: options.size ?? { width: "auto", height: "auto" },
        alpha: options.alpha ?? "auto",
        position: options.position ?? { x: "auto", y: "auto" },
        round: options.round ?? "auto",
        color: options.color ?? "auto",
      };
    }
    return this;
  }
  addText(options: Text): this {
    if (options == "auto") {
      this.texts.push({
        color: "white",
        fontSize: "40px",
        position: { x: "auto", y: "auto" },
        text: "{user} welcome!\nWe become {memberCount} with you",
        textAlign: "Center",
      });
    } else {
      if (typeof options.text == "undefined") throw Error("Text required");
      if (typeof options.position == "undefined")
        throw Error("Position  required");
      if (typeof options.position.x == "undefined")
        throw Error("Position x required");
      if (typeof options.position.y == "undefined")
        throw Error("Position y required");

      this.texts.push({
        color: options.color ?? "white",
        fontSize: options.fontSize ?? "40px",
        position: options.position,
        text: options.text,
        textAlign: options.textAlign ?? "Center",
      });
    }
    return this;
  }
  async create(): Promise<any> {
    let attachmentCanvas = createCanvas(100, 100);
    if (!this.card) this.setCard("auto");
    if (typeof this.card == "object") {
      const width =
          this.card.size.width == "auto" ? 1400 : this.card.size.width,
        height = this.card.size.height == "auto" ? 500 : this.card.size.height;
      const background = await loadImage(this.card.backgroundUrl);
      const canvas = createCanvas(width, height),
        ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, [50]);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      if (typeof this.transparentLayer == "object") {
        const x =
          this.transparentLayer.position.x == "auto"
            ? 40
            : this.transparentLayer.position.x;
        const y =
          this.transparentLayer.position.y == "auto"
            ? 40
            : this.transparentLayer.position.y;
        const layerWidth =
          this.transparentLayer.size.width == "auto"
            ? width - x * 2
            : this.transparentLayer.size.width;
        const layerHeight =
          this.transparentLayer.size.height == "auto"
            ? height - y * 2
            : this.transparentLayer.size.height;
        const alpha =
          this.transparentLayer.alpha == "auto"
            ? 0.05
            : this.transparentLayer.alpha;
        const round =
          this.transparentLayer.round == "auto"
            ? [60]
            : this.transparentLayer.round;
        const color =
          this.transparentLayer.color == "auto"
            ? "#FFF"
            : this.transparentLayer.color;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, layerWidth, layerHeight, round);
        ctx.closePath();
        ctx.clip();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, layerWidth, layerHeight);
        ctx.restore();
      }

      if (typeof this.avatar == "object") {
        const size = this.avatar.size == "auto" ? 330 : this.avatar.size;
        const x =
          this.avatar.position.x == "auto"
            ? 85 + size / 2
            : this.avatar.position.x + size / 2;
        const y =
          this.avatar.position.y == "auto"
            ? 85 + size / 2
            : this.avatar.position.y + size / 2;
        const border =
          this.avatar.border != false
            ? {
                size:
                  this.avatar.border.size == "auto"
                    ? 10
                    : this.avatar.border.size,
                color:
                  this.avatar.border.color == "auto"
                    ? "#fff"
                    : this.avatar.border.color,
              }
            : false;

        const avatar = await loadImage(
          this.member.displayAvatarURL({
            extension: "jpg",
            size: 4096,
            forceStatic: false,
          })
        );

        ctx.save();
        if (border) {
          ctx.strokeStyle = border.color;
          ctx.lineWidth = border.size;
        }
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2, true);
        border && ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          avatar,
          this.avatar.position.x == "auto" ? 85 : this.avatar.position.x,
          this.avatar.position.y == "auto" ? 85 : this.avatar.position.y,
          size,
          size
        );
        ctx.restore();
      }
      if (typeof this.username == "object") {
        ctx.save();
        ctx.font = `${this.username.fontSize} Sans-Serif`;
        ctx.fillStyle = this.username.color;
        let x,
          y,
          name =
            this.member.user.globalName != null
              ? this.member.user.globalName
              : this.member.user.displayName ?? this.member.user.username;
        if (typeof this.avatar == "object") {
          const avatarX =
            this.avatar.position.x == "auto" ? 85 : this.avatar.position.x;
          const avatarY =
            this.avatar.position.y == "auto" ? 85 : this.avatar.position.y;
          const avatarSize =
            this.avatar.size == "auto" ? 330 : this.avatar.size;
          x =
            this.username.position.x == "auto"
              ? avatarSize +
                avatarX * 2 +
                (width - (avatarSize + avatarY * 2)) / 2 -
                ctx.measureText(name).width / 2
              : this.username.position.x;
        } else {
          x =
            this.card.size.width == "auto"
              ? 1400
              : this.card.size.width / 2 - ctx.measureText(name).width / 2;
        }
        y = this.username.position.y == "auto" ? 100 : this.username.position.y;
        ctx.fillText(name, x, y);
        ctx.restore();
      }

      if (this.texts.length > 0) {
        let avatarX: number,
          avatarY: number,
          avatarSize: number,
          name =
            this.member.user.globalName != null
              ? this.member.user.globalName
              : this.member.user.displayName ?? this.member.user.username;
        if (typeof this.avatar == "object") {
          avatarX =
            this.avatar.position.x == "auto" ? 85 : this.avatar.position.x;
          avatarY =
            this.avatar.position.y == "auto" ? 85 : this.avatar.position.y;
          avatarSize = this.avatar.size == "auto" ? 330 : this.avatar.size;
        } else {
          avatarSize = 0;
          avatarX = 0;
          avatarY = 0;
        }
        function filltextRow(
          text: string,
          increaseValue: number,
          Text: Text
        ): any {
          if (typeof Text != "object") return;
          let x: number;
          if (Text.textAlign == "Center")
            x =
              Text.position.x == "auto"
                ? avatarSize +
                  avatarX * 2 +
                  (width - (avatarSize + avatarY * 2)) / 2 -
                  ctx.measureText(text).width / 2
                : Text.position.x;
          else if (Text.textAlign == "Left") x = avatarSize + avatarX * 2;
          else if (Text.textAlign == "Right")
            x = width - avatarSize + avatarX * 2 - ctx.measureText(text).width;
          else
            x =
              Text.position.x == "auto"
                ? avatarSize +
                  avatarX * 2 +
                  (width - (avatarSize + avatarY * 2)) / 2 -
                  ctx.measureText(text).width / 2
                : Text.position.x;
          ctx.fillText(
            text,
            x,
            Text.position.y == "auto"
              ? 175 + increaseValue
              : Text.position.y + increaseValue
          );
        }
        for (const _text of this.texts) {
          if (typeof _text != "object") continue;
          const text = _text.text
            .replaceAll("{user}", name)
            .replaceAll("{username}", name)
            .replaceAll("{guild}", this.member.guild.name)
            .replaceAll("{memberCount}", `${this.member.guild.memberCount}`);
          ctx.font = `${_text.fontSize} Sans-Serif`;
          ctx.fillStyle = _text.color ?? "white";
          let txtHeight = 0;
          for (const t of text.split("\n")) {
            txtHeight += Number(_text.fontSize.split("px")[0]) * 1.25;
            filltextRow(t, txtHeight, _text);
          }
        }
      }
      /**
       * @returns {Buffer}
       */
      return canvas.toBuffer();
    }
    /**
     * @returns {Buffer}
     */
    return attachmentCanvas.toBuffer();
  }
}
