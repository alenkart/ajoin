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
  async connectToChannel(channel: VoiceChannel) {
    const connection = joinVoiceChannel({
      guildId: channel.guildId,
      channelId: channel.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
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
    const player = createAudioPlayer();

    const resource = createAudioResource(url, {
      inputType: StreamType.Arbitrary,
    });

    try {
      const connection = await this.connectToChannel(channel);

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
