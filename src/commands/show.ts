import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import Command from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as z from "zod";

class Show extends Command {
  constructor() {
    super({
      name: "show",
      description: "Shows audio detail",
      options: {
        name: {
          description: "Audio name",
          autocomplete: true,
          validation: z.string(),
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async onAutocomplete(interaction: AutocompleteInteraction) {
    try {
      const { guild } = interaction;
      const { name } = this.getOptionsValues(interaction);
      await this.validateOptionValues({ name });

      const audios = await AudioModel.searchByName(name, {
        guildId: guild.id,
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
      const { client } = interaction;

      const values = this.getOptionsValues(interaction);
      await this.validateOptionValues(values);

      const audio = await AudioModel.findOne(values);

      if (!audio) throw new Error("Audio not found");

      const user = client.users.cache.find(
        (user) => user.id === audio.authorId
      );

      await interaction.reply(`${audio.name} ${user.tag} ${audio.url}`);
    } catch (error) {
      logger.error("Command: Show", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Show();
