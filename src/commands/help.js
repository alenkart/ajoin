const embed = {
  color: 0x0099ff,
  title: "Help",
  description: "Here is the help!",
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
      value: "```$list```",
      name: "Show all the users details",
    },
    {
      value: "```$list sound_name```",
      name: "Shows an user detail",
    },
  ],
};

module.exports = {
  name: "help",
  execute() {
    return { embed }
  },
};
