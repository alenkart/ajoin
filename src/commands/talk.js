const PlaySound = require("../core/playsound")
const { Command } = require("../core/command");

const talken = new Command({ name: "talken" });
const talkes = new Command({ name: "talkes" });

talken.execute = function (message, args) {
  return say('en', message, args);
}

talkes.execute = function (message, args) {
  return say('es', message, args);
}

async function say(lang, message, args) {
  const guildId = message.guild.id;
  const content = args.join(' ');

  if (!content) {
    throw new Error("!content");
  };

  const playSound = new PlaySound();

  playSound.speech({
    lang,
    channel: message.member.voice.channel,
    guildId,
    content,
  });
}

module.exports = {
  talken,
  talkes,
};