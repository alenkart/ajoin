import Command, { Interaction } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import * as yup from "yup";

class Show extends Command {
  build() {
    this.command
      .setName("show")
      .setDescription("description")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Sound name or discord user")
          .setRequired(true)
      );
  }

  async ignore(interaction: Interaction) {
    return interaction.user.bot;
  }

  validateParams(params: { name?: string; guildId?: string }) {
    const schema = yup.object({
      name: yup.string().required(),
      guildId: yup.string().required(),
    });

    return schema.validate(params);
  }

  getParams({ options, guild }: Interaction) {
    const name = options.getString("name");
    const guildId = guild.id;

    return { name, guildId };
  }

  async run(interaction: Interaction) {
    try {
      const { options, guild, client } = interaction;

      const params = this.getParams(interaction);

      await this.validateParams(params);

      const audio = await AudioModel.findOne(params);

      if (!audio) throw new Error(`\`${params.name}\` doesn't exists`);

      const user = client.users.cache.find(
        (user) => user.id === audio.authorId
      );

      await interaction.reply(`${audio.name} ${user.tag} ${audio.url}`);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        await interaction.reply(error.message);
      } else {
        await interaction.reply(error.message);
      }
    }
  }
}

export default new Show();
