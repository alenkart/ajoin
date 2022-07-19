import { CommandInteraction } from "discord.js";
import Command from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as discord from "@ajoin/helpers/discord";
import * as z from "zod";
import Ajoin from "@ajoin/core/Ajoin";

class Play extends Command {
  constructor() {
    super({
      name: "play",
      description: "Plays a sound",
      options: {
        name: {
          description: "Audio name",
          validation: z.string(),
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      const { guild } = interaction;
      const values = this.getOptionsValues(interaction);
      await this.validateOptionValues(values);

      const audio = await AudioModel.findOne({ ...values, guildId: guild.id });

      if (!audio) throw new Error("Audio not found");

      const voiceChannel = discord.getVoiceChannel(interaction);
      const client = interaction.client as Ajoin;
      const player = client.getPlayer(guild.id);

      await player.play(voiceChannel, audio.url);
      await interaction.reply(`${audio.name}`);
    } catch (error) {
      logger.error("Command: Play", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Play();
