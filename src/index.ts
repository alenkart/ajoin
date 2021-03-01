import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { MessageHandler, VoiceStateUpdate, DBAudio, AudioPlayer } from './core';
import * as commands from './commands';

dotenv.config();

const client = new Client();

client.once('ready', () => {
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async (message) => {
	const _commands = Object.values(commands).map((Command) => new Command());
	const handler = new MessageHandler(client, message, _commands);

	await handler.handle();

	try {
	} catch (error) {
		console.log('message ==>', { error: error.message });
		message.channel.send('Error');
	}
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	const voiceStateUpdate = new VoiceStateUpdate(client, oldMember, newMember);

	voiceStateUpdate.on(['joinChannel', 'switchChannel'], async (event) => {
		console.log('voiceStateUpdate', { event });

		const audio = new DBAudio({
			channel: newMember.channel,
			guildId: newMember.guild.id,
			soundId: `<@!${newMember.id}>`,
		});

		try {
			await AudioPlayer.instance.push(audio);
		} catch (error) {
			console.log('voiceStateUpdate ==>', { error: error.message });
		}
	});

	voiceStateUpdate.handle();
});

client.login();
