const { Sound } = require("../core/database");
const { Command } = require("../core/command");
const { messageParser } = require("../core/utils");

const command = new Command("set");

command.execute = async function (message) {

  const { guildId, args } = messageParser(message);
  const [soundId, soundUrl] = args;

  await Sound.destroy({
    where: {
      guildId,
      soundId,
    },
  });

  await Sound.create({ guildId, soundId, soundUrl });
}

module.exports = command;