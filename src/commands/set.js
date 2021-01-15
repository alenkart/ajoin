const validator = require('validator');
const { Sound } = require("../models");
const { Command } = require("../core/command");
const { CommandError } = require('../core/errors');

const command = new Command({ name: "set" });

command.execute = async function (message, args) {
  const guildId = message.guild.id;
  const [soundId, soundUrl] = args;

  if (!soundId || !soundUrl) {
    throw new Error("!soundId || !soundUrl");
  };

  if (!validator.isURL(soundUrl)) {
    throw new CommandError("Stop trolling that's not a url");
  }

  await Sound.destroy({
    where: { guildId, soundId },
  });

  await Sound.create({ guildId, soundId, soundUrl });
}

module.exports = command;

