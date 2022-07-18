import Command, { Interaction, Option } from "@ajoin/core/Command";

class Ping extends Command {
  name: string = "ping";
  description: string = "A test command";
  options: Record<string, Option> = {};

  async execute(interaction: Interaction) {
    await interaction.reply("Pong!");
  }
}

export default new Ping();
