const { Sound } = require("../models");

//FIX: Implemente a better error handler

class Playsound {

    constructor() {
        if (!Playsound.instance) {
            this.map = {};
            this.maxPlayingTime = 5 * 1000;
            this.maxAfkTime = 30 * 1000;

            Playsound.instance = this;
        }

        return Playsound.instance;
    }

    async play(channel, guildId, soundId) {

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
        }, this.maxPlayingTime);


        this.afk(channel, guildId);
    };

    afk(channel, guildId) {
        //clear the timeout
        clearTimeout(this.map[guildId]);

        //create the timeout
        const timeout = setTimeout(() => {
            delete this.map[guildId];
            channel.leave();
        }, this.maxAfkTime);

        //set the timeout
        this.map = {
            ...this.map,
            [guildId]: timeout,
        };
    }
}

module.exports = Playsound;