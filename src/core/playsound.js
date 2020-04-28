const { Sound } = require("../models");

//FIX: Implemente a better error handler

module.exports = async function (channel, guildId, soundId) {

    if (!channel || !guildId || !soundId) {
        throw new Error("!channel || !guildId || !soundUrl");
    };

    const sound = await Sound.findOne({
        where: { guildId, soundId },
        raw: true,
    });

    if (!sound) {
        throw new Error(`Sound ${soundId} not found 🔎`);
    };

    const connection = await channel.join();
    const dispatcher = connection.play(sound.soundUrl, {
        volume: 0.5,
    });

    //sound limit time
    setTimeout(() => {
        dispatcher.destroy();
    }, 5 * 1000);
}