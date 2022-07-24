import { CommandInteraction } from "discord.js";
import { z } from "zod";
import Ajoin from "@ajoin/core/Ajoin";
import { Command } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";
import * as discord from "@ajoin/helpers/discord";

class Play extends Command {
  constructor() {
    super({
      name: "play",
      description: "Plays a sound",
      options: {
        name: {
          description: "Audio name",
          parser: ({ options }) => options.getString("name"),
        },
      },
    });
  }

  async execute(interaction: CommandInteraction) {
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

      const audio = await AudioModel.findOne(values);

      if (!audio) throw new Error("Audio not found");

      const voiceChannel = discord.getVoiceChannel(interaction);

      if (!voiceChannel) throw new Error("Voice Channel is undefined");

      const client = interaction.client as Ajoin;
      const player = client.getAudioPlayer(values.guildId);

      await player.play(voiceChannel, audio.url);
      await interaction.reply(`${audio.name}`);
    } catch (error) {
      logger.error("Command: Play", error.message);
      await interaction.reply(error.message);
    }
  }
}

export default new Play();
