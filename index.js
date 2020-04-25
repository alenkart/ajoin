require("dotenv").config();

const message = require("./src/core/message");
const voiceStateUpdate = require("./src/core/voiceStateUpdate");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message);
client.on("voiceStateUpdate", (oldMember, newMember) => voiceStateUpdate(client, oldMember, newMember));

client.login();
