const PlaySound = require("../core/playsound")
const { Command } = require("../core/command");

const command = new Command({ name: "play" });

command.execute = async function (message, args) {
  const guildId = message.guild.id;
  const [soundId] = args;

  const playSound = new PlaySound();
  playSound.play(message.member.voice.channel, guildId, soundId);
}

module.exports = command;