import commander from "commander";
import discord from "discord.js";
import { Command } from "./Command";

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
