import { Command, ActionParams, TextAudio, AudioPlayer } from '../core';

class Talk extends Command {
	constructor() {
		super('talk <text...>', 'help talk');
	}

	async action({ message, args }: ActionParams) {
		const audio = new TextAudio({
			guildId: message.guild.id,
			channel: message.member.voice.channel,
			text: args.join(' '),
			lang: 'en',
		});

		await AudioPlayer.instance.push(audio);
	}
}

export default Talk;
