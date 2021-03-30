import { Command, CommandParams } from "@ajoin/core";
import { MessageEmbed } from "discord.js";
import * as commands from "./";

export class Help extends Command {
  command = "help [command]";
  describe = "help command";

  run({ message }: CommandParams): void {
    const prefix = "$";
    const embed = new MessageEmbed();

    embed
      .setTitle("Here is the help!!")
      .setColor(0x0099ff)
      .setDescription(
        "The `sound_name` can be a word or user mention `@AJoin`"
      );

    for (let Command of Object.values(commands)) {
      const cmd = new Command({} as any);
      embed.addField(`${prefix}${cmd.command}`, cmd.describe);
    }

    message.channel.send(embed);
  }
}
