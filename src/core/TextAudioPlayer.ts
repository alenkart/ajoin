import { getAudioUrl } from 'google-tts-api';
import AudioPlayer from './AudioPlayer';

class TextAudioPlayer extends AudioPlayer {
	async speech(text: string, lang: string = 'en') {
		const url = await getAudioUrl(text, {
			lang: lang == 'end' ? 'en-US' : 'es-ES',
			slow: false,
		});

		await this.play(url);
	}
}

export default TextAudioPlayer;
