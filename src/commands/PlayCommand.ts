import { Command, DBAudioPlayer } from '../core';

class PlayCommand extends Command {
	constructor() {
		super('play <soundId>', 'help play');
	}

	action = async ({ message, args }) => {
        const [soundId] = args;

		const guildId = message.guild.id;
		const channel = message.member.voice.channel;

		const audioPlay = new DBAudioPlayer(guildId, channel);
		await audioPlay.speech(soundId);
	};
}

export default PlayCommand;
