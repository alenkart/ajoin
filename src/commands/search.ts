import {
  AutocompleteInteraction,
  CacheType,
  CommandInteraction,
} from "discord.js";

import { z } from "zod";
import { SlashCommand } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import validate from "@ajoin/helpers/validate";
import logger from "@ajoin/helpers/logger";
import prisma from "@ajoin/helpers/prisma";

class Search extends SlashCommand {
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

  async execute(interaction: CommandInteraction) {
    try {
      const { options } = interaction;

      const audio = await AudioModel.findFirst({
        id: Number(options.get("name")?.value),
      });

      if (!audio) throw Error("Audio not found");

      await interaction.reply(
        `${audio.authorId} 🔊 ${audio.name} 🔗 ${audio.url}`
      );
    } catch (error) {
      await interaction.reply("An Unexpected Error Occurred");
      logger.error("Command: Search - execute", error.message);
    }
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

      const audios = await prisma.audio.findMany({
        take: 10,
        where: {
          name: values.name,
        },
      });

      const response = audios
        .filter((audio) => audio.name.indexOf("<@") < 0)
        .map((audio) => {
          return {
            value: `${audio.id}`,
            name: audio.name,
          };
        });

      await interaction.respond(response);
    } catch (error) {
      await interaction.respond([]);
      logger.error("Command: Search - autocomplete", error.message);
    }
  }
}

export default new Search();
