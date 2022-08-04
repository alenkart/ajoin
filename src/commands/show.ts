import { CommandInteraction } from "discord.js";
import { z } from "zod";
import { Command } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";

class Show extends Command {
  constructor() {
    super({
      name: "show",
      description: "Shows audio detail",
      options: [
        {
          name: "name",
          description: "name of the audio",
          type: "string",
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild, user, options } = interaction;

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

      await interaction.reply(`${audio.name} ${user?.tag} ${audio.url}`);
    } catch (error) {
      await interaction.reply(error.message);
      logger.error("Command: Show", error.message);
    }
  }
}

export default new Show();
