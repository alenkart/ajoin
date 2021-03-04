import { Command, ActionParams } from '../core';
import { Sound } from '../models';

class Delete extends Command {
	constructor() {
		super('delete <soundId>', 'help delete');
	}

	async action({ message, args }: ActionParams) {
		const [soundId] = args;

		const guildId = message.guild.id;

		await Sound.destroy({
			where: {
				guildId,
				soundId,
			},
		});

		message.channel.send(`It's super effective 💀`);
	}
}

export default Delete;
