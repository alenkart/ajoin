const { Sound } = require("../core/database");

module.exports = {
  name: "set",
  async execute(guildId, soundId, soundUrl) {
    await Sound.destroy({
      where: {
        guildId,
        soundId,
      },
    });

    Sound.create({ guildId, soundId, soundUrl });
  },
};
