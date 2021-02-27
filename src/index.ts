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

client.on('message', async (message) => {
	const _commands = Object.values(commands).map((Command) => new Command());
	const handler = new MessageHandler(client, message, _commands);

	try {
		await handler.handle();
	} catch (error) {
		console.log('message ==>', { error: error.message });
		message.channel.send('Error');
	}
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	const voiceStateUpdate = new VoiceStateUpdate(client, oldMember, newMember);

	voiceStateUpdate.on(['joinChannel', 'switchChannel'], async (event) => {
		console.log('voiceStateUpdate', { event });

		const audioPlayer = new DBAudioPlayer({
			channel: newMember.channel,
			guildId: newMember.guild.id,
			soundId: `<@!${newMember.id}>`,
		});

		try {
			await audioPlayer.play();
		} catch (error) {
			console.log('voiceStateUpdate ==>', { error: error.message });
		}
	});

	voiceStateUpdate.handle();
});

client.login();
