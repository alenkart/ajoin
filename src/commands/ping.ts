import { CommandInteraction } from "discord.js";
import { Command, CommandGroup } from "@ajoin/core/Command";

class PingUser extends Command {
  constructor() {
    super({
      name: "user",
      description: "A test command",
    });
  }

  async execute(interaction: CommandInteraction) {
    const { client } = interaction;
    return interaction.reply(`Pong! user ${client.ws.ping}ms.`);
  }
}

class PingGroup extends Command {
  constructor() {
    super({
      name: "group",
      description: "A test command",
    });
  }

  async execute(interaction: CommandInteraction) {
    return interaction.reply(`Pong! group`);
  }
}

class PingCommandGroup extends CommandGroup {
  constructor() {
    super({
      name: "ping",
      description: "ping group",
      commands: [new PingUser(), new PingGroup()],
    });
  }
}

export default new PingCommandGroup();
