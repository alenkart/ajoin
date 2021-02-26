import { Command, DBAudioPlayer } from '../core';

class PlayCommand extends Command {
	constructor() {
		super('play <soundId>', 'help play');
	}

	action = async ({ message, args }) => {
		const [soundId] = args;

		const guildId = message.guild.id;
		const channel = message.member.voice.channel;

		const audioPlayer = new DBAudioPlayer(guildId, channel, soundId);
		await audioPlayer.play();
	};
}

export default PlayCommand;
