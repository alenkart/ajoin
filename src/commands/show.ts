import Command, { Interaction, Option } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as yup from "yup";

class Show extends Command {
  name: string = "show";
  description: string = "hello";
  options: Record<string, Option> = {
    name: {
      description: "d",
      validation: yup.string().required(),
      parser: ({ options }) => options.getString("name"),
    },
  };

  async execute(interaction: Interaction) {
    try {
      const { client } = interaction;

      const values = this.getOptionsValues(interaction);
      await this.validateOptionValues(values);

      const audio = await AudioModel.findOne(values);

      if (!audio) throw new Error("Audio not found");

      const user = client.users.cache.find(
        (user) => user.id === audio.authorId
      );

      await interaction.reply(`${audio.name} ${user.tag} ${audio.url}`);
    } catch (error) {
      logger.error(error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Show();
