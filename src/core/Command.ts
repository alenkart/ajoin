import * as commander from 'commander';
import { Client, Message } from 'discord.js';

export type ActionParams = {
	message: Message;
	client: Client;
	args: any[];
	options: {};
	command: commander.Command;
};

export type Action = (params: ActionParams) => void;

abstract class Command {
	name: string;
	description: string;

	constructor(name, description) {
		this.name = name;
		this.description = description;
	}

	abstract action(params: ActionParams): Promise<any>;
}

export default Command;
