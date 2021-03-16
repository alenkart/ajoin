import { Command, ActionParams, AudioPlayer } from "../core";
import { TextAudio } from "../audios";

class Talk extends Command {
  constructor() {
    super("talk <text...>", "Speaks the message");
  }

  async action({ message, args }: ActionParams) {
    const audio = new TextAudio({
      guildId: message.guild.id,
      channel: message.member.voice.channel,
      text: args.join(" "),
      lang: "en",
    });

    await AudioPlayer.instance.push(audio);
  }
}

export default Talk;
