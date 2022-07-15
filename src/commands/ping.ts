import Command, { Interaction } from "@ajoin/core/Command";

class Ping extends Command {
  build() {
    this.command.setName("ping").setDescription("description");
  }

  async ignore(interaction: Interaction) {
    return interaction.user.bot;
  }

  async run(interaction: Interaction) {
    await interaction.reply("pong");
  }
}

export default new Ping();
