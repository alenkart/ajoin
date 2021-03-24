import { Command, ActionParams } from "../core";
import { Sound } from "../models";

class Show extends Command {
  private messageSize = 1800;
  private group = 10;

  constructor() {
    super("show [soundId]", "Show all the users details");
  }

  formatSound(sound) {
    const header = `> ${sound.soundId} - \`${sound.author}\``;
    return [header, sound.url].join("\n").substring(0, this.messageSize);
  }

  async sendByGroup(message, sounds) {
    for (let i = 0; i <= sounds.length; i += this.group) {
      const payload = sounds
        .slice(i, i + this.group)
        .map((sound) => this.formatSound(sound));
      await message.channel.send(payload);
    }
  }

  async action({ message, args }: ActionParams) {
    const [soundId] = args;

    const sounds = await Sound.fetchBy(message.guild.id, soundId);

    if (sounds.length < 1) {
      throw new Error("I found nothing");
    }

    await this.sendByGroup(message, sounds);
  }
}

export default Show;
