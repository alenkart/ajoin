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

  preBuild(_: commander.Command) {}

  postBuild(_: commander.Command) {}

  build(
    program: commander.Command,
    message: discord.Message,
    client: discord.Client
  ) {
    program
      .command(this.name)
      .description(this.description)
      .action(async (...args) => {
        args.pop();
        const options = args.pop();

        const params = {
          client,
          message,
          args,
          options,
          program,
        };

        await this.action(params);
      });
  }

  command(
    program: commander.Command,
    message: discord.Message,
    client: discord.Client
  ) {
    this.preBuild(program);
    this.build(program, message, client);
    this.postBuild(program);
  }
}

export default Command;
