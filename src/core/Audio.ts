import { VoiceChannel } from "discord.js";

abstract class Audio {
  protected timeout;
  guildId: string;
  channel: VoiceChannel;

  constructor(guildId: string, channel: VoiceChannel, timeout: number = 5000) {
    this.guildId = guildId;
    this.channel = channel;
    this.timeout = timeout;
  }

  public abstract getURL(): Promise<string>;

  public abstract toString(): string;

  async play(volume: number = 0.5) {
    const url = await this.getURL();
    const connection = await this.channel.join();
    const dispatcher = connection.play(url, { volume });

    //start the audio timeout
    setTimeout(() => {
      dispatcher.destroy();
    }, this.timeout);

    return dispatcher;
  }
}

export default Audio;
