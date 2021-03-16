import * as commander from "commander";
import discord from "discord.js";

export type ActionParams = {
  message: discord.Message;
  client: discord.Client;
  args: any[];
  options: {};
  program: commander.Command;
};

export type Action = (params: ActionParams) => void;

abstract class Command {
  name: string;
  description: string;

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  abstract action(params: ActionParams): Promise<any>;

  command(
    program: commander.Command,
    message: discord.Message,
    client: discord.Client
  ) {
    program
      .command(this.name)
      .description(this.description)
      .action(async (...args) => {
        const program = args.pop();
        const options = args.pop();

        await this.action({
          client,
          message,
          args,
          options,
          program,
        });
      });
  }
}

export default Command;
