import Audio from './Audio';
import DBAudio from './DBAudio';
import TextAudio from './TextAudio';

const debug = (queue: Audio[]) => {
	const result = queue.map((audio) => {
		if (audio instanceof DBAudio) {
			return audio.soundId;
		} else if (audio instanceof TextAudio) {
			return audio.text;
		}
	});

	console.log(result);
};

class AudioPlayer {
	static readonly instance: AudioPlayer = new AudioPlayer();

	readonly queue: Audio[] = [];

	public async push(audio: Audio) {
		this.queue.push(audio);

		if (this.queue.length === 1) {
			await this.play(audio);
		}

		debug(this.queue);
	}

	private async play(audio: Audio) {
		//get the audio url
		const url = await audio.getURL();

		//play the audio
		const connection = await audio.channel.join();
		const dispatcher = connection.play(url, { volume: 0.7 });

		dispatcher.once('finish', async () => {
			//remove the current audio
			this.queue.shift();

			//get the next audio in the queue
			const nextAudio = this.queue[0];

			if (nextAudio) {
				await this.play(nextAudio);
			}
		});
	}
}

export default AudioPlayer;
