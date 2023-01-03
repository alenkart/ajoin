import { CommandInteraction } from "discord.js";
import { z } from "zod";
import { SlashCommand } from "@ajoin/core/Command";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";
import prisma from "@ajoin/helpers/prisma";

class Add extends SlashCommand {
  constructor() {
    super({
      name: "add",
      description: "Adds a new sound",
      options: [
        {
          name: "name",
          description: "Audio name",
          type: "string",
        },
        {
          name: "url",
          description: "Audio url (.mp3)",
          type: "string",
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { user, guild, options } = interaction;

      const values = validate(
        {
          name: z.string(),
          url: z.string().url(),
          guildId: z.string(),
          authorId: z.string(),
        },
        {
          name: options.get("name")?.value,
          url: options.get("url")?.value,
          guildId: guild?.id,
          authorId: `<@!${user.id}>`,
        }
      );

      const audio = await prisma.audio.findFirst({
        where: {
          name: values.name,
          guildId: values.guildId,
        },
      });

      if (audio) {
        interaction.reply("Audio already exists");
        return;
      }

      await prisma.audio.create({ data: values });
      await interaction.reply(`Added ${values.name} ${values.url}`);
    } catch (error) {
      await interaction.reply("An Unexpected Error Occurred");
      logger.error("Command: Add", error.message);
    }
  }
}

export default new Add();
