require("dotenv").config();

const Discord = require("discord.js");
const message = require("./src/core/message");
const voiceStateUpdate = require("./src/core/voiceStateUpdate");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message);
bot.on("voiceStateUpdate", (oldMember, newMember) => voiceStateUpdate(bot, oldMember, newMember));

bot.login();