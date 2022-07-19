//https://discordjs.guide/voice/voice-connections.html#cheat-sheet

import { VoiceChannel } from "discord.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  StreamType,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import Timeout from "@ajoin/core/Timeout";
import logger from "@ajoin/helpers/logger";

class AudioPlayer {
  private audioPlayer = createAudioPlayer();
  private playTimeout = new Timeout();
  private afkTimeout = new Timeout();

  private async getConnection(channel: VoiceChannel) {
    const { guild, id: channelId } = channel;
    const connection = getVoiceConnection(guild.id);

    if (connection?.joinConfig?.channelId === channelId) return connection;

    return await this.createConnection(channel);
  }

  private async createConnection(channel: VoiceChannel) {
    const { guild, id: channelId } = channel;

    const connection = joinVoiceChannel({
      channelId,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 5_000);

    return connection;
  }

  private getResource(url: string) {
    return createAudioResource(url, {
      inputType: StreamType.Arbitrary,
      inlineVolume: true,
    });
  }

  async play(channel: VoiceChannel, url: string) {
    try {
      this.afkTimeout.clean();
      this.playTimeout.clean();

      const connection = await this.getConnection(channel);
      const resource = this.getResource(url);
      const subscription = connection.subscribe(this.audioPlayer);

      this.audioPlayer.play(resource);

      await entersState(this.audioPlayer, AudioPlayerStatus.Playing, 5_000);

      this.playTimeout.start(() => subscription.unsubscribe(), 8_000);
      this.afkTimeout.start(() => connection.destroy(), 60_000);
    } catch (error) {
      logger.error("AudioPlayer", error?.message);
    }
  }
}

export default AudioPlayer;
