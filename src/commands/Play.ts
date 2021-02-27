import { Command, Handler, DBAudioPlayer } from '../core';

class Play extends Command {
	constructor() {
		super('play <soundId>', 'help play');
	}

	async action({ message, args }: Handler) {
		const [soundId] = args;

		const audioPlayer = new DBAudioPlayer({
			guildId: message.guild.id,
			channel: message.member.voice.channel,
			soundId,
		});

		await audioPlayer.play();
	}
}

export default Play;
