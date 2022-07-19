import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, AutocompleteInteraction } from "discord.js";
import * as z from "zod";

export type OptionParser = (
  interaction: CommandInteraction | AutocompleteInteraction
) => string;

export interface Option {
  description: string;
  required?: boolean;
  autocomplete?: boolean;
  validation?: z.Schema;
  parser: OptionParser;
}

export interface CommandProps {
  name: string;
  description: string;
  options?: Record<string, Option>;
}

abstract class Command {
  name: string;
  description: string;
  options: Record<string, Option>;

  get data() {
    return this.build().toJSON();
  }

  get optionValidations() {
    const map: Record<string, z.Schema> = {};

    for (const [name, option] of Object.entries(this.options)) {
      map[name] = option.validation;
    }

    return map;
  }

  get optionParsers() {
    const map = new Map<string, OptionParser>();

    for (const [name, option] of Object.entries(this.options)) {
      map.set(name, option.parser);
    }

    return map;
  }

  constructor({ name, description, options = {} }: CommandProps) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  getOptionsValues(interaction: CommandInteraction | AutocompleteInteraction) {
    const values: Record<string, string> = {};

    for (const [name, parser] of this.optionParsers) {
      values[name] = parser(interaction);
    }

    return values;
  }

  async validateOptionValues(values: Record<string, any>) {
    try {
      return z.object(this.optionValidations).parse(values);
    } catch (error) {
      const message = !(error instanceof z.ZodError)
        ? error.message
        : error.issues
            .map((issue) => `\`${issue.path}\`: ${issue.message}`)
            .join(", ");

      throw new Error(message);
    }
  }

  build() {
    const commandBuilder = new SlashCommandBuilder();

    commandBuilder.setName(this.name).setDescription(this.description);

    for (const [name, options] of Object.entries(this.options)) {
      const { description, required = true, autocomplete = false } = options;

      commandBuilder.addStringOption((optionBuilder) =>
        optionBuilder
          .setName(name)
          .setDescription(description)
          .setRequired(required)
          .setAutocomplete(autocomplete)
      );
    }

    return commandBuilder;
  }

  async onAutocomplete(interaction: AutocompleteInteraction) {
    await interaction.respond([]);
  }

  abstract execute(interaction: CommandInteraction): Promise<void>;
}

export default Command;
