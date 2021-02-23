import { Command, Action } from '../core';

class PlayCommand extends Command {
	constructor() {
		super('play <id>', 'Help play');
	}

	action: Action = ({ message }, id) => {
		message.channel.send(id);
	};
}

export default PlayCommand;
