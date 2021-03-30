import discord from "discord.js";
import commander from "commander";

export type CommandParams = {
  args: string[];
  opts: { [key: string]: any };
  message: discord.Message;
};

export abstract class Command {
  abstract command: string;
  abstract describe: string;
  aliases?: string[];
  options?: string[];
  client: discord.Client;

  constructor(client: discord.Client) {
    this.client = client;
  }

  abstract run(params: CommandParams): void;
}

export class CommandBuilder {
  protected program: commander.Command;

  constructor(program: commander.Command) {
    this.program = program;
  }

  build(command: Command, message: discord.Message) {
    const program = this.program.command(command.command);

    program.action(async (...args) => {
      args.pop();
      const opts = args.pop();

      await command.run({ message, args, opts });
    });

    program.aliases(command.aliases);

    for (let option of command.options || []) {
      program.option(option);
    }
  }
}
