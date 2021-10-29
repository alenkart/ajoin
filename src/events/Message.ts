import discord from "discord.js";
import commander from "commander";
import { Event, CommandBuilder, DisplayableError } from "@ajoin/core";
import * as commands from "@ajoin/commands";

export class Message extends Event<"message"> {
  prefix = "$";

  constructor(client: discord.Client) {
    super("message", client);
  }

  async ignore(message: discord.Message) {
    return message.author.bot || !message.content.startsWith(this.prefix);
  }

  async listen(message: discord.Message) {
    const program = new commander.Command();

    program.exitOverride().configureOutput({
      writeOut: () => console.log("writeOut"),
      writeErr: () => console.log("writeErr"),
      outputError: () => console.log("outputError"),
    });

    const builder = new CommandBuilder(program);

    for (const Command of Object.values(commands)) {
      const command = new Command(this.client);
      builder.build(command, message);

      console.log(`Command: ${command.command}`);
    }

    try {
      console.log("message:", message.content);
      const content = message.content.substring(this.prefix.length).split(" ");
      await program.parseAsync(content, { from: "user" });
    } catch (error) {
      if (error instanceof DisplayableError) {
        message.channel.send(error.message);
        return;
      }

      console.log(error);
      message.channel.send("A Wild Error Appears!");
    }
  }
}
