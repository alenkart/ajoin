import { Command, CommandParams, AudioPlayer } from "@ajoin/core";
import { TextAudio } from "@ajoin/audios";

export class Talk extends Command {
  command = "talk <text...>";
  describe = "Speaks the message";
  options = ["-es", "-en", "-ja", "-fr"];

  async run({ message, args, opts }: CommandParams): Promise<void> {
    const [first] = Object.keys(opts).map((opt) => opt.toLowerCase());

    const audio = new TextAudio({
      guildId: message.guild.id,
      channel: message.member.voice.channel,
      text: args.join(" "),
      lang: first as any,
    });

    await AudioPlayer.instance.push(audio);
  }
}
