import validator from 'validator';
import { Command, Handler } from '../core';
import { Sound } from '../models';

class Set extends Command {
	constructor() {
		super('set <soundId> <url>', 'help set');
	}

	async action({ message, args }: Handler) {
		const [soundId, url] = args;
		const guildId = message.guild.id;

		if (!validator.isURL(url)) {
			throw new Error("Stop trolling that's not a url");
		}

		await Sound.destroy({
			where: { guildId, soundId },
		});

		await Sound.create({ guildId, soundId, url });
	}
}

export default Set;
