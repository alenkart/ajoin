import { CommandInteraction } from "discord.js";
import Command from "@ajoin/core/Command";

class Ping extends Command {
  constructor() {
    super({
      name: "ping",
      description: "A test command",
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  }
}

export default new Ping();
