import { Command, Handler, DBAudioPlayer } from '../core';

class Play extends Command {
	constructor() {
		super('play <soundId>', 'help play');
	}

	async action({ message, args }: Handler) {
		const [soundId] = args;

		const guildId = message.guild.id;
		const channel = message.member.voice.channel;

		const audioPlayer = new DBAudioPlayer(guildId, channel, soundId);
		await audioPlayer.play();
	}
}

export default Play;
