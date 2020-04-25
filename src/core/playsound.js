const { Sound } = require("../models");

module.exports = async function (channel, guildId, soundId) {

    const sound = await Sound.findOne({
        where: { guildId, soundId },
        raw: true,
    });

    if (!sound) return;

    const connection = await channel.join();
    const dispatcher = connection.play(sound.soundUrl, {
        volume: 0.5,
    });
}