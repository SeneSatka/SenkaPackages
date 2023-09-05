const {
  welcomeMessage,
  welcomeMessageImage,
} = require("../src/build/commonjs");

/**
 *
 * @param {import("../src/build/commonjs/index.js").Client} client
 */
module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.member.id == client.user.id) return;

    const image = await new welcomeMessageImage(message.member)
      .setUsername("auto")
      .setAvatar("auto")
      .addText("auto")
      .addText({
        text: "@Senka",
        position: { x: 700, y: 370 },
      })
      .setTransparentLayer("auto")
      .setCard("auto")
      .create();
    const channel = message.channel;
    console.log("resim hazır");
    channel.send({ files: [image] });
    // welcomeMessage("Image", message.member, "1143600455193206966", client, {
    //   welcomeText: {
    //     username: "auto",
    //     message: {
    //       text: "Merhaba {user}.\n{guild} adlı sunucuya hoş geldin!\nSeninle birlikte {memberCount} kişi olduk",
    //       fontSize: "40px",
    //       color: "white",
    //       textAlign: "Right",
    //       position: { x: "auto", y: "auto" },
    //     },
    //   },
    //   avatar: "auto",
    // });
  });
};
