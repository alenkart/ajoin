import { Client } from 'discord.js';
import DBAudio from './DBAudio';
import AudioPlayer from './AudioPlayer';
import MessageEvent from '../events/MessageEvent';
import VoiceStateUpdateEvent from '../events/VoiceStateUpdateEvent';

import * as commands from '../commands';

class Ajoin extends Client {
	events() {
		this.once('ready', () => {
			console.log(`Environment: ${process.env.NODE_ENV}`);
			console.log(`Logged in as ${this.user?.tag}!`);
		});

		this.once('reconnecting', () => {
			console.log('Reconnecting!');
		});

		this.once('disconnect', () => {
			console.log('Disconnect!');
		});
	}

	messaagEvent() {
		this.on('message', async (message) => {
			const _commands = Object.values(commands).map((Command) => new Command());
			const handler = new MessageEvent(this, message, _commands);

			try {
				await handler.handle();
			} catch (error) {
				console.log('message ==>', { error: error.message }, error);
				message.channel.send('Error');
			}
		});
	}

	voiceStateUpdateEvent() {
		this.on('voiceStateUpdate', (oldMember, newMember) => {
			const voiceStateUpdate = new VoiceStateUpdateEvent(
				this,
				oldMember,
				newMember
			);

			voiceStateUpdate.on(['joinChannel', 'switchChannel'], async () => {
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
	}

	async init() {
		this.events();
		this.messaagEvent();
		this.voiceStateUpdateEvent();
		await super.login();
	}
}

export default Ajoin;
