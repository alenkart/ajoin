const googleTTS = require('google-tts-api');
const { Sound } = require("../models");
const { CommandError } = require('./errors');

//FIX: Implemente a better error handler
class Playsound {

    constructor() {
        if (!Playsound.instance) {
            this.map = {};
            this.maxPlayingTime = 5 * 1000;
            this.maxAfkTime = 30 * 1000;
            this.volume = 0.8;

            Playsound.instance = this;
        }

        return Playsound.instance;
    }

    async playSound({ soundId, channel, guildId }) {

        if (!channel || !guildId || !soundId) {
            throw new Error("!channel || !guildId || !soundId");
        };

        const sound = await Sound.findOne({
            where: { guildId, soundId },
            raw: true,
        });

        if (!sound) {
            throw new CommandError(`Sound not found 🔎`);
        };

        const url = sound.soundUrl;

        await this.playUrl({
            url,
            channel,
            guildId,
        });
    }

    async speech({ lang, content, channel, guildId }) {

        if (!channel || !guildId || !content) {
            throw new Error("!channel || !guildId || !content");
        };

        const url = await googleTTS(content, lang, 1);

        await this.playUrl({
            url,
            channel,
            guildId,
        });
    }

    async playUrl({ url, channel, guildId }) {

        if (!channel || !guildId || !url) {
            throw new Error("!channel || !guildId || !url");
        };

        const connection = await channel.join();
        const dispatcher = connection.play(url, {
            volume: this.volume,
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