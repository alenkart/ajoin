import * as commander from 'commander';
import { Client, Message } from 'discord.js';

export type Handler = { message: Message; client: Client };

export type Action = ({ message, client }: Handler, ...args: any[]) => void;


abstract class Command {
	command: string;
	description: string;

	constructor(command, description) {
		this.command = command;
		this.description = description;
	}

	register(program: commander.Command, message: Message, client: Client) {
		program
			.command(this.command)
			.description(this.description)
			.action((...args) => this.action({ message, client }, ...args));
	}

	action: Action = async () => {
		throw new Error('Unexpected error');
	};
}

export default Command;
