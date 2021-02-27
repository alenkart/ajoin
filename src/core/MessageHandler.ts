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

	config() {
		this.program.exitOverride().configureOutput({
			writeOut: (str) => console.log('writeOut ==> ', str),
			writeErr: (str) => console.log('writeErr ==>', str),
			outputError: (str) => console.log('outputError ==>', str),
		});
	}

	registerCommands() {
		this.commands.forEach((command) => {
			command.register(this.program, this.client, this.message);
		});
	}

	async parseMessage() {
		const args = this.message.content.split(' ');
		await this.program.parseAsync(args, { from: 'user' });
	}

	async handle() {
		if (this.message.author.bot) {
			return;
		}

		try {
			this.config();
			this.registerCommands();
			await this.parseMessage();
		} catch (error) {
			console.log(error.message);
			this.message.channel.send('Error');
		}
	}
}

export default MessageHandler;
