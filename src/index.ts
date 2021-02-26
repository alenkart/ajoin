import dotenv from 'dotenv';

import { Client } from 'discord.js';

import { MessageHandler } from './core';

import {
	SetCommand,
	ShowCommand,
	TalkCommand,
	PlayCommand,
	InviteCommand,
	DeleteCommand,
} from './commands';

dotenv.config();

const client = new Client();

client.on('ready', () => {
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('message', (message) => {
	const commnads = [
		new SetCommand(),
		new ShowCommand(),
		new TalkCommand(),
		new PlayCommand(),
		new InviteCommand(),
		new DeleteCommand(),
	];

	const handler = new MessageHandler(client, message, commnads);

	handler.handle();
});

client.login();
