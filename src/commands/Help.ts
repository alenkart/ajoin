import { Command, CommandParams } from "@ajoin/core";

export class Help extends Command {
  command = "help [name]";
  describe = "help command";

  run({ message }: CommandParams): void {
    message.channel.send("help");
  }
}
