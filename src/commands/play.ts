import { CommandInteraction } from "discord.js";
import { z } from "zod";
import Ajoin from "@ajoin/core/Ajoin";
import { SlashCommand } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import validate from "@ajoin/helpers/validate";
import * as discord from "@ajoin/helpers/discord";
import prisma from "@ajoin/helpers/prisma";

class Play extends SlashCommand {
  constructor() {
    super({
      name: "play",
      description: "Plays a sound",
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
      const { guild, options } = interaction;

      const values = validate(
        {
          name: z.string(),
          guildId: z.string(),
        },
        {
          name: options.get("name")?.value,
          guildId: guild?.id,
        }
      );

      logger.info(
        `Event: InteractionCreate`,
        `${interaction.user.tag} | ${ interaction.commandName} | ${values.name}`,
       
      );

      const audio = await prisma.audio.findFirst({ where: values });

      if (!audio) {
        interaction.reply("Audio not found");
        return;
      }

      const voiceChannel = discord.getVoiceChannel(interaction);

      if (!voiceChannel) {
        interaction.reply("Voice Channel is undefined");
        return;
      }

      const client = interaction.client as Ajoin;
      const player = client.getAudioPlayer(values.guildId);

      await player.play(voiceChannel, audio.url);
      interaction.reply(`${audio.name}`);
    } catch (error) {
      await interaction.reply("An Unexpected Error Occurred");
      logger.error("Command: Play", error.message);
    }
  }
}

export default new Play();
