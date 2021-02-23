import { Command, Action } from '../core';

import config from './InviteCommand.json';

class InviteCommand extends Command {
	constructor() {
		super(config.commnad, config.description);
	}

	action: Action = ({ message }, id) => {
		message.channel.send(id);
	};
}

export default InviteCommand;
