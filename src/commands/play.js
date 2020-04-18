const playSound = require("../core/playsound")
const { Command } = require("../core/command");
const { messageParser } = require("../core/utils");

const command = new Command("play");

command.execute = async function (message) {
  const { args, guildId } = messageParser(message);
  const [soundId] = args;
  await playSound(message.member.voice.channel, guildId, soundId);
}

module.exports = command;