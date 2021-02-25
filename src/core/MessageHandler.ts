import * as commander from 'commander';
import { Client, Message } from 'discord.js';
import Command from './Command';

class MessageHandler {
	program: commander.Command = new commander.Command();
	client: Client;
	message: Message;
	commands: Command[] = [];

	constructor(client: Client, message: Message, commands: Command[]) {
		this.client = client;
		this.message = message;
		this.commands = commands;
	}

	parse() {
		const args = this.message.content || '';
		this.program.parse(args.split(' '), { from: 'user' });
	}

	handleUnknownCommands() {
		this.program.on('command:*', () => {
			this.message.channel.send('Unknow command');
		});
	}

	registerCommands() {
		this.commands.forEach((command) => {
			command.register(this.program, this.client, this.message);
		});
	}

	shouldSkipMessage() {
		return this.message.author.bot;
	}

	handle() {
		if (this.shouldSkipMessage()) {
			return;
		}

		this.handleUnknownCommands();

		try {
			this.registerCommands();
			this.parse();
		} catch (_error) {
			this.message.channel.send('Error');
		}
	}
}

export default MessageHandler;
