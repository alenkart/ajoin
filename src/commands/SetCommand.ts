import { Command } from '../core';
import { Sound } from '../models';

class PlayCommand extends Command {
	constructor() {
		super('set <soundId> <url>', 'help play');
	}

	action = async ({ message, args }) => {
		const [soundId, url] = args;
		const guildId = message.guild.id;

		await Sound.destroy({
			where: { guildId, soundId },
		});

		await Sound.create({ guildId, soundId, url });
	};
}

export default PlayCommand;
