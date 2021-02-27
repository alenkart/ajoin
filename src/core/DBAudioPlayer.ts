import { VoiceChannel } from 'discord.js';
import validator from 'validator';
import AudioPlayer from './AudioPlayer';
import { Sound } from '../models';

type DBAudioPlayerConstructor = {
	guildId: string;
	channel: VoiceChannel;
	soundId: string;
};

class DBAudioPlayer extends AudioPlayer {
	soundId: string;

	constructor({ guildId, channel, soundId }: DBAudioPlayerConstructor) {
		super(guildId, channel);
		this.soundId = soundId;
	}

	public async play() {
		const sound = await Sound.findOne({
			where: { guildId: this.guildId, soundId: this.soundId },
			raw: true,
		});

		if (!sound?.url) {
			throw new Error(`Sound not found 🔎`);
		}

		return this.playUrl(sound.url);
	}
}

export default DBAudioPlayer;
