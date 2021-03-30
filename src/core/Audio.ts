import { VoiceChannel } from "discord.js";

export type AudioConstructor = {
  guildId: string;
  channel: VoiceChannel;
  timeout?: number;
}

export abstract class Audio {
  timeout: number;
  guildId: string;
  channel: VoiceChannel;

  constructor({ guildId, channel, timeout = 5000 }: AudioConstructor) {
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
