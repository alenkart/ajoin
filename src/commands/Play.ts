import { Command, ActionParams, AudioPlayer } from "../core";
import { DBAudio } from "../audios";

class Play extends Command {
  constructor() {
    super("play <soundId>", "Play a sound");
  }

  async action({ message, args }: ActionParams) {
    const [soundId] = args;

    const audio = new DBAudio({
      guildId: message.guild.id,
      channel: message.member.voice.channel,
      soundId,
    });

    await AudioPlayer.instance.push(audio);
  }
}

export default Play;
