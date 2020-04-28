const package = require('../../package.json');
const { Command } = require("../core/command");

const command = new Command({ name: "help" });

command.execute = async function (message) {

  const content = 'Here is the help!';

  const embed = {
    color: 0x0099ff,
    title: "Help",
    description: "The `sound_name` can be a word or user mention `@AJoin`",
    fields: [
      {
        value: "```$play sound_name```",
        name: "Play a sound",
      },
      {
        value: "```$set sound_name https://example.com/sound.mp3```",
        name: "Set a sound",
      },
      {
        value: "```$remove sound_name```",
        name: "Remove a sound",
      },
      {
        value: "```$show```",
        name: "Show all the users details",
      },
      {
        value: "```$show sound_name```",
        name: "Shows an user detail",
      },
      {
        value: "```$invite```",
        name: "Shows a link to invite the bot to a server",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: `Version: ${package.version}`,
    }
  };

  message.channel.send({ content, embed });
}

module.exports = command;
