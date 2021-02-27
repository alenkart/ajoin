import validator from 'validator';
import { VoiceChannel } from 'discord.js';

abstract class AudioPlayer {
	protected map: { [id: string]: NodeJS.Timeout } = {};
	protected maxPlayingTime: number = 5 * 1000;
	protected maxAfkTime: number = 30 * 1000;

	protected guildId: string;
	protected channel: VoiceChannel;

	constructor(guildId: string, channel: VoiceChannel) {
		this.guildId = guildId;
		this.channel = channel;
	}

	public abstract play(): Promise<any>;

	protected async playUrl(url: string, volume: number = 0.8) {

		if (!validator.isURL(url)) {
			throw new Error("Invalid url");
		}

		const connection = await this.channel.join();
		const dispatcher = connection.play(url, { volume });

		//sound limit time
		setTimeout(() => {
			dispatcher.destroy();
		}, this.maxPlayingTime);

		this.afk();
	}

	protected afk() {
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
