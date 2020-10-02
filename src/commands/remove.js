const { Sound } = require("../models");
const { Command } = require("../core/command");

const command = new Command({ name: "remove" });

command.execute = async function (message, args) {
  const guildId = message.guild.id;
  const [soundId] = args;

  if (!soundId) {
    throw new Error("!soundId");
  };

  await Sound.destroy({
    where: {
      guildId,
      soundId,
    },
  });

  message.channel.send(`Sound **${soundId}** has been eliminated`);
}

module.exports = command;