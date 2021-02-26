import { Command, Handler, TextAudioPlayer } from '../core';

class TalkCommand extends Command {
	constructor() {
		super('talk <text...>', 'help talk');
	}

	async action({ message, args }: Handler) {
		const guildId = message.guild.id;
		const channel = message.member.voice.channel;

		const audioPlayer = new TextAudioPlayer(guildId, channel, args.join(' '));
		await audioPlayer.play();
	}
}

export default TalkCommand;
