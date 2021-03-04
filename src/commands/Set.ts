import validator from 'validator';
import { ActionParams, Command } from '../core/index';
import { Sound } from '../models';

class Set extends Command {
	constructor() {
		super('set <soundId> <url>', 'help set');
	}

	async action({ message, args }: ActionParams) {
		const [soundId, url] = args;
		const guildId = message.guild.id;
		const author = message.member.user.tag;

		if (!validator.isURL(url)) {
			throw new Error("Stop trolling that's not a url");
		}

		await Sound.destroy({
			where: { guildId, soundId },
		});

		await Sound.create({ guildId, soundId, url, author });
	}
}

export default Set;
