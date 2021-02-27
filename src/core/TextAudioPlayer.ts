import { VoiceChannel } from 'discord.js';
import { getAudioUrl } from 'google-tts-api';
import AudioPlayer from './AudioPlayer';

type TextAudioPlayerConstructor = {
	guildId: string;
	channel: VoiceChannel;
	text: string;
	lang: string;
};

class TextAudioPlayer extends AudioPlayer {
	text: string;
	lang: string;

	constructor({ guildId, channel, text, lang }: TextAudioPlayerConstructor) {
		super(guildId, channel);
		this.text = text;
		this.lang = lang;
	}

	public async play() {
		const url = await getAudioUrl(this.text, {
			lang: this.lang == 'en' ? 'en-US' : 'es-ES',
			slow: false,
		});

		await this.playUrl(url);
	}
}

export default TextAudioPlayer;
