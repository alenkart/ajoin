import config from "../config.json";
import * as commander from "commander";
import discord from "discord.js";
import { Command, Event } from "../core";

class MessageEvent extends Event {
  private program: commander.Command;
  private message: discord.Message;
  private commands: Command[] = [];

  constructor(
    client: discord.Client,
    message: discord.Message,
    commands: Command[]
  ) {
    super(client);
    this.program = new commander.Command();
    this.message = message;
    this.commands = commands;
  }

  config() {
    this.program.exitOverride().configureOutput({
      writeOut: (str) => console.log("writeOut ==> ", str),
      writeErr: (str) => console.log("writeErr ==>", str),
      outputError: (str) => console.log("outputError ==>", str),
    });
  }

  buildCommands() {
    for (let command of this.commands) {
      command.command(this.program, this.message, this.client);
    }
  }

  async parseMessage() {
    const args = this.message.content
      .substring(config.prefix.length)
      .split(" ");
    await this.program.parseAsync(args, { from: "user" });
  }

  shouldSkipMessaage() {
    const isBot = this.message.author.bot;
    const hasPrefix = this.message.content.startsWith(config.prefix);
    return isBot || !hasPrefix;
  }

  async handle() {
    if (this.shouldSkipMessaage()) {
      return;
    }

    this.config();
    this.buildCommands();
    await this.parseMessage();
  }
}

export default MessageEvent;
