import { Command, ActionParams } from '../core';

const getLink = (clientId) => {
	return `https://discordapp.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`;
};

class InviteCommand extends Command {
	constructor() {
		super('invite', 'help invite');
	}

	async action({ message, client }: ActionParams) {
		const { user } = client;

		const url = getLink(user.id);

		const embed = {
			url,
			color: 0x0099ff,
			title: 'Invite AJoin 🎉',
			description: 'Click on the above link and level up!',
		};

		message.channel.send({ embed });
	}
}

export default InviteCommand;
