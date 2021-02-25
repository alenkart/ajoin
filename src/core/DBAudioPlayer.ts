import AudioPlayer from './AudioPlayer';
import { Sound } from '../models';

class DBAudioPlayer extends AudioPlayer {
	async speech(soundId: string) {
		const sound = await Sound.findOne({
			where: { guildId: this.guildId, soundId },
			raw: true,
		});

		console.log(sound);
	}
}

export default DBAudioPlayer;
