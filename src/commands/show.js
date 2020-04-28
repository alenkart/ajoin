const { Sound } = require("../models");
const { Command } = require("../core/command");

const command = new Command({ name: "show" });

function soundToString(sound) {
  return `🔊 ${sound.soundId} 🔗 ${sound.soundUrl}`;
}

command.execute = async function (message, args) {
  const guildId = message.guild.id;
  const [soundId] = args;

  let where = { guildId };

  if (soundId) {
    where.soundId = soundId;
  }

  const sounds = await Sound.findAll({
    where,
    raw: true,
  });

  let messageStr = 'I found nothing';;

  if (sounds.length == 1) {
    messageStr = soundToString(sounds[0]);
  } else if (sounds.length > 1) {
    messageStr = sounds.map(soundToString).join('\n');
  }

  message.channel.send(messageStr);
}

module.exports = command;
