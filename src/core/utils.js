const commands = require("../commands");

const prefix = "$";

module.exports.message = async function (message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.split(" ").filter((arg) => arg);
  const command = args.shift().toLowerCase().replace(prefix, "");
  const guildId = message.guild.id;

  switch (command) {
    case commands.help.name: {
      const result = commands.help.execute();
      message.channel.send(result);
      break;
    }
    case commands.play.name: {
      const channel = message.member.voice.channel;
      commands.play.execute(guildId, args[0], channel);
      break;
    }
    case commands.show.name: {
      const result = await commands.show.execute(guildId, args[0]);
      message.channel.send(result);
      break;
    }
    case commands.set.name: {
      commands.set.execute(guildId, args[0], args[1]);
      break;
    }
    case commands.remove.name: {
      commands.remove.execute(guildId, args[0]);
      break;
    }
  }
};

module.exports.voiceStateUpdate = async function (client, _, member) {
  if (!member || !member.channel || member.id === client.user.id) return;
  commands.play.execute(member.guild.id, `<@!${member.id}>`, member.channel);
};
