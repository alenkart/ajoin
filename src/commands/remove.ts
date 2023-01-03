import { CommandInteraction } from "discord.js";
import { z } from "zod";
import { SlashCommand } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";
import prisma from "@ajoin/helpers/prisma";

class Remove extends SlashCommand {
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
          name: options.get("name")?.value,
          guildId: guild?.id,
        }
      );

      const audio = await prisma.audio.findFirst({ where: values });

      if (!audio) {
        interaction.reply("Audio not found");
        return;
      }

      await AudioModel.deleteById(audio.id);
      await interaction.reply(`Removed ${values.name}`);
    } catch (error) {
      await interaction.reply("An Unexpected Error Occurred");
      logger.error("Command: Remove", error.message);
    }
  }
}

export default new Remove();
