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
      options: [
        {
          name: "name",
          description: "Audio name",
          type: "string",
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild, options } = interaction;

      const values = validate(
        {
          name: z.string(),
          guildId: z.string(),
        },
        {
          name: options.getString("name"),
          guildId: guild?.id,
        }
      );

      const audio = await AudioModel.findOne(values);

      if (!audio) throw new Error("Audio not found");

      await AudioModel.deleteById(audio.id);
      await interaction.reply(`Removed ${name}`);
    } catch (error) {
      await interaction.reply(error.message);
      logger.error("Command: Remove", error.message);
    }
  }
}

export default new Remove();
