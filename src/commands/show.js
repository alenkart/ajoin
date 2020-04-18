const { Sound } = require("../core/database");

module.exports = {
  name: "show",
  async execute(guildId, soundId) {
    let where = { guildId };

    if (soundId) {
      where.soundId = soundId;
    }

    const sounds = await Sound.findAll({
      where,
      raw: true,
    });

    const message = sounds
      .map((sound) => `😀 ${sound.soundId} 🔊 ${sound.soundUrl}`)
      .join("\n");

    return `List of sounds:\n${message}`;
  },
};
