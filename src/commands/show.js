const { Sound } = require("../models");
const { Command } = require("../core/command");

const command = new Command({ name: "show" });

function soundToString(sound) {
  return `🔊 ${sound.soundId} 🔗 ${sound.soundUrl}`;
}

async function sendByGroup(message, sounds) {
  const messageSize = 1800;
  const groupSize = 10;
  const size = messageSize / groupSize;

  let groups = sounds.map(sound => {
    return soundToString(sound).slice(0, size);
  });

  for(let i = 0; i <= groups.length; i+=groupSize) {
    let j = groupSize + i;
    j = i > groupSize.length ? groupSize.length : j;

    const payload = groups.slice(i, j).join('\n');
    await message.channel.send(payload);
  }
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

  if (sounds.length < 1) {
    message.channel.send('I found nothing');
    return;
  }

  await sendByGroup(message, sounds);
}

module.exports = command;