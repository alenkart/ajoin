import { VoiceChannel } from "discord.js";
import { Audio, AudioConstructor, DisplayableError } from "@ajoin/core";
import { Sound, SoundRanking } from "@ajoin/models";

interface DBAudioConstructor extends AudioConstructor {
  guildId: string;
  channel: VoiceChannel;
  soundId: string;
  ranking?: boolean;
}

export class DBAudio extends Audio {
  soundId: string;
  ranking: boolean;

  constructor({
    guildId,
    channel,
    soundId,
    ranking = false,
  }: DBAudioConstructor) {
    super({ guildId, channel });
    this.soundId = soundId;
    this.ranking = ranking;
  }

  public async getURL() {
    const sound = (await Sound.findOne({
      where: { guildId: this.guildId, soundId: this.soundId },
      raw: true,
    })) as any;

    if (!sound?.url) {
      throw new DisplayableError(`Sound not found 🔎`);
    }

    if (this.ranking) {
      SoundRanking.incrementRanking(sound.id);
    }

    return sound.url;
  }

  public toString(): string {
    return this.soundId;
  }
}
