import { Audio } from "./Audio";
import { AudioDispacher } from "./AudioDispacher";

export class AudioPlayer {
  static readonly instance: AudioPlayer = new AudioPlayer();

  readonly queue: Audio[] = [];

  public async push(audio: Audio) {
    if (this.queue.length > 5) {
      throw new Error("Queue is full");
    }

    this.queue.push(audio);

    if (this.queue.length === 1) {
      await this.play(audio);
    }
  }

  private async playNext() {
    this.queue.shift();

    const nextAudio = this.queue[0];

    if (nextAudio) {
      await this.play(nextAudio);
    }
  }

  private async play(audio: Audio) {
    try {
      const dispatcher = await audio.play(0.7);

      const manager = new AudioDispacher(dispatcher);
      await manager.handle();
    } catch (error) {
      console.log(audio.toString(), error.message);
    } finally {
      this.playNext();
    }
  }
}
