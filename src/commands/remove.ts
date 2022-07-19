import { CommandInteraction } from "discord.js";
import Command from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as z from "zod";

class Remove extends Command {
  constructor() {
    super({
      name: "remove",
      description: "Deletes a audio",
      options: {
        name: {
          description: "Audio name",
          validation: z.string(),
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild } = interaction;
      const { name } = this.getOptionsValues(interaction);
      await this.validateOptionValues({ name });

      await AudioModel.deleteBy({
        name,
        guildId: guild.id,
      });

      await interaction.reply(`Removed ${name}`);
    } catch (error) {
      logger.error("Command: Remove", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Remove();
