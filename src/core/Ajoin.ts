import { Client, Collection } from "discord.js";
import Command from "@ajoin/core/Command";
import AudioPlayer from "@ajoin/core/AudioPlayer";

class Ajoin extends Client {
  commands = new Collection<string, Command>();
  players = new Collection<string, AudioPlayer>();

  getCommand(commandName: string) {
    return this.commands.get(commandName);
  }

  getPlayer(guildId: string) {
    let player = this.players.get(guildId);

    if (!player) {
      player = new AudioPlayer();
      this.players.set(guildId, player);
    }

    return player;
  }
}

export default Ajoin;
