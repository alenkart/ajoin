import { Command, Handler, TextAudioPlayer } from '../core';

class Talk extends Command {
	constructor() {
		super('talk <text...>', 'help talk');
	}

	async action({ message, args }: Handler) {
		const audioPlayer = new TextAudioPlayer({
			guildId: message.guild.id,
			channel: message.member.voice.channel,
			text: args.join(' '),
			lang: 'en',
		});

		await audioPlayer.play();
	}
}

export default Talk;
