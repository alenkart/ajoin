import { Client, Collection } from "discord.js";
import { SlashCommand } from "@ajoin/core/Command";
import AudioPlayer from "@ajoin/core/AudioPlayer";

class Ajoin extends Client {
  commands = new Collection<string, SlashCommand>();
  audioPlayers = new Collection<string, AudioPlayer>();

  getCommand(commandName: string) {
    return this.commands.get(commandName);
  }

  getAudioPlayer(guildId: string) {
    let audioPlayer = this.audioPlayers.get(guildId);

    if (!audioPlayer) {
      audioPlayer = new AudioPlayer();
      this.audioPlayers.set(guildId, audioPlayer);
    }

    return audioPlayer;
  }
}

export default Ajoin;
