import { CommandInteraction } from "discord.js";
import { z } from "zod";
import { Command } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";

class Remove extends Command {
  constructor() {
    super({
      name: "remove",
      description: "Deletes a audio",
      options: {
        name: {
          description: "Audio name",
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild } = interaction;
      const { name } = this.getOptionsValues(interaction);

      const values = validate(
        {
          name: z.string(),
          guildId: z.string(),
        },
        {
          name,
          guildId: guild?.id,
        }
      );

      const audio = await AudioModel.findOne(values);

      if (!audio) throw new Error("Audio not found");

      await AudioModel.deleteById(audio.id);
      await interaction.reply(`Removed ${name}`);
    } catch (error) {
      logger.error("Command: Remove", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Remove();
