import { VoiceChannel } from 'discord.js';

abstract class AudioPlayer {
	map = {};
	maxPlayingTime: number = 5 * 1000;
	maxAfkTime: number = 30 * 1000;

	guildId: string;
	channel: VoiceChannel;

	constructor(guildId: string, channel: VoiceChannel) {
		this.guildId = guildId;
		this.channel = channel;
	}

	async play(url: string, volume: number = 0.8) {
		const connection = await this.channel.join();
		const dispatcher = connection.play(url, { volume });

		//sound limit time
		setTimeout(() => {
			dispatcher.destroy();
		}, this.maxPlayingTime);

		this.afk();
	}

	afk() {
		//clear the timeout
		clearTimeout(this.map[this.guildId]);

		//create the timeout
		this.map[this.guildId] = setTimeout(() => {
			delete this.map[this.guildId];
			this.channel.leave();
		}, this.maxAfkTime);
	}
}

export default AudioPlayer;
