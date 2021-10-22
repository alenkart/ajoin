import { Command, CommandParams, AudioPlayer } from "@ajoin/core";
import { TextAudio } from "@ajoin/audios";

export class Talk extends Command {
  command = "talk <text...>";
  describe = "Speaks the message";
  options = ["-es", "-en", "-ja", "-fr"];

  async run({ message, args, opts }: CommandParams): Promise<void> {
    const [lang] = Object.keys(opts).map((opt) => opt.toLowerCase());

    const audio = new TextAudio({
      guildId: message.guild.id,
      channel: message.member.voice.channel,
      text: args.join(" "),
      lang: lang as any,
    });

    await AudioPlayer.instance.push(audio);
  }
}
