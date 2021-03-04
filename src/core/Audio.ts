import { VoiceChannel } from 'discord.js';

abstract class Audio {
	protected map: { [id: string]: NodeJS.Timeout } = {};
	protected maxPlayingTime: number = 5 * 1000;
	protected maxAfkTime: number = 30 * 1000;

	guildId: string;
	channel: VoiceChannel;

	constructor(guildId: string, channel: VoiceChannel) {
		this.guildId = guildId;
		this.channel = channel;
	}

	public abstract getURL(): Promise<string>;

	public abstract toString(): string;
}

export default Audio;
