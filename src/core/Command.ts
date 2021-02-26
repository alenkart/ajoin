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
			.action(async (...args) => {
				try {
					const command = args.pop();
					const options = args.pop();
					await this.action({ client, message, args, command, options });
				} catch(error) {
					console.log(error);
					message.channel.send('Error');
				}
			});
	}

	protected abstract action(params: Handler): Promise<any>;
}

export default Command;
