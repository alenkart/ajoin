import { AutocompleteInteraction, CacheType } from "discord.js";
import { z } from "zod";
import { Command } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import validate from "@ajoin/helpers/validate";
import logger from "@ajoin/helpers/logger";

class Search extends Command {
  constructor() {
    super({
      name: "search",
      description: "audio",
      options: [
        {
          name: "name",
          description: "name",
          type: "string",
          autocomplete: true,
        },
      ],
    });
  }

  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
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

      const audios = await AudioModel.searchByName(values.name, {
        guildId: values.guildId,
      });

      const response = audios.map((audio) => ({
        value: `${audio.id}`,
        name: `[google](https://www.google.com/)`,
      }));

      await interaction.respond(response);
    } catch (error) {
      await interaction.respond([]);
      logger.error("Command: Search", error.message);
    }
  }
}

export default new Search();
