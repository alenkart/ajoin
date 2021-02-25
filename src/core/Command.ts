import * as commander from 'commander';
import { Client, Message } from 'discord.js';

export type Handler = {
	message: Message;
	client: Client;
	args: any[];
	options: {};
	command: commander.Command;
};

export type Action = (params: Handler) => void;

abstract class Command {
	command: string;
	description: string;

	constructor(command, description) {
		this.command = command;
		this.description = description;
	}

	register(program: commander.Command, client: Client, message: Message) {
		program
			.command(this.command)
			.description(this.description)
			.action((...args) => {

				console.log(args);

				const command = args.pop();
				const options = args.pop();

				this.action({ client, message, args, command, options });
			});
	}

	action: Action = async () => {
		throw new Error('Unexpected error');
	};
}

export default Command;
