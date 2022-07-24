import { SlashCommandBuilder } from "@discordjs/builders";
import BaseCommand from "./BaseCommand";
import SubCommand from "./SubCommand";
import { BaseCommand as Base } from "./types";

interface ICommand extends Base {
  subCommands?: SubCommand[];
}

abstract class Command extends BaseCommand {
  subCommands: SubCommand[];

  constructor({ subCommands = [], ...props }: ICommand) {
    super(props);
    this.subCommands = subCommands;
  }

  build() {
    const { name, description, options = {}, subCommands } = this;

    const builder = new SlashCommandBuilder();

    builder.setName(name).setDescription(description);

    Object.entries(options).forEach((options) =>
      builder.addStringOption(this.buildOption(...options))
    );

    subCommands.forEach((subCommand) =>
      builder.addSubcommand(subCommand.build())
    );

    return builder;
  }
}

export default Command;
