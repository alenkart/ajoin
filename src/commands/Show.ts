import { Command, ActionParams } from '../core';
import { Sound } from '../models';

const formatSound = (sound) => {
	const content = [
		`🔊 ${sound.soundId}`,
		`🧝 ${sound.author}`,
		`🔗 ${sound.url}`,
	];
	return content.join('\n');
};

class Show extends Command {
	private messageSize = 1800;
	private group = 10;

	constructor() {
		super('show [soundId]', 'help show');
	}

	async sendByGroup(message, sounds) {
		const sizePerGroup = this.messageSize / this.group;

		const groups = sounds.map((sound) => {
			return formatSound(sound).slice(0, sizePerGroup);
		});

		for (let i = 0; i <= groups.length; i += this.group) {
			const payload = groups.slice(i, i + this.group).join('\n\n');
			await message.channel.send(payload);
		}
	}

	async action({ message, args }: ActionParams) {
		const [soundId] = args;

		const sounds = await Sound.fetchBy(message.guild.id, soundId);

		if (sounds.length < 1) {
			throw new Error('I found nothing');
		}

		await this.sendByGroup(message, sounds);
	}
}

export default Show;
