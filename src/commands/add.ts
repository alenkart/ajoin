import Command, { Interaction } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";

class Add extends Command {
  build() {
    this.command
      .setName("add")
      .setDescription("description")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("sound name or user mention")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName("url").setDescription("sound url").setRequired(true)
      );
  }

  async ignore(interaction: Interaction) {
    return interaction.user.bot;
  }

  async run(interaction: Interaction) {
    const { options, user, guild } = interaction;

    const name = options.getString("name");
    const url = options.getString("url");
    const guildId = guild.id;
    const authorId = user.id;

    await AudioModel.create({ name, url, guildId, authorId });

    await interaction.reply(`${name} ${url}`);
  }
}

export default new Add();
