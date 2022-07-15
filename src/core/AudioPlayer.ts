//https://discordjs.guide/voice/voice-connections.html#cheat-sheet

import { VoiceChannel } from "discord.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel,
  StreamType,
  VoiceConnectionStatus,
} from "@discordjs/voice";

class AudioPlayer {
  async joinVoiceChannel({ guildId, id: channelId, guild }: VoiceChannel) {
    const connection = joinVoiceChannel({
      guildId,
      channelId,
      adapterCreator: guild.voiceAdapterCreator,
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
      return connection;
    } catch (error) {
      connection.destroy();
      throw error;
    }
  }

  async play(channel: VoiceChannel, url: string) {
    try {
      const connection = await this.joinVoiceChannel(channel);

      const resource = createAudioResource(url, {
        inputType: StreamType.Arbitrary,
      });

      const player = createAudioPlayer();
      player.play(resource);

      const subscription = connection.subscribe(player);
      setTimeout(() => subscription.unsubscribe(), 5_000);

      await entersState(player, AudioPlayerStatus.Playing, 5_000);
    } catch (error) {
      console.log(error);
    }
  }
}

export default AudioPlayer;
