import { Command, CommandParams, AudioPlayer } from "@ajoin/core";
import { TextAudio } from "@ajoin/audios";

export class Talk extends Command {
  command = "talk <text...>";
  describe = "Speaks the message";

  async run({ message, args }: CommandParams): Promise<void> {
    const audio = new TextAudio({
      guildId: message.guild!.id,
      channel: message.member!.voice!.channel!,
      text: args.join(" "),
      lang: "en",
    });

    await AudioPlayer.instance.push(audio);
  }
}
