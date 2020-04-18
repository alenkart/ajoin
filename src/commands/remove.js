const { Sound } = require("../core/database");

module.exports = {
  name: "remove",
  async execute(guildId, soundId) {
    await Sound.destroy({
      where: {
        guildId,
        soundId,
      },
    });
  },
};
