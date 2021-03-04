import * as commander from 'commander';
import discord from 'discord.js';
import Command from '../core/Command';

class MessageEvent {
	program: commander.Command;
	client: discord.Client;
	message: discord.Message;
	commands: Command[] = [];

	constructor(
		client: discord.Client,
		message: discord.Message,
		commands: Command[]
	) {
		this.program = new commander.Command();
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

	addCommands() {
		for (let command of this.commands) {
			this.program
				.command(command.name)
				.description(command.description)
				.action(async (...args) => {
					const program = args.pop();
					const options = args.pop();

					await command.action({
						client: this.client,
						message: this.message,
						args,
						options,
						command: program,
					});
				});
		}
	}

	async parseMessage() {
		const args = this.message.content.split(' ');
		await this.program.parseAsync(args, { from: 'user' });
	}

	async handle() {
		if (this.message.author.bot) {
			return;
		}

		this.config();
		this.addCommands();
		await this.parseMessage();
	}
}

export default MessageEvent;
