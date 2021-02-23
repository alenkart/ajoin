import * as commander from 'commander';
import { Client, Message } from 'discord.js';
import Command from './Command';

class MessageHandler {
	program: commander.Command = new commander.Command();
	message: Message;
	commands: Command[] = [];

	constructor(message: Message, commands: Command[]) {
		this.message = message;
		this.commands = commands;
	}

	parse() {
		const args = (this.message.content || '').split(' ');
		this.program.parse(['', '', ...args]);
	}

	handle(client: Client) {
		if (this.message.author.bot) {
			return;
		}

		this.commands.forEach((command) => {
			command.register(this.program, this.message, client);
		});

		this.parse();
	}
}

export default MessageHandler;
