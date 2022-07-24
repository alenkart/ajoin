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
      options: {
        name: {
          description: "Audio name",
          parser: ({ options }) => options.getString("name"),
        },
        url: {
          description: "Audio url (.mp3)",
          parser: ({ options }) => options.getString("url"),
        },
      },
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { user, guild } = interaction;
      const { name, url } = this.getOptionsValues(interaction);

      const values = validate(
        {
          name: z.string(),
          url: z.string().url(),
          guildId: z.string(),
          authorId: z.string(),
        },
        {
          name,
          url,
          guildId: guild?.id,
          authorId: user.id,
        }
      );

      await AudioModel.create(values);
      await interaction.reply(`Added ${name} ${url}`);
    } catch (error) {
      logger.error("Command: Add", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Add();
