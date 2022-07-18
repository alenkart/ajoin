import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { AnySchema, object as yupObject } from "yup";

export type Interaction = CommandInteraction<CacheType>;
export type Parser = (interaction: Interaction) => string;

export interface Option {
  description: string;
  required?: boolean;
  validation?: AnySchema;
  parser: Parser;
}

abstract class Command {
  abstract name: string;
  abstract description: string;
  abstract options: Record<string, Option>;

  get data() {
    return this.build().toJSON();
  }

  get optionValidations() {
    const map = new Map<string, AnySchema>();

    for (const [name, option] of Object.entries(this.options)) {
      map.set(name, option.validation);
    }

    return map;
  }

  get optionParsers() {
    const map = new Map<string, Parser>();

    for (const [name, option] of Object.entries(this.options)) {
      map.set(name, option.parser);
    }

    return map;
  }

  getOptionsValues(interaction: Interaction) {
    const values: Record<string, any> = {};

    for (const [name, parser] of this.optionParsers) {
      values[name] = parser(interaction);
    }

    return values;
  }

  async validateOptionValues(values: Record<string, any>) {
    const schema = yupObject(this.optionValidations as any);
    return await schema.validate(values);
  }

  build() {
    const builder = new SlashCommandBuilder();

    builder.setName(this.name).setDescription(this.description);

    for (const [name, { description, required = true }] of Object.entries(
      this.options
    )) {
      builder.addStringOption((builder) =>
        builder.setName(name).setDescription(description).setRequired(required)
      );
    }

    return builder;
  }

  abstract execute(interaction: Interaction): Promise<void>;
}

export default Command;
