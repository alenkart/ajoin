import { Command, TextAudioPlayer } from '../core';

class TalkCommand extends Command {
	constructor() {
		super('talk <text...>', 'help talk');
	}

	action = async ({ message, args }) => {
		const guildId = message.guild.id;
		const channel = message.member.voice.channel;

		const audioPlay = new TextAudioPlayer(guildId, channel);
		await audioPlay.speech(args.join(' '));
	};
}

export default TalkCommand;
