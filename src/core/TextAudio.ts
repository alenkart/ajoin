import { VoiceChannel } from 'discord.js';
import { getAudioUrl } from 'google-tts-api';
import Audio from './Audio';

type TextAudioConstructor = {
	guildId: string;
	channel: VoiceChannel;
	text: string;
	lang: string;
};

class TextAudio extends Audio {
	text: string;
	lang: string;

	constructor({ guildId, channel, text, lang }: TextAudioConstructor) {
		super(guildId, channel);
		this.text = text;
		this.lang = lang;
	}

	public async getURL() {
		const url = await getAudioUrl(this.text, {
			lang: this.lang == 'en' ? 'en-US' : 'es-ES',
			slow: false,
		});

		return url;
	}

	public toString(): string {
		return this.text.substring(0, 20);
	}
}

export default TextAudio;
