import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { MessageHandler } from './core';
import {
	InviteCommand,
	TalkCommand,
	PlayCommand,
	SetCommand,
} from './commands';

dotenv.config();

const client = new Client();

client.on('ready', () => {
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('message', (message) => {
	const handler = new MessageHandler(client, message, [
		new InviteCommand(),
		new TalkCommand(),
		new PlayCommand(),
		new SetCommand(),
	]);

	handler.handle();
});

client.login();
