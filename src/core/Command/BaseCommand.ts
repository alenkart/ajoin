import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import { ApplicationCommandOptionBase } from "@discordjs/builders";

import { Option } from "./types";

export interface BaseCommandProps {
  name: string;
  description: string;
  options?: Option[];
}

abstract class BaseCommand {
  name: string;
  description: string;
  options: Option[] = [];

  get data() {
    return this.build().toJSON();
  }

  constructor({ name, description, options = [] }: BaseCommandProps) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  buildOption<T extends ApplicationCommandOptionBase>(
    builder: T,
    { name, description, required = true }: Option
  ): T {
    return builder
      .setName(name)
      .setDescription(description)
      .setRequired(required);
  }

  abstract build(): any;

  async onAutocomplete(interaction: AutocompleteInteraction) {
    await interaction.respond([]);
  }

  abstract execute(interaction: CommandInteraction): Promise<void>;
}

export default BaseCommand;
