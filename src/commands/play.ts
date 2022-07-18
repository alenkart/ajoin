import Command, { Interaction, Option } from "@ajoin/core/Command";
import AudioPlayer from "@ajoin/core/AudioPlayer";
import AudioModel from "@ajoin/models/Audio";
import logger from "@ajoin/helpers/logger";
import * as discord from "@ajoin/helpers/discord";
import * as yup from "yup";

class Play extends Command {
  name: string = "play";
  description: string = "hello";
  options: Record<string, Option> = {
    name: {
      description: "p",
      validation: yup.string().required(),
      parser: ({ options }) => options.getString("name"),
    },
  };

  async execute(interaction: Interaction) {
    try {
      const { guild } = interaction;

      const values = this.getOptionsValues(interaction);
      await this.validateOptionValues(values);

      const audio = await AudioModel.findOne({ ...values, guildId: guild.id });

      if (!audio) throw new Error("Audio not found");

      const voiceChannel = discord.getVoiceChannel(interaction);
      const audioPlayer = new AudioPlayer();

      await audioPlayer.play(voiceChannel, audio.url);
      await interaction.reply({ content: "Pong!" });
    } catch (error) {
      logger.error(error.message);
      await interaction.reply("error");
    }
  }
}

export default new Play();
