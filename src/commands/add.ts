import Command, { Interaction, Option } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as yup from "yup";

class Add extends Command {
  name: string = "add";
  description: string = "Adds a new sound";
  options: Record<string, Option> = {
    name: {
      description: "Audio name",
      validation: yup.string().required(),
      parser: ({ options }) => options.getString("name"),
    },
    url: {
      description: "Audio url (.mp3)",
      validation: yup.string().url().required(),
      parser: ({ options }) => options.getString("url"),
    },
  };

  async execute(interaction: Interaction) {
    try {
      const { user, guild } = interaction;

      const { name, url } = this.getOptionsValues(interaction);
      await this.validateOptionValues({ name, url });

      await AudioModel.create({
        name,
        url,
        guildId: guild.id,
        authorId: user.id,
      });

      await interaction.reply(`${name} ${url}`);
    } catch (error) {
      logger.error(error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Add();
