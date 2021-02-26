import { VoiceChannel } from 'discord.js';
import AudioPlayer from './AudioPlayer';
import { Sound } from '../models';

class DBAudioPlayer extends AudioPlayer {
	soundId: string;

	constructor(guildId: string, channel: VoiceChannel, soundId: string) {
		super(guildId, channel);
		this.soundId = soundId;
	}

	public async play() {
		const sound = await Sound.findOne({
			where: { guildId: this.guildId, soundId: this.soundId },
			raw: true,
		});

		if (!sound) {
			throw new Error(`Sound not found 🔎`);
		}

		return this.playUrl(sound.url);
	}
}

export default DBAudioPlayer;
