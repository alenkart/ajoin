import validator from "validator";
import { Command, CommandParams } from "@ajoin/core";
import { Sound } from "@ajoin/models";

export class Set extends Command {
  command = "set <soundId> <url>";
  describe = "Create or update a sound";

  async run({ message, args }: CommandParams): Promise<void> {
    const [soundId, url] = args;
    const guildId = message.guild!.id;
    const author = message.member!.user.tag;

    if (!validator.isURL(url)) {
      throw new Error("Stop trolling that's not a url");
    }

    await Sound.replace({ soundId, guildId, author, url });
  }
}
