const { welcomeMessage } = require("../src/build/commonjs");

/**
 *
 * @param {import("../src/build/commonjs/index.js").Client} client
 */
module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.member.id == client.user.id) return;
    console.log(message.member);
    welcomeMessage("Image", message.member, "1143600455193206966", client, {
      welcomeText: {
        username: "auto",
        message: {
          text: "Merhaba {user}.\n {guild} adlı sunucuya hoş geldin!\nSeninle birlikte {memberCount} kişi olduk",
          fontSize: "40px",
          color: "white",
          position: { x: "auto", y: "auto" },
        },
      },
      avatar: "auto",
    });
  });
};
