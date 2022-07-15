import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

export type Interaction = CommandInteraction<CacheType>;

abstract class Command {
  command = new SlashCommandBuilder();

  get data() {
    this.build();
    return this.command.toJSON();
  }

  abstract ignore(interaction: Interaction): Promise<boolean>;
  abstract run(interaction: Interaction): Promise<void>;
  abstract build();
}

export default Command;
