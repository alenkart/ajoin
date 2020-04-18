require("dotenv").config();

const Discord = require("discord.js");
const utils = require("./src/core/utils");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message) => utils.message(message));
bot.on("voiceStateUpdate", (oldMember, newMember) => utils.voiceStateUpdate(bot, oldMember, newMember));

bot.login(process.env.DISCORD_TOKEN);
