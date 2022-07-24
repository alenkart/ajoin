import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import BaseCommand from "./BaseCommand";

abstract class SubCommand extends BaseCommand {
  build() {
    const { name, description, options = {} } = this;

    const builder = new SlashCommandSubcommandBuilder();

    builder.setName(name).setDescription(description);

    Object.entries(options).forEach((options) =>
      builder.addStringOption(this.buildOption(...options))
    );

    return builder;
  }
}

export default SubCommand;
