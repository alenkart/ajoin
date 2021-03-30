import { Command, CommandParams } from "@ajoin/core";
import { SoundRanking } from "@ajoin/models";

export class Rank extends Command {
  command = "rank";
  describe = "rank of monthly sounds";

  async run({ message }: CommandParams): Promise<void> {
    const sounds = (await SoundRanking.findTop(5)) as any[];

    const result = sounds.map((sound, index) => `${index + 1} (${sound.counter}) - ${sound.Sound.soundId} - ${sound.Sound.author}`);

    message.channel.send(result);
  }
}
