import { VoiceChannel } from 'discord.js';
import Audio from './Audio';
import { Sound } from '../models';

type DBAudioConstructor = {
	guildId: string;
	channel: VoiceChannel;
	soundId: string;
};

class DBAudio extends Audio {
	soundId: string;

	constructor({ guildId, channel, soundId }: DBAudioConstructor) {
		super(guildId, channel);
		this.soundId = soundId;
	}

	public async getURL() {
		const sound = await Sound.findOne({
			where: { guildId: this.guildId, soundId: this.soundId },
			raw: true,
		});

		if (!sound?.url) {
			throw new Error(`Sound not found 🔎`);
		}

		return sound.url;
	}

	public toString(): string {
		return this.soundId;
	}
}

export default DBAudio;
