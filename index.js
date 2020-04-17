require("dotenv").config();

const Discord = require("discord.js");
const { commands, onJoinVoiceChat } = require("./src/utils");
const bot = new Discord.Client();

const prefix = "$";

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (msg) => {
  if (msg.author.bot && msg.content.startsWith(prefix)) return;

  const args = msg.content.split(" ");
  const command = args.shift().toLowerCase();

  if (command == `${prefix}help`) {
    const help = commands.help();
    msg.channel.send(help);
  } else if (command == `${prefix}show`) {
    const [mention] = args;
    const list = await commands.show(msg.guild.id, mention);
    msg.channel.send(list);
  } else if (command == `${prefix}set`) {
    const [mention, audioUrl] = args;
    commands.set(msg.guild.id, mention, audioUrl);
  }
});

bot.on("voiceStateUpdate", async (_, member) => {
  if (!member || !member.channel || member.id === bot.user.id) return;
  onJoinVoiceChat(member);
});

bot.login(process.env.DISCORD_TOKEN);
