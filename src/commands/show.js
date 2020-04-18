const { Sound } = require("../core/database");
const { Command } = require("../core/command");
const { messageParser } = require("../core/utils");

const command = new Command("show");

command.execute = async function (message) {
  const { guildId, args } = messageParser(message);

  const soundId = args[0];
  let where = { guildId };

  if (soundId) {
    where.soundId = soundId;
  }

  const sounds = await Sound.findAll({
    where,
    raw: true,
  });

  const result = sounds
    .map((sound) => `😀 ${sound.soundId} 🔊 ${sound.soundUrl}`)
    .join("\n");

  message.channel.send(`List of sounds:\n${result}`);
}

module.exports = command;
