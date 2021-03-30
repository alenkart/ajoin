import { Command, CommandParams } from "@ajoin/core";
import { Sound } from "@ajoin/models";

export class Delete extends Command {
  command = "delete <soundId>";
  describe = "Delete a sound";

  async run({ message, args }: CommandParams): Promise<void> {
    const [soundId] = args;

    const guildId = message.guild!.id;

    await Sound.destroy({
      where: {
        guildId,
        soundId,
      },
    });

    message.channel.send(`It's super effective 💀`);
  }
}
