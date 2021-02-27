import { Command, Handler } from '../core';
import { Sound } from '../models';

class Set extends Command {
	constructor() {
		super('set <soundId> <url>', 'help set');
	}

	async action({ message, args }: Handler) {
		const [soundId, url] = args;
		const guildId = message.guild.id;

		await Sound.upsert({ guildId, soundId, url }, { returning: false });
	}
}

export default Set;
