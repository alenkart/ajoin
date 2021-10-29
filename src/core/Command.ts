import discord from "discord.js";

export interface CommandParams {
  args: string[];
  opts: { [key: string]: any };
  message: discord.Message;
}

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
