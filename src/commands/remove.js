const { Sound } = require("../models");
const { Command } = require("../core/command");
const { messageParser } = require("../core/utils");

const command = new Command("remove");

command.execute = async function (message) {

  const { guildId, args } = messageParser(message);
  const [soundId] = args;

  await Sound.destroy({
    where: {
      guildId,
      soundId,
    },
  });
}

module.exports = command;