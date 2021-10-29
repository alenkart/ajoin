import * as discord from "discord.js";
import { Command, CommandParams, DisplayableError } from "@ajoin/core";
import { Sound } from "@ajoin/entities";

export class Show extends Command {
  private static messageSize = 1800;
  private static group = 10;

  command = "show [soundId]";
  describe = "Show all the users details";

  formatSound(sound: Sound) {
    const header = `🔉 ${sound.soundId} 🧝 \`${sound.author}\``;
    return [header, `${sound.url}`].join("\n").substring(0, Show.messageSize);
  }

  async sendByGroup(message: discord.Message, sounds: any[]) {
    for (let i = 0; i <= sounds.length; i += Show.group) {
      const payload = sounds
        .slice(i, i + Show.group)
        .map((sound) => this.formatSound(sound));

      await message.channel.send(payload);
    }
  }

  async run({ message, args }: CommandParams): Promise<void> {
    const [name] = args;

    const sounds: Sound[] = name
      ? [await Sound.findByGuildIdAndSoundId(message.guild.id, name)]
      : await Sound.findByGuildId(message.guild.id);

    if (sounds.length < 1) {
      throw new DisplayableError("I found nothing");
    }

    await this.sendByGroup(message, sounds);
  }
}
