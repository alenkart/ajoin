import { Command, CommandParams, AudioPlayer } from "@ajoin/core";
import { DBAudio } from "@ajoin/audios";

export class Play extends Command {
  command = "play <soundId>";
  describe = "Play a sound";

  async run({ message, args }: CommandParams): Promise<void> {
    const [soundId] = args;

    const audio = new DBAudio({
      soundId,
      ranking: true,
      guildId: message.guild.id,
      channel: message.member.voice.channel,
    });

    await AudioPlayer.instance.push(audio);
  }
}
