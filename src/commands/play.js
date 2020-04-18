const { Sound } = require("../core/database");
module.exports = {
  name: "play",
  async execute(guildId, soundId, channel) {
    const sound = await Sound.findOne({
      where: { guildId, soundId },
      raw: true,
    });

    if (!sound) return;

    const connection = await channel.join();
    const dispatcher = connection.play(sound.soundUrl, {
      volume: 0.5,
    });
    dispatcher.on("finish", () => dispatcher.destroy());
  },
};
