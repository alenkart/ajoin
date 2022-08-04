import { CommandInteraction } from "discord.js";
import { z } from "zod";
import { Command } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";

class Add extends Command {
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
          name: options.getString("name"),
          url: options.getString("url"),
          guildId: guild?.id,
          authorId: user.id,
        }
      );

      await AudioModel.create(values);
      await interaction.reply(`Added ${values.name} ${values.url}`);
    } catch (error) {
      await interaction.reply(error.message);
      logger.error("Command: Add", error.message);
    }
  }
}

export default new Add();
