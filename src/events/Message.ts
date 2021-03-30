import discord from "discord.js";
import commander from "commander";
import { Event, CommandBuilder } from "@ajoin/core";
import * as commands from "@ajoin/commands";

export class Message extends Event<"message"> {
  constructor(client: discord.Client) {
    super("message", client);
  }

  ignore(message: discord.Message): boolean {
    return message.author.bot;
  }

  async listen(message: discord.Message) {
    if (message.author.bot) {
      return;
    }

    const program = new commander.Command();

    program.exitOverride().configureOutput({
      writeOut: () => console.log("writeOut"),
      writeErr: () => console.log("writeErr"),
      outputError: () => console.log("outputError"),
    });

    const builder = new CommandBuilder(program);

    for (let Command of Object.values(commands)) {
      const command = new Command(this.client)
      builder.build(command, message);
      
      console.log(`Command: ${command.command}`);
    }

    try {
      const content = message.content.split(" ");
      await program.parseAsync(content, { from: "user" });
    } catch (error) {
      console.log(error);
      message.channel.send("Error");
    }
  }
}
