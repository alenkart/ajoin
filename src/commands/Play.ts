import { Command, ActionParams, DBAudio, AudioPlayer } from '../core';

class Play extends Command {
	constructor() {
		super('play <soundId>', 'help play');
	}

	async action({ message, args }: ActionParams) {
		const [soundId] = args;

		const audio = new DBAudio({
			guildId: message.guild.id,
			channel: message.member.voice.channel,
			soundId,
		});

		await AudioPlayer.instance.push(audio);
	}
}

export default Play;
