import * as discord from "discord.js";
import { Command, CommandParams, DisplayableError } from "@ajoin/core";
import { Sound } from "@ajoin/models";

export class Show extends Command {
  command = "show [soundId]";
  describe = "Show all the users details";

  private messageSize = 1800;
  private group = 10;

  formatSound(sound: any) {
    const header = `🧝 \`${sound.author}\` 🔉 ${sound.soundId}`;
    return [header, `${sound.url}`].join("\n").substring(0, this.messageSize);
  }

  async sendByGroup(message: discord.Message, sounds: any[]) {
    for (let i = 0; i <= sounds.length; i += this.group) {
      const payload = sounds
        .slice(i, i + this.group)
        .map((sound) => this.formatSound(sound));

      await message.channel.send(payload);
    }
  }

  async run({ message, args }: CommandParams): Promise<void> {
    const [soundId] = args;

    const sounds = await Sound.findByGuildId(message.guild.id, soundId);

    if (sounds.length < 1) {
      throw new DisplayableError("I found nothing");
    }

    await this.sendByGroup(message, sounds);
  }
}
