import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { MessageHandler, VoiceStateUpdate, DBAudioPlayer } from './core';
import * as commands from './commands';

dotenv.config();

const client = new Client();

client.on('ready', () => {
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('message', (message) => {
	const _commands = Object.values(commands).map((Command) => new Command());
	const handler = new MessageHandler(client, message, _commands);
	handler.handle();
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	const voiceStateUpdate = new VoiceStateUpdate(client, oldMember, newMember);

	voiceStateUpdate.on('joinChannel', () => {
		const audioPlayer = new DBAudioPlayer(
			newMember.guild.id,
			newMember.channel,
			`<@!${newMember.id}>`
		);

		audioPlayer.play();
	});

	voiceStateUpdate.handle();
});

client.login();
