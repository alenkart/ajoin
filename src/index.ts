import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { MessageHandler } from './core';
import { InviteCommand, PlayCommand } from './commands';

dotenv.config();

const client = new Client();

client.on('ready', () => {
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('message', (message) => {
	const handler = new MessageHandler(message, [
		new InviteCommand(),
		new PlayCommand(),
	]);

	handler.handle(client);
});
// client.on("voiceStateUpdate", (oldMember, newMember) => voiceStateUpdate(oldMember, newMember, client));

client.login();
