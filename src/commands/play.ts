import AudioPlayer from "@ajoin/core/AudioPlayer";
import Command, { Interaction } from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";
import * as discord from "@ajoin/helpers/discord";

class Play extends Command {
  build() {
    this.command
      .setName("play")
      .setDescription("description")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Sound name or discord user")
          .setRequired(true)
      );
  }

  async ignore(interaction: Interaction) {
    return interaction.user.bot;
  }

  async run(interaction: Interaction) {
    try {
      const { options, guild } = interaction;

      const voiceChannel = discord.getVoiceChannel(interaction);

      const name = options.getString("name");
      const guildId = guild.id;

      const audio = await AudioModel.findOne({ name, guildId });

      if (!audio) return;

      const audioPlayer = new AudioPlayer();
      await audioPlayer.play(voiceChannel, audio.url);
      await interaction.reply({ content: "Pong!" });
    } catch (error) {
      await interaction.reply("error");
    }
  }
}

export default new Play();
