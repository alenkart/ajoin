import { CommandInteraction } from "discord.js";
import Command from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as yup from "yup";

class Add extends Command {
  constructor() {
    super({
      name: "add",
      description: "Adds a new sound",
      options: {
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
      },
    });
  }

  async execute(interaction: CommandInteraction) {
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
      logger.error("Command: Add", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Add();
