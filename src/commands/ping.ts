import { CommandInteraction } from "discord.js";
import { SlashCommand } from "@ajoin/core/Command";

class Ping extends SlashCommand {
  constructor() {
    super({
      name: "ping",
      description: "A test command",
    });
  }
 
  async execute(interaction: CommandInteraction) {
    const { client } = interaction;
    interaction.reply(`Pong! ${client.ws.ping}ms.`);
  }
}

export default new Ping();
