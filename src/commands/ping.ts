import { CacheType, CommandInteraction } from "discord.js";
import { Command, SubCommand } from "@ajoin/core/Command";

class PingUser extends SubCommand {
  constructor() {
    super({
      name: "user",
      description: "A test command",
    });
  }

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply(`Pong! user`);
  }
}

class PingGroup extends SubCommand {
  constructor() {
    super({
      name: "group",
      description: "A test command",
    });
  }

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply(`Pong! group`);
  }
}

class Ping extends Command {
  constructor() {
    super({
      name: "ping",
      description: "A test command",
      subCommands: [new PingUser(), new PingGroup()],
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.reply(`Pong!`);
  }
}

export default new Ping();
