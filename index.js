require("dotenv").config();

const message = require("./src/core/message");
const voiceStateUpdate = require("./src/core/voiceStateUpdate");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => message(msg, client));
client.on("voiceStateUpdate", (oldMember, newMember) => voiceStateUpdate(oldMember, newMember, client));

client.login();
