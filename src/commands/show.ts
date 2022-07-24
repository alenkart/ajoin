import { AutocompleteInteraction, CommandInteraction } from "discord.js";
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
      options: {
        name: {
          description: "Audio name",
          autocomplete: true,
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async onAutocomplete(interaction: AutocompleteInteraction) {
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

      const audios = await AudioModel.searchByName(values.name, {
        guildId: values.guildId,
      });

      const response = audios.map((audio) => ({
        name: audio.name,
        value: audio.name,
      }));

      await interaction.respond(response);
    } catch (error) {
      logger.error(error);
      await interaction.respond([]);
    }
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild, user } = interaction;
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

      await interaction.reply(`${audio.name} ${user?.tag} ${audio.url}`);
    } catch (error) {
      logger.error("Command: Show", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Show();
